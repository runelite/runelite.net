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
export const {
  fetchConfig,
  updateConfig,
  setConfig,
  addModifiedKey,
  changeAccount
} = createActions(
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
        config[kv.key.toLowerCase()] = kv.value
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
    },
    UPDATE_CONFIG: (key, value) => async (dispatch, getState) => {
      const version = getLatestRelease(getState())
      const uuid = getState().account.uuid

      if (!uuid) {
        return {}
      }

      if (value.length > 0) {
        await runeliteApi(`runelite-${version}/config/${key}`, {
          method: 'PUT',
          headers: {
            'RUNELITE-AUTH': uuid
          },
          body: value
        })
      } else {
        await runeliteApi(`runelite-${version}/config/${key}`, {
          method: 'DELETE',
          headers: {
            'RUNELITE-AUTH': uuid
          }
        })
      }

      dispatch(addModifiedKey(key))
    }
  },
  'SET_CONFIG',
  'ADD_MODIFIED_KEY',
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
    }),
    [addModifiedKey]: (state, { payload }) => ({
      ...state,
      modifiedKeys: [...new Set(state.modifiedKeys.concat([payload]))]
    })
  },
  {
    config: {},
    modifiedKeys: [],
    selectedAccount: ''
  }
)

// Selectors
export const getConfig = state => state.config.config
export const getSelectedAccount = state => state.config.selectedAccount
export const getModifiedKeys = state => state.config.modifiedKeys

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
  if (!config['slayer.taskname']) {
    return {
      hasTask: false
    }
  }

  return {
    hasTask: true,
    name: config['slayer.taskname'],
    location: config['slayer.tasklocation'],
    start: config['slayer.initialamount'],
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
  if (!config['runelite.externalplugins']) {
    return []
  }

  return config['runelite.externalplugins'].split(',')
})

export const getTags = createSelector(getConfig, getItems, (config, items) => {
  const bankTagsPrefix = 'banktags.'
  const itemPrefix = 'item_' // item id
  const iconPrefix = 'icon_' // tag name
  const data = new Map()

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

    if (key.startsWith(itemPrefix)) {
      const item = key.replace(itemPrefix, '')
      const tags = value.split(',')

      tags.forEach(t => {
        t = t.trim()
        checkData(data, t)

        const itemId = Math.abs(parseInt(item))
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
})
