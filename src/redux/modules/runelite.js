import { createAction, handleActions } from 'redux-actions'
import { createRoutine } from 'redux-routines'
import { createSelector } from 'reselect'
import { getReleases } from './git'
import api from '../../api'

const runeliteApi = api('https://api.runelite.net/')

// Actions
export const getSessionCountRoutine = createRoutine('react-ui/runelite/GET_SESSION_COUNT')

// Reducer
export default handleActions({
  [getSessionCountRoutine.SUCCESS]: (state, { payload }) => ({
    ...state,
    sessionCount: payload
  })
}, {
  sessionCount: 0
})

// Action creators
export const getSessionCount = createAction(getSessionCountRoutine.TRIGGER, () => async (dispatch) => {
  try {
    dispatch(getSessionCountRoutine.request())
    const releases = await dispatch(getReleases())

    if (releases.length === 0) {
      dispatch(getSessionCountRoutine.failure(new Error('Empty releases')))
      return
    }

    const release = releases[0]
    const version = release.name.substr(
      release.name.lastIndexOf('-') + 1,
      release.name.length)

    const response = await runeliteApi.wrapFailure(dispatch, runeliteApi.fetch(
      `runelite-${version}/session/count`, { method: 'GET' }
    ))

    dispatch(getSessionCountRoutine.success(response))
    return response
  } catch (e) {
    dispatch(getSessionCountRoutine.failure(e))
  } finally {
    dispatch(getSessionCountRoutine.fulfill())
  }
})

// Selectors
export const sessionCountSelector = createSelector(
  state => state.runelite.sessionCount,
  sessionCount => sessionCount
)
