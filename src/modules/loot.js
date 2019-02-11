import { uniq, concat } from 'ramda'
import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { getLatestRelease } from './git'

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

      const loot = await runeliteApi(`runelite-${version}/loottracker`, {
        method: 'GET',
        headers: {
          'RUNELITE-AUTH': uuid
        }
      })

      const result = loot.map(entry => {
        entry.drops = entry.drops.map(drop => {
          drop.name = names[drop.id]
          return drop
        })

        return entry
      })

      dispatch(setLootRange(result))
      return result
    }
  },
  'SET_LOOT',
  'SET_LOOT_RANGE'
)

// Reducer
export default handleActions(
  {
    [setLoot]: (state, { payload }) => uniq(concat(state, [payload])),
    [setLootRange]: (state, { payload }) => payload
  },
  []
)
