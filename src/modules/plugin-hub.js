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
        `manifest/${version}_full.js`,
        { method: 'GET' },
        true
      )

      const signatureSize = new DataView(response).getUint32(0)

      // Removes the signature, and it's 4byte header, then converts the result into a string
      const jsonStr = new TextDecoder('utf-8').decode(
        new Uint8Array(response.slice(signatureSize + 4))
      )

      const pluginManifest = JSON.parse(jsonStr)
      const pluginDisplay = pluginManifest.display
      const pluginJars = pluginManifest.jars
      const plugins = pluginDisplay.map(p => {
        if (p.iconHash) {
          p.imageUrl = `${pluginHubUrl}icon/${p.internalName}_${p.iconHash}.png`
        }
        p.working = !!pluginJars.find(j => j.internalName === p.internalName)
        p.description = p.description
          .replace(/<br\/?>/g, '\n')
          .replace(/<[^>]+>/g, '')
        p.unavailableReason = (p.unavailableReason || '')
          .replace(/<br\/?>/g, '\n')
          .replace(/<[^>]+>/g, '')
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
      let disabled = false

      response.split('\n').forEach(line => {
        const kv = line.split('=')

        if (kv[0] === 'repository') {
          repository = kv[1]
        }

        if (kv[0] === 'commit') {
          commit = kv[1]
        }

        if (kv[0] === 'disabled') {
          disabled = true
        }
      })

      if (!repository || disabled) {
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

      let rawReadmeHTML = await githubApi(
        `repos/${user}/${repo}/readme?ref=${commit}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/vnd.github.VERSION.html'
          }
        }
      )

      let readme = ''

      /**
       * @param {string} url
       * @param {HTMLElement} context
       * @returns {string}
       */
      function mungeURL(url, context) {
        if (url.startsWith('#')) {
          // this is a fragment only url; it should be relative to this page

          // the ids in the page start with `user-content-`, but the urls do not
          return '#user-content-' + url.substring(1)
        }

        // github allows users to make their url an absolute-path, but actually refer to their repo root
        if (url.startsWith('/')) {
          url = url.substring(1)
        }

        let newRoot = `https://github.com/${user}/${repo}/tree/${commit}/`
        if (context.tagName === 'IMG') {
          newRoot = `https://raw.githubusercontent.com/${user}/${repo}/${commit}/`
        }

        url = new URL(url, newRoot).toString()

        return url
      }

      try {
        let dom = new DOMParser().parseFromString(rawReadmeHTML, 'text/html')
        dom.querySelectorAll('a').forEach(el => {
          el.href = mungeURL(el.getAttribute('href'), el)
        })
        dom.querySelectorAll('img').forEach(el => {
          let src = el.getAttribute('src')

          // people like to use massive (50+ MiB) gifs, so turn these into links
          if (src.endsWith('.gif')) {
            let label = el.title || el.alt || src
            if (el.parentElement?.tagName === 'A') {
              // we are already in a link, just use that
              el.parentElement.textContent = label
            } else {
              let replacement = document.createElement('a')
              replacement.target = '_blank'
              replacement.textContent = label
              replacement.href = mungeURL(src, replacement)
              el.replaceWith(replacement)
            }
          } else {
            el.src = mungeURL(src, el)
          }
        })

        // this is dumb, but react makes doing this right painful
        readme = dom.body.innerHTML
      } catch (e) {
        console.error('Loading readme failed', e)
      }

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
    externalPlugins = externalPlugins
      .sort((a, b) =>
        a.displayName.toLowerCase().localeCompare(b.displayName.toLowerCase())
      )
      .sort((a, b) => b.working - a.working)

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
