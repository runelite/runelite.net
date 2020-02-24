import { createActions, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import api from '../api'

const srnApi = api('https://static.runelite.net/')

// Actions
export const { fetchBootstrap, setBootstrap } = createActions(
  {
    FETCH_BOOTSTRAP: () => async dispatch => {
      const response = await srnApi(`bootstrap.json`, { method: 'GET' })

      dispatch(setBootstrap(response))
      return response
    }
  },
  'SET_BOOTSTRAP'
)

// Reducer
export default handleActions(
  {
    [setBootstrap]: (state, { payload }) => payload
  },
  {}
)

// Selectors
const getBootstrap = state => state.bootstrap

export const getLatestRelease = createSelector(getBootstrap, bootstrap => {
  if ('client' in bootstrap) {
    return bootstrap['client']['version']
  }

  return ''
})
