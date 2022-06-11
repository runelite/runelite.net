import * as uuid from 'uuid'
import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { getLatestRelease } from './bootstrap'
import { getBaseUrl } from '../util'

const runeliteApi = api('https://api.runelite.net/')

// Actions
export const {
  login,
  logout,
  sessionCheck,
  setSession,
  resetSession
} = createActions(
  {
    LOGIN: () => async (dispatch, getState) => {
      const version = getLatestRelease(getState())
      const redirUrl = getBaseUrl() + '/logged-in'

      const authResponse = await runeliteApi(
        `runelite-${version}/account/login?redirectUrl=${redirUrl}&port=0000`,
        {
          method: 'GET'
        }
      )

      window.location.href = authResponse.oauthUrl
      return authResponse
    },
    LOGOUT: () => async (dispatch, getState) => {
      const version = getLatestRelease(getState())
      const localUuid = getState().account.uuid

      try {
        return await runeliteApi(`runelite-${version}/account/logout`, {
          method: 'GET',
          headers: {
            'RUNELITE-AUTH': localUuid
          }
        })
      } finally {
        dispatch(resetSession())
      }
    },
    SESSION_CHECK: () => async (dispatch, getState) => {
      const version = getLatestRelease(getState())
      const localUuid = getState().account.uuid

      try {
        return await runeliteApi(`runelite-${version}/account/session-check`, {
          method: 'GET',
          headers: {
            'RUNELITE-AUTH': localUuid
          }
        })
      } catch (e) {
        dispatch(resetSession())
      }
    }
  },
  'SET_SESSION',
  'RESET_SESSION'
)

// Reducer
export default handleActions(
  {
    [setSession]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [resetSession]: state => ({
      ...state,
      uuid: uuid.v4(),
      username: ''
    })
  },
  {
    uuid: uuid.v4(),
    username: ''
  }
)

// Selectors
export const isLoggedIn = state => !!state.account.username
