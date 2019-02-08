import uuid from 'uuid/v4'
import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { startLoading, stopLoading } from './app'
import { latestReleaseSelector } from './git'

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
      dispatch(startLoading())

      const version = latestReleaseSelector(getState()).name
      const localUuid = getState().session.uuid
      const loadingPane = window.open('https://runelite.net/loading', '_blank')

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
      dispatch(stopLoading())
      return response
    },
    LOGOUT: () => async (dispatch, getState) => {
      dispatch(startLoading())

      const version = latestReleaseSelector(getState()).name
      const localUuid = getState().session.uuid

      try {
        const authResponse = await runeliteApi(
          `runelite-${version}/account/logout`,
          {
            method: 'GET',
            headers: {
              'RUNELITE-AUTH': localUuid
            }
          }
        )

        return authResponse
      } finally {
        dispatch(resetSession())
        dispatch(stopLoading())
      }
    },
    SESSION_CHECK: () => async (dispatch, getState) => {
      dispatch(startLoading())

      const version = latestReleaseSelector(getState()).name
      const localUuid = getState().session.uuid

      try {
        return await runeliteApi(`runelite-${version}/account/session-check`, {
          method: 'GET',
          headers: {
            'RUNELITE-AUTH': localUuid
          }
        })
      } catch (e) {
        dispatch(resetSession())
      } finally {
        dispatch(stopLoading())
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

export const isLoggedIn = state => !!state.session.username
