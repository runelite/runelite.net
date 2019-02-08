import { uniq, concat } from 'ramda'
import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { startLoading, stopLoading } from './app'

const runeliteApi = api('https://api.runelite.net/')
const runeliteStaticApi = api('https://static.runelite.net/')

// Actions
export const {
  getSessionCount,
  getItemInfo,
  setSessionCount,
  setItemInfo
} = createActions(
  {
    GET_SESSION_COUNT: () => async dispatch => {
      dispatch(startLoading())

      const response = await runeliteApi(`session/count`, {
        method: 'GET'
      })

      dispatch(setSessionCount(response))
      dispatch(stopLoading())
      return response
    },
    GET_ITEM_INFO: items => async dispatch => {
      dispatch(startLoading())
      const version = latestReleaseSelector(getState()).name
      const names = await runeliteStaticApi('cache/item/names.json', {
        method: 'GET'
      })

      const result = await Promise.all(
        items.map(item =>
          runeliteApi(`runelite-${version}/examine/item/${item}`, {
            method: 'GET'
          }).then(examine => {
            dispatch(
              setItemInfo({
                id: item,
                name: names[item],
                examine
              })
            )
          })
        )
      )

      dispatch(stopLoading())
      return result
    }
  },
  'SET_SESSION_COUNT',
  'SET_ITEM_INFO'
)

// Reducer
export default handleActions(
  {
    [setSessionCount]: (state, { payload }) => ({
      ...state,
      sessionCount: payload
    }),
    [setItemInfo]: (state, { payload }) => ({
      ...state,
      items: uniq(concat(state.items, [payload]))
    })
  },
  {
    sessionCount: 0,
    items: []
  }
)

// Selectors
export const sessionCountSelector = state => state.runelite.sessionCount
