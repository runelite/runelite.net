import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { getLatestRelease } from './bootstrap'
import { createSelector } from 'reselect'
import { flattenMap } from '../util'
import { getPrices } from './prices'

const runeliteApi = api('https://api.runelite.net/')
const runeliteStaticApi = api('https://static.runelite.net/')

// Actions
export const {
  fetchLoot,
  setLoot,
  setLootRange,
  setLootFilter
} = createActions(
  {
    FETCH_LOOT: () => async (dispatch, getState) => {
      dispatch(setLootRange([]))

      const version = getLatestRelease(getState())
      const uuid = getState().account.uuid

      const names = await runeliteStaticApi('cache/item/names.json', {
        method: 'GET'
      })

      const chunkSize = 2000
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
          entry.date.setUTCSeconds(entry.last_time.seconds)

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
  'SET_LOOT_RANGE',
  'SET_LOOT_FILTER'
)

// Reducer
export default handleActions(
  {
    [setLoot]: (state, { payload }) => ({
      ...state,
      data: state.data.concat(payload)
    }),
    [setLootRange]: (state, { payload }) => ({
      ...state,
      data: payload
    }),
    [setLootFilter]: (state, { payload }) => ({
      ...state,
      filter: {
        ...state.filter,
        ...payload
      }
    })
  },
  {
    filter: {
      name: ''
    },
    data: []
  }
)

// Selectors
export const getLoot = state => state.loot.data
export const getLootFilter = state => state.loot.filter
export const getFilteredLoot = createSelector(
  getLoot,
  getLootFilter,
  (data, filter) =>
    data
      .filter(
        l =>
          !filter.name ||
          l.eventId.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1 ||
          l.drops.filter(
            drop =>
              drop.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1
          ).length >= 1
      )
      .sort((a, b) => b.date - a.date)
)

export const getGroupedLoot = createSelector(
  getFilteredLoot,
  getPrices,
  (loot, prices) => {
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

    const getPrice = drops => {
      let total = 0
      for (let drop of drops) {
        const price = prices[drop.id]
        if (!isNaN(price)) {
          total += price * drop.qty
        }
      }
      return total
    }

    for (let entry of loot) {
      const key = entry.eventId

      if (groupedLoot.has(key)) {
        const existing = groupedLoot.get(key)
        existing.count += entry.amount
        existing.drops = mergeDrops(existing.drops, entry.drops)
        existing.price += getPrice(entry.drops)
        continue
      }

      const newEntry = {
        drops: mergeDrops(entry.drops, []),
        type: entry.type,
        count: entry.amount,
        price: getPrice(entry.drops)
      }

      groupedLoot.set(key, newEntry)
    }

    return flattenMap(groupedLoot)
  }
)
