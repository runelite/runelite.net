import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { getLatestRelease } from './bootstrap'
import { createSelector } from 'reselect'
import { flattenMap } from '../util'
import { getPrices } from './prices'
import { getItems } from './item'

const runeliteApi = api('https://api.runelite.net/')

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

      const chunkSize = 2000
      let offset = 0

      while (true) {
        const result = await runeliteApi(
          `runelite-${version}/loottracker?count=${chunkSize}&start=${offset}`,
          {
            method: 'GET',
            headers: {
              'RUNELITE-AUTH': uuid
            }
          }
        )

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

export const getAnnotatedLoot = createSelector(
  getLoot,
  getItems,
  getPrices,
  (loot, items, prices) =>
    loot.map(entry => {
      entry.date = new Date(0)
      entry.date.setUTCSeconds(entry.last_time.seconds)
      entry.drops = entry.drops.map(drop => {
        const item = items.find(item => item.id === drop.id)
        drop.name = item && item.name ? item.name : 'null'
        const note = drop.name && items.find(item => item.id === drop.id - 1)
        const unnoted = note && note.name === drop.name && note.id

        let price = prices[drop.id]
        if (unnoted && (isNaN(price) || price <= 0)) {
          price = prices[unnoted]
        }

        drop.price = price || 0
        return drop
      })

      return entry
    })
)

export const getFilteredLoot = createSelector(
  getAnnotatedLoot,
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

export const getGroupedLoot = createSelector(getFilteredLoot, loot => {
  const groupedLoot = new Map()

  const mergeDrops = (existingDrops, newDrops) => {
    const items = [...existingDrops].concat(newDrops)
    const groupedItems = []

    for (let item of items) {
      let found = false

      for (let groupedItem of groupedItems) {
        if (
          item.id === groupedItem.id ||
          (item.name.startsWith('Clue scroll') &&
            item.name === groupedItem.name)
        ) {
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

  const getPrice = drops =>
    drops.reduce((acc, val) => acc + val.price * val.qty, 0)

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

  return flattenMap(groupedLoot).map(entry => {
    entry.drops = entry.drops.sort((a, b) => b.price * b.qty - a.price * a.qty)
    return entry
  })
})
