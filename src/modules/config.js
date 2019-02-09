import { createActions, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import api from '../api'
import { startLoading, stopLoading } from './app'
import { latestReleaseSelector } from './git'

const runeliteApi = api('https://api.runelite.net/')
const configNameFilters = [
  /^(timetracking)\.(.+)\.(birdhouse\.[0-9]+)$/,
  /^(timetracking)\.(.+)\.([0-9]+\.[0-9]+)$/,
  /^(timetracking)\.(.+)\.(autoweed)$/,
  /^(killcount)\.(.+)\.([^.]+)$/,
  /^([^.]+)\.(.+)$/
]

// Actions
export const { fetchConfig, setConfig, changeAccount } = createActions(
  {
    FETCH_CONFIG: () => async (dispatch, getState) => {
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
  'SET_CONFIG',
  'CHANGE_ACCOUNT'
)

// Reducer
export default handleActions(
  {
    [setConfig]: (state, { payload }) => ({
      ...state,
      config: payload
    }),
    [changeAccount]: (state, { payload }) => ({
      ...state,
      selectedAccount: payload
    })
  },
  {
    config: {},
    selectedAccount: ''
  }
)

export const getConfig = state => state.config.config

export const getAccounts = createSelector(
  getConfig,
  config => {
    const names = new Set()

    for (let key in config) {
      const matches = configNameFilters.map(r => key.match(r)).filter(m => !!m)
      const match = matches.shift().filter(m => m.length > 0)

      if (!match || match.length !== 4) {
        continue
      }

      const username = match[2]
      names.add(username)
    }

    return [...names]
  }
)
