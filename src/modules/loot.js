import { uniq, concat } from 'ramda'
import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { getLatestRelease } from './git'
import { createSelector } from 'reselect'
import { flattenMap } from '../util'

const runeliteApi = api('https://api.runelite.net/')
const runeliteStaticApi = api('https://static.runelite.net/')

// Actions
export const { fetchLoot, setLoot, setLootRange } = createActions(
  {
    FETCH_LOOT: () => async (dispatch, getState) => {
      const version = getLatestRelease(getState()).name
      const uuid = getState().account.uuid

      const names = await runeliteStaticApi('cache/item/names.json', {
        method: 'GET'
      })

      const chunkSize = 500
      let offset = 0

      while (true) {
        const newLoot = await runeliteApi(
          `runelite-${version}/loottracker?count=${chunkSize}&start=${offset}`,
          {
            method: 'GET',
            headers: {
              'RUNELITE-AUTH': uuid
            }
          }
        )

        const result = newLoot.map(entry => {
          entry.date = new Date(0)
          entry.date.setUTCSeconds(entry.time.seconds)

          entry.drops = entry.drops.map(drop => {
            drop.name = names[drop.id]
            return drop
          })

          return entry
        })

        let length = 0

        for (let entry of result) {
          length += entry.drops.length
        }

        offset += length
        dispatch(setLoot(result))

        if (length !== chunkSize) {
          break
        }
      }

      return offset
    }
  },
  'SET_LOOT',
  'SET_LOOT_RANGE'
)

// Reducer
export default handleActions(
  {
    [setLoot]: (state, { payload }) => uniq(concat(state, payload)),
    [setLootRange]: (state, { payload }) => payload
  },
  []
)

// Selectors
export const getLoot = state => state.loot.sort((a, b) => b.date - a.date)
export const getGroupedLoot = createSelector(
  getLoot,
  loot => {
    const groupedLoot = new Map()

    const mergeDrops = (existingDrops, newDrops) => {
      const items = [...existingDrops].concat(newDrops)
      const groupedItems = []

      for (let item of items) {
        let found = false

        for (let groupedItem of groupedItems) {
          if (item.id === groupedItem.id) {
            groupedItem.qty += item.qty
            found = true
            break
          }
        }

        if (!found) {
          groupedItems.push({ ...item })
        }
      }

      return groupedItems
    }

    for (let entry of loot) {
      const key = entry.eventId

      if (groupedLoot.has(key)) {
        const existing = groupedLoot.get(key)
        existing.count += 1
        existing.drops = mergeDrops(existing.drops, entry.drops)
        continue
      }

      const newEntry = {
        drops: entry.drops,
        type: entry.type,
        count: 1
      }

      groupedLoot.set(key, newEntry)
    }

    return flattenMap(groupedLoot)
  }
)
