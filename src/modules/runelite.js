import { createActions, handleActions } from 'redux-actions'
import api from '../api'

const runeliteApi = api('https://api.runelite.net/')

// Actions
export const { getSessionCount, setSessionCount } = createActions(
  {
    GET_SESSION_COUNT: () => async dispatch => {
      const response = await runeliteApi(`session/count`, {
        method: 'GET'
      })

      dispatch(setSessionCount(response))
      return response
    }
  },
  'SET_SESSION_COUNT'
)

// Reducer
export default handleActions(
  {
    [setSessionCount]: (state, { payload }) => ({
      ...state,
      sessionCount: payload
    })
  },
  {
    sessionCount: 0
  }
)

// Selectors
export const sessionCountSelector = state => state.runelite.sessionCount
