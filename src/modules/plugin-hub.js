import { createActions, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import { prop, sortBy } from 'ramda'
import { getLatestRelease } from './bootstrap'
import api from '../api'

const pluginHubUrl = 'https://repo.runelite.net/plugins/'
const pluginHubApi = api(pluginHubUrl)

// Actions
export const {
  fetchExternalPlugins,
  setExternalPlugins,
  setPluginFilter
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
      const jsonStr = String.fromCharCode.apply(
        null,
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
    }
  },
  'SET_EXTERNAL_PLUGINS',
  'SET_PLUGIN_FILTER'
)

// Reducer
export default handleActions(
  {
    [setExternalPlugins]: (state, { payload }) => ({
      ...state,
      data: payload
    }),
    [setPluginFilter]: (state, { payload }) => ({
      ...state,
      filter: {
        ...state.filter,
        ...payload
      }
    })
  },
  {
    filter: {
      name: ''
    },
    data: []
  }
)

// Selectors
export const getExternalPlugins = state => state.externalPlugins.data
export const getPluginFilter = state => state.externalPlugins.filter

export const getFilteredExternalPlugins = createSelector(
  getExternalPlugins,
  getPluginFilter,
  (externalPlugins, filter) =>
    externalPlugins.filter(
      p =>
        !filter.name ||
        p.displayName.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1
    )
)

export const getSortedExternalPlugins = createSelector(
  getFilteredExternalPlugins,
  externalPlugins => sortBy(prop('displayName'), externalPlugins)
)
