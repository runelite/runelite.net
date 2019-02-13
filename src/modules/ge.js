import { uniq, concat } from 'ramda'
import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { getLatestRelease } from './git'

const runeliteApi = api('https://api.runelite.net/')
const runeliteStaticApi = api('https://static.runelite.net/')

// Actions
export const { fetchGe, setGe, setGeRange } = createActions(
  {
    FETCH_GE: () => async (dispatch, getState) => {
      const version = getLatestRelease(getState()).name
      const uuid = getState().account.uuid

      const result = await runeliteApi(`runelite-${version}/ge`, {
        method: 'GET',
        headers: {
          'RUNELITE-AUTH': uuid
        }
      })

      // Assign names to items
      const names = await runeliteStaticApi('cache/item/names.json', {
        method: 'GET'
      })

      for (let item of result) {
        item.name = names[item['itemId']]
        item.date = new Date(0)
        item.date.setUTCSeconds(item.time.epochSecond)
      }

      dispatch(setGeRange(result))
      return result
    }
  },
  'SET_GE',
  'SET_GE_RANGE'
)

// Reducer
export default handleActions(
  {
    [setGe]: (state, { payload }) => uniq(concat(state, [payload])),
    [setGeRange]: (state, { payload }) => payload
  },
  []
)
