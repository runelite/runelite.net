import { createActions, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import { getLatestRelease } from './bootstrap'
import { getExternalPlugins as getConfigExternalPlugins } from './config'
import api from '../api'

const pluginHubUrl = 'https://repo.runelite.net/plugins/'
const pluginHubApi = api(pluginHubUrl)
const runeliteApi = api('https://api.runelite.net/')

// Actions
export const {
  fetchExternalPlugins,
  fetchPluginHubStats,
  setExternalPlugins,
  setPluginHubStats,
  setPluginFilter,
  setPluginSorting
} = createActions(
  {
    FETCH_EXTERNAL_PLUGINS: () => async (dispatch, getState) => {
      const version = getLatestRelease(getState())
      const response = await pluginHubApi(
        `${version}/manifest.js`,
        { method: 'GET' },
        true
      )

      const signatureSize = new DataView(response).getUint32(0)

      // Removes the signature, and it's 4byte header, then converts the result into a string
      const jsonStr = new TextDecoder('utf-8').decode(
        new Uint8Array(response.slice(signatureSize + 4))
      )

      const pluginManifest = JSON.parse(jsonStr)
      const plugins = pluginManifest.map(p => {
        if (p.hasIcon) {
          p.imageUrl = `${pluginHubUrl}${version}/${p.internalName}/${p.commit}.png`
        }

        return p
      })

      dispatch(setExternalPlugins(plugins))
      return plugins
    },
    FETCH_PLUGIN_HUB_STATS: () => async (dispatch, getState) => {
      const version = getLatestRelease(getState())
      const response = await runeliteApi(`runelite-${version}/pluginhub`, {
        method: 'GET'
      })

      dispatch(setPluginHubStats(response))
      return response
    }
  },
  'SET_EXTERNAL_PLUGINS',
  'SET_PLUGIN_HUB_STATS',
  'SET_PLUGIN_FILTER',
  'SET_PLUGIN_SORTING'
)

// Reducer
export default handleActions(
  {
    [setExternalPlugins]: (state, { payload }) => ({
      ...state,
      data: payload
    }),
    [setPluginHubStats]: (state, { payload }) => ({
      ...state,
      stats: payload
    }),
    [setPluginFilter]: (state, { payload }) => ({
      ...state,
      filter: {
        ...state.filter,
        ...payload
      }
    }),
    [setPluginSorting]: (state, { payload }) => ({
      ...state,
      sorting: payload
    })
  },
  {
    filter: {
      name: ''
    },
    sorting: 'active installs',
    data: [],
    stats: {}
  }
)

// Selectors
export const getExternalPlugins = state => state.externalPlugins.data
export const getPluginHubStats = state => state.externalPlugins.stats
export const getPluginFilter = state => state.externalPlugins.filter
export const getPluginSorting = state => state.externalPlugins.sorting

export const getExternalPluginsWithState = createSelector(
  getExternalPlugins,
  getPluginHubStats,
  getConfigExternalPlugins,
  (externalPlugins, pluginHubStats, configExternal) => {
    return externalPlugins.map(p => {
      p.installed = configExternal.includes(p.internalName)
      p.count = pluginHubStats.hasOwnProperty(p.internalName)
        ? pluginHubStats[p.internalName]
        : 0
      return p
    })
  }
)

export const getFilteredExternalPlugins = createSelector(
  getExternalPluginsWithState,
  getPluginFilter,
  (externalPlugins, filter) =>
    externalPlugins.filter(
      p =>
        !filter.name ||
        p.displayName.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1 ||
        p.author.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1 ||
        p.description.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1
    )
)

export const getSortedExternalPlugins = createSelector(
  getPluginSorting,
  getFilteredExternalPlugins,
  (pluginSorting, externalPlugins) => {
    externalPlugins = externalPlugins.sort((a, b) =>
      a.displayName.toLowerCase().localeCompare(b.displayName.toLowerCase())
    )

    switch (pluginSorting) {
      case 'active installs':
        return externalPlugins.sort((a, b) => b.count - a.count)
      case 'time updated':
        return externalPlugins.sort((a, b) => b.lastUpdatedAt - a.lastUpdatedAt)
      case 'time added':
        return externalPlugins.sort((a, b) => b.createdAt - a.createdAt)
      case 'name':
      default:
        return externalPlugins
    }
  }
)
