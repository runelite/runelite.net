import { createActions, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import { getLatestRelease } from './bootstrap'
import { getExternalPlugins as getConfigExternalPlugins } from './config'
import api from '../api'

const pluginHubUrl = 'https://repo.runelite.net/plugins/'
const pluginHubApi = api(pluginHubUrl)
const runeliteApi = api('https://api.runelite.net/')
const githubApi = api('https://api.github.com/')
const githubRawApi = api(
  'https://raw.githubusercontent.com/runelite/plugin-hub/master/plugins/'
)

// Actions
export const {
  fetchExternalPlugins,
  fetchExternalPluginInfo,
  fetchPluginHubStats,
  setExternalPlugins,
  setExternalPluginInfo,
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
    FETCH_EXTERNAL_PLUGIN_INFO: internalName => async (dispatch, getState) => {
      const response = await githubRawApi(internalName, {
        method: 'GET'
      })

      let repository = ''
      let commit = ''

      response.split('\n').forEach(line => {
        const kv = line.split('=')

        if (kv[0] === 'repository') {
          repository = kv[1]
        }

        if (kv[0] === 'commit') {
          commit = kv[1]
        }
      })

      if (!repository) {
        return
      }

      const repoSplit = repository
        .replace('https://', '')
        .replace('http://', '')
        .split('/')

      if (repoSplit.length < 3) {
        return
      }

      const user = repoSplit[1]
      const repo = repoSplit[2].replace('.git', '')

      let readme = await githubApi(
        `repos/${user}/${repo}/readme?ref=${commit}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/vnd.github.VERSION.html'
          }
        }
      )

      readme = readme
        // Fix relative URLs to images
        .replace(
          /<img src\s*=\s*"((?!http)[^"]+)"([^>]*)>/g,
          `<img src="https://raw.githubusercontent.com/${user}/${repo}/${commit}/$1"$2>`
        )
        // Fix relative URLs for asset links
        .replace(
          /<a target="_blank" rel="noopener noreferrer" href\s*=\s*"((?!http)[^"]+)"([^>]*)>/g,
          `<a target="_blank" rel="noopener noreferrer" href="https://raw.githubusercontent.com/${user}/${repo}/${commit}/$1"$2>`
        )
        // Replace GIFs with links to GIFs
        .replace(
          /<img src\s*=\s*"((?:.+\/)?(.+\.gif))"([^>]*)>/g,
          '<a href="$1" target="_blank">$2</a>'
        )

      dispatch(
        setExternalPluginInfo({
          internalName,
          github: {
            readme,
            user,
            repo,
            commit
          }
        })
      )

      return readme
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
  'SET_EXTERNAL_PLUGIN_INFO',
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
    [setExternalPluginInfo]: (state, { payload }) => ({
      ...state,
      data: state.data
        .filter(p => p.internalName !== payload.internalName)
        .concat([
          {
            ...state.data.find(d => d.internalName === payload.internalName),
            ...payload
          }
        ])
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
        p.description.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1 ||
        (p.tags &&
          p.tags.some(tag =>
            tag.toLowerCase().includes(filter.name.toLowerCase())
          ))
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
      case 'installed':
        return externalPlugins.sort((a, b) =>
          a.installed === b.installed ? 0 : a.installed ? -1 : 1
        )
      case 'name':
      default:
        return externalPlugins
    }
  }
)
