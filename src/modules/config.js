import { createActions, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import api from '../api'
import { getLatestRelease } from './bootstrap'
import { flattenMap } from '../util'
import { getItems } from './item'
import regions from '../_data/regions'

const runeliteApi = api('https://api.runelite.net/')

// Actions
export const {
  fetchConfig,
  updateConfig,
  setConfig,
  changeAccount,
  setTileMarkersFilter
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
    },
    UPDATE_CONFIG: config => async (dispatch, getState) => {
      const version = getLatestRelease(getState())
      const uuid = getState().account.uuid

      if (!uuid) {
        return {}
      }

      config = {
        config: Object.keys(config).map(key => ({
          key: key,
          value: config[key]
        }))
      }

      await runeliteApi(`runelite-${version}/config`, {
        method: 'PATCH',
        headers: {
          'RUNELITE-AUTH': uuid,
          'content-type': 'application/json'
        },
        mode: 'cors',
        body: config
      })

      await dispatch(fetchConfig())
    }
  },
  'SET_CONFIG',
  'CHANGE_ACCOUNT',
  'SET_TILE_MARKERS_FILTER'
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
    [setTileMarkersFilter]: (state, { payload }) => ({
      ...state,
      filter: {
        ...state.filter,
        tileMarkers: payload
      }
    })
  },
  {
    config: {},
    selectedAccount: null,
    filter: {
      tileMarkers: ''
    }
  }
)

// Selectors
export const getConfig = state => state.config.config
export const getSelectedAccount = state => state.config.selectedAccount
export const getTileMarkersFilter = state => state.config.filter.tileMarkers

export const getAccounts = createSelector(getConfig, config => {
  const accounts = []

  for (let key in config) {
    if (key.startsWith('rsprofile.rsprofile.')) {
      const tokens = key.split('.')
      const id = tokens[2]
      const pkey = tokens[3]

      let a = accounts.find(e => e.accountId === id)
      if (a === undefined) {
        a = {
          accountId: id
        }
        accounts.push(a)
      }

      a[pkey] = config[key]
    }
  }

  return accounts
})

export const getSlayerTask = createSelector(
  getConfig,
  getSelectedAccount,
  (config, selectedAccount) => {
    if (!selectedAccount) {
      return {
        hasTask: false
      }
    }

    const prefix = 'slayer.rsprofile.' + selectedAccount.accountId + '.'

    if (!config[prefix + 'taskName']) {
      return {
        hasTask: false
      }
    }

    return {
      hasTask: true,
      name: config[prefix + 'taskName'],
      location: config[prefix + 'taskLocation'],
      start: config[prefix + 'initialAmount'],
      remaining: config[prefix + 'amount'],
      streak: config[prefix + 'streak'],
      points: config[prefix + 'points']
    }
  }
)

export const getBossLog = createSelector(
  getConfig,
  getSelectedAccount,
  (config, selectedAccount) => {
    const kcPrefix = 'killcount.rsprofile.'
    const pbPrefix = 'personalbest.rsprofile.'
    const data = new Map()

    if (!selectedAccount) {
      return flattenMap(data)
    }

    const accountId = selectedAccount.accountId

    for (let [key, value] of Object.entries(config)) {
      if (key.startsWith(kcPrefix)) {
        key = key.replace(kcPrefix, '')

        if (!key.startsWith(accountId)) {
          continue
        }

        key = key.replace(accountId + '.', '')

        if (data.has(key)) {
          const existing = data.get(key)
          existing.kc = value
        } else {
          data.set(key, { kc: value })
        }
      } else if (key.startsWith(pbPrefix)) {
        key = key.replace(pbPrefix, '')

        if (!key.startsWith(accountId)) {
          continue
        }

        key = key.replace(accountId + '.', '')

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

export const getTileMarkers = createSelector(getConfig, config => {
  const findCurrentRegion = regionNumber => {
    for (const region of regions) {
      if (region.regions.includes(regionNumber)) {
        return region.name
      }
    }

    return ''
  }

  const configPrefix = 'groundMarker.region_'
  const tiles = []

  for (let [key, value] of Object.entries(config)) {
    if (!key.startsWith(configPrefix)) {
      continue
    }

    const region = parseInt(key.replace(configPrefix, ''))

    tiles.push({
      name: findCurrentRegion(region),
      region: region,
      data: JSON.parse(value)
    })
  }

  return tiles
})

export const getProfileConfig = createSelector(
  getConfig,
  getSelectedAccount,
  (config, selectedAccount) => {
    const profileConfig = {}

    if (!selectedAccount) {
      return profileConfig
    }

    const accountId = selectedAccount.accountId

    for (let [key, value] of Object.entries(config)) {
      if (key.includes(accountId)) {
        profileConfig[key] = value
      }
    }

    return profileConfig
  }
)
