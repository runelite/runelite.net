import { createActions, handleActions } from 'redux-actions'
import { getLatestRelease } from './bootstrap'
import api from '../api'

const pluginHubUrl = 'https://repo.runelite.net/plugins/'
const pluginHubApi = api(pluginHubUrl)

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
