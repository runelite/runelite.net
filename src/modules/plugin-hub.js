import { createActions, handleActions } from 'redux-actions'
import { getLatestRelease } from './bootstrap'
import api from '../api'

const pluginHubUrl = 'https://repo.runelite.net/plugins/'
const pluginHubApi = api('https://repo.runelite.net/plugins/')

// Actions
export const { fetchExternalPlugins, setExternalPlugins } = createActions(
  {
    FETCH_EXTERNAL_PLUGINS: () => async (dispatch, getState) => {
      const version = getLatestRelease(getState())
      const response = await pluginHubApi(
        `${version}/manifest.js`,
        { method: 'GET' },
        true
      )
      const buffer = await response.arrayBuffer()
      const signatureSize = new DataView(buffer).getUint32(0)
      // Removes the signature, and it's 4byte header, then converts the result into a string
      const jsonStr = String.fromCharCode.apply(
        null,
        new Uint8Array(buffer.slice(signatureSize + 4))
      )

      const pluginManifest = JSON.parse(jsonStr)
      const plugins = pluginManifest.map(p => {
        if (p.hasIcon) {
          p.imageUrl = `${pluginHubUrl}${version}/${p.internalName}/${p.commit}.png`
        } else {
          p.imageUrl = '/img/plugin-hub/missingicon.png'
        }

        return p
      })
      dispatch(setExternalPlugins(plugins))
      return plugins
    }
  },
  'SET_EXTERNAL_PLUGINS'
)

// Reducer
export default handleActions(
  {
    [setExternalPlugins]: (state, { payload }) => payload
  },
  []
)

// Selectors
export const getExternalPlugins = state => state.externalPlugins
