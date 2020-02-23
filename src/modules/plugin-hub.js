import { uniq, concat } from 'ramda'
import { createActions, handleActions } from 'redux-actions'
import { getLatestRelease } from './bootstrap'

const pluginHubUrl = 'https://repo.runelite.net/plugins/'

// Actions
export const { fetchExternalPlugins, setExternalPlugins } = createActions(
  {
    FETCH_EXTERNAL_PLUGINS: () => async (dispatch, getState) => {
      const version = getLatestRelease(getState())
      const response = await window.fetch(
        `${pluginHubUrl}${version}/manifest.js`,
        { method: 'GET' }
      )
      if (!response.ok) {
        throw new Error(response.statusText)
      }
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
        // Remove any tags from the description that are used for formatting inside the client
        p.description = p.description
          .replace(/<br\/?>/g, '\n')
          .replace(/<[^>]+>/g, '')
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
    [setExternalPlugins]: (state, { payload }) => uniq(concat(state, payload))
  },
  []
)
