import { createActions, handleActions } from 'redux-actions'
import api from '../api'

const runeliteApi = api('https://api.runelite.net/')

// Actions
export const {
  fetchSessionCount,
  fetchLoggedInCount,
  setSessionCount,
  setLoggedInCount
} = createActions(
  {
    FETCH_SESSION_COUNT: () => async dispatch => {
      const response = await runeliteApi(`session/count`, {
        method: 'GET'
      })

      dispatch(setSessionCount(response))
      return response
    },
    FETCH_LOGGED_IN_COUNT: () => async dispatch => {
      const response = await runeliteApi(`session/count/logged-in`, {
        method: 'GET'
      })

      dispatch(setLoggedInCount(response))
      return response
    }
  },
  'SET_SESSION_COUNT',
  'SET_LOGGED_IN_COUNT'
)

// Reducer
export default handleActions(
  {
    [setSessionCount]: (state, { payload }) => ({
      ...state,
      sessionCount: payload
    }),
    [setLoggedInCount]: (state, { payload }) => ({
      ...state,
      loggedInCount: payload
    })
  },
  {
    sessionCount: 0,
    loggedInCount: 0
  }
)

// Selectors
export const getSessionCount = state => state.session.sessionCount
export const getLoggedInCount = state => state.session.loggedInCount
