import { createActions, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import api from '../api'
import { getLatestRelease } from './bootstrap'
import { flattenMap } from '../util'
import { getItems } from './item'

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
      const version = getLatestRelease(getState())
      const uuid = getState().account.uuid

      if (!uuid) {
        return {}
      }

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
      const state = getState()
      const selectedAccount = getSelectedAccount(state)

      if (!selectedAccount) {
        const accounts = getAccounts(state)

        if (accounts.length > 0) {
          dispatch(changeAccount(accounts[0]))
        }
      }

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

// Selectors
export const getConfig = state => state.config.config
export const getSelectedAccount = state => state.config.selectedAccount

export const getAccounts = createSelector(getConfig, config => {
  const names = new Set()

  for (let key in config) {
    const matches = configNameFilters.map(r => key.match(r)).filter(m => !!m)
    const matchesFound = matches.shift()

    if (!matchesFound) {
      continue
    }

    const match = matchesFound.filter(m => m.length > 0)

    if (!match || match.length !== 4) {
      continue
    }

    const username = match[2]
    names.add(username.toLowerCase())
  }

  return [...names]
})

export const getSlayerTask = createSelector(getConfig, config => {
  if (!config['slayer.taskName']) {
    return {
      hasTask: false
    }
  }

  return {
    hasTask: true,
    name: config['slayer.taskName'],
    location: config['slayer.taskLocation'],
    start: config['slayer.initialAmount'],
    remaining: config['slayer.amount'],
    streak: config['slayer.streak'],
    points: config['slayer.points']
  }
})

export const getBossLog = createSelector(
  getConfig,
  getSelectedAccount,
  (config, selectedAccount) => {
    const kcPrefix = 'killcount.'
    const pbPrefix = 'personalbest.'
    const data = new Map()

    if (!selectedAccount) {
      return flattenMap(data)
    }

    for (let [key, value] of Object.entries(config)) {
      if (key.startsWith(kcPrefix)) {
        key = key.replace(kcPrefix, '')

        if (!key.startsWith(selectedAccount)) {
          continue
        }

        key = key.replace(selectedAccount + '.', '')

        if (data.has(key)) {
          const existing = data.get(key)
          existing.kc = value
        } else {
          data.set(key, { kc: value })
        }
      } else if (key.startsWith(pbPrefix)) {
        key = key.replace(pbPrefix, '')

        if (!key.startsWith(selectedAccount)) {
          continue
        }

        key = key.replace(selectedAccount + '.', '')

        if (data.has(key)) {
          const existing = data.get(key)
          existing.pb = value
        } else {
          data.set(key, { pb: value })
        }
      }
    }

    return flattenMap(data)
  }
)

export const getExternalPlugins = createSelector(getConfig, config => {
  if (!config['runelite.externalPlugins']) {
    return []
  }

  return config['runelite.externalPlugins'].split(',')
})

export const getTags = createSelector(
  getConfig,
  getItems,
  getSelectedAccount,
  (config, items, selectedAccount) => {
    const bankTagsPrefix = 'banktags.'
    const itemPrefix = 'item_' // item id
    const iconPrefix = 'icon_' // tag name
    const data = new Map()

    if (!selectedAccount) {
      return flattenMap(data)
    }

    function checkData(data, t) {
      if (!data.has(t)) {
        data.set(t, {
          items: [],
          icon: -1
        })
      }
    }

    for (let [key, value] of Object.entries(config)) {
      if (!key.startsWith(bankTagsPrefix)) {
        continue
      }

      key = key.replace(bankTagsPrefix, '')

      if (!key.startsWith(selectedAccount)) {
        continue
      }

      key = key.replace(selectedAccount + '.', '')

      if (key.startsWith(itemPrefix)) {
        const item = key.replace(itemPrefix, '')
        const tags = value.split(',')

        tags.forEach(t => {
          t = t.trim()
          checkData(data, t)

          const itemId = parseInt(item)
          const itemData = items.find(i => i.id === itemId)
          const itemName = itemData && itemData.name

          data.get(t).items.push({
            id: itemId,
            name: itemName
          })
        })
      } else if (key.startsWith(iconPrefix)) {
        const tag = key.replace(iconPrefix, '')
        checkData(data, tag)
        data.get(tag).icon = parseInt(value)
      }
    }

    return flattenMap(data)
  }
)
