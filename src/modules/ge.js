import { uniq, concat } from 'ramda'
import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { startLoading, stopLoading } from './app'
import { latestReleaseSelector } from './git'

const runeliteApi = api('https://api.runelite.net/')
const runeliteStaticApi = api('https://static.runelite.net/')

const dataMock = [
  {
    itemId: 1155,
    buy: true,
    quantity: 50,
    price: 2000,
    time: 1549902657
  },
  {
    itemId: 1155,
    buy: false,
    quantity: 50,
    price: 2000,
    time: 1549902657
  },
  {
    itemId: 1155,
    buy: false,
    quantity: 50,
    price: 2000,
    time: 1549902657
  }
]

// Actions
export const { fetchGe, setGe, setGeRange } = createActions(
  {
    FETCH_GE: () => async (dispatch, getState) => {
      dispatch(startLoading())

      const version = latestReleaseSelector(getState()).name
      const uuid = getState().session.uuid

      // const result = await runeliteApi(`runelite-${version}/ge`, {
      //     method: 'GET',
      //     headers: {
      //         'RUNELITE-AUTH': uuid
      //     }
      // })

      const result = dataMock

      // Assign names to items
      const names = await runeliteStaticApi('cache/item/names.json', {
        method: 'GET'
      })

      for (let item of result) {
        item.name = names[item['itemId']]
        item.date = new Date(parseInt(item.time, 10))
      }

      dispatch(setGeRange(result))
      dispatch(stopLoading())
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
