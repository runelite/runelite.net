import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { getLatestRelease } from './bootstrap'

const runeliteApi = api('https://api.runelite.net/')

// Actions
export const { fetchPrices, setPrices } = createActions(
  {
    FETCH_PRICES: () => async (dispatch, getState) => {
      const version = getLatestRelease(getState())

      const prices = await runeliteApi(`runelite-${version}/item/prices.js`, {
        method: 'GET'
      })

      const priceMap = {}

      priceMap[995] = 1 // Coins
      priceMap[13204] = 1000 // Platinum token

      for (const item of prices) {
        priceMap[item.id] = item.price
      }

      dispatch(setPrices(priceMap))
    }
  },
  'SET_PRICES'
)

// Reducer
export default handleActions(
  {
    [setPrices]: (state, { payload }) => payload
  },
  {}
)

// Selectors
export const getPrices = state => state.prices
