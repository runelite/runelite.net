import uuid from 'uuid/v4'
import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { getLatestRelease } from './git'
import { getBaseUrl } from '../util'
import { route } from 'preact-router'

const runeliteWs = 'wss://api.runelite.net/ws'
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
      const version = getLatestRelease(getState()).name
      const localUuid = getState().account.uuid
      const baseUrl = getBaseUrl()

      const loadingPane = window.open(baseUrl + '/loading', '_blank')

      const authResponse = await runeliteApi(
        `runelite-${version}/account/login?uuid=${localUuid}`,
        {
          method: 'GET'
        }
      )

      const uuid = authResponse.uid

      const sessionPromise = new Promise((resolve, reject) => {
        const ws = new WebSocket(runeliteWs)

        ws.onopen = () => {
          ws.send(
            JSON.stringify({
              type: 'Handshake',
              _party: false,
              session: uuid
            })
          )

          loadingPane.location.href = authResponse.oauthUrl
        }

        ws.onmessage = event => {
          const msg = JSON.parse(event.data)

          if (msg.type !== 'LoginResponse') {
            return
          }

          const session = {
            ...msg,
            uuid
          }

          dispatch(setSession(session))
          loadingPane.close()
          resolve(session)
          ws.close()
        }

        ws.onclose = msg => reject(msg)
        ws.onerror = msg => reject(msg)
      })

      const response = await sessionPromise
      route('/account/home')
      return response
    },
    LOGOUT: () => async (dispatch, getState) => {
      const version = getLatestRelease(getState()).name
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
      const version = getLatestRelease(getState()).name
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
      uuid: uuid(),
      username: ''
    })
  },
  {
    uuid: uuid(),
    username: ''
  }
)

// Selectors
export const isLoggedIn = state => !!state.account.username
