import { uniq, concat } from 'ramda'
import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { getLatestRelease } from './git'

const runeliteApi = api('https://api.runelite.net/')

// Actions
export const { fetchLoot, setLoot, setLootRange } = createActions(
  {
    FETCH_LOOT: () => async (dispatch, getState) => {
      const version = getLatestRelease(getState()).name
      const uuid = getState().account.uuid

      const result = await runeliteApi(`runelite-${version}/loottracker`, {
        method: 'GET',
        headers: {
          'RUNELITE-AUTH': uuid
        }
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
