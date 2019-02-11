import { uniq, concat } from 'ramda'
import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { startLoading, stopLoading } from './app'
import { latestReleaseSelector } from './git'

const runeliteApi = api('https://api.runelite.net/')

// Actions
export const { fetchLoot, setLoot, setLootRange } = createActions(
  {
    FETCH_LOOT: () => async (dispatch, getState) => {
      dispatch(startLoading())

      const version = latestReleaseSelector(getState()).name
      const uuid = getState().session.uuid

      const result = await runeliteApi(`runelite-${version}/loottracker`, {
        method: 'GET',
        headers: {
          'RUNELITE-AUTH': uuid
        }
      })

      dispatch(setLootRange(result))
      dispatch(stopLoading())
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
