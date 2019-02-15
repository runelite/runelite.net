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

      // Assign names to items
      const names = await runeliteStaticApi('cache/item/names.json', {
        method: 'GET'
      })

      const chunkSize = 500
      let offset = 0

      while (true) {
        const newEntries = await runeliteApi(
          `runelite-${version}/ge?limit=${chunkSize}&offset=${offset}`,
          {
            method: 'GET',
            headers: {
              'RUNELITE-AUTH': uuid
            }
          }
        )

        const result = newEntries.map(entry => {
          entry.name = names[entry.itemId]
          entry.date = new Date(0)
          entry.date.setUTCSeconds(entry.time.epochSecond)
          return entry
        })

        const length = result.length
        offset += length
        dispatch(setGe(result))

        if (length !== chunkSize) {
          break
        }
      }

      return offset
    }
  },
  'SET_GE',
  'SET_GE_RANGE'
)

// Reducer
export default handleActions(
  {
    [setGe]: (state, { payload }) => uniq(concat(state, payload)),
    [setGeRange]: (state, { payload }) => payload
  },
  []
)
