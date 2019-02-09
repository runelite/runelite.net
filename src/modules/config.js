import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { startLoading, stopLoading } from './app'
import { latestReleaseSelector } from './git'

const runeliteApi = api('https://api.runelite.net/')

// Actions
export const { getConfig, setConfig } = createActions(
  {
    GET_CONFIG: () => async (dispatch, getState) => {
      dispatch(startLoading())

      const version = latestReleaseSelector(getState()).name
      const uuid = getState().session.uuid

      const result = await runeliteApi(`runelite-${version}/config`, {
        method: 'GET',
        headers: {
          'RUNELITE-AUTH': uuid
        }
      })

      const config = {}
      for (let i in result.config) {
        const kv = result.config[i]
        config[kv.key] = kv.value
      }

      dispatch(setConfig(config))
      dispatch(stopLoading())
      return config
    }
  },
  'SET_CONFIG'
)

// Reducer
export default handleActions(
  {
    [setConfig]: (state, { payload }) => payload
  },
  {}
)
