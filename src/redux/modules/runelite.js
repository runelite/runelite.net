import * as R from 'ramda'
import { createAction, handleActions } from 'redux-actions'
import { createRoutine } from 'redux-routines'
import { createSelector } from 'reselect'
import { getReleases } from './git'
import api from '../../api'
import moment from 'moment'

const runeliteApi = api('https://api.runelite.net/')

// Actions
export const getXpRoutine = createRoutine('react-ui/runelite/GET_XP')
export const getXpRangeRoutine = createRoutine('react-ui/runelite/GET_XP_RANGE')
export const getSessionCountRoutine = createRoutine('react-ui/runelite/GET_SESSION_COUNT')

// Reducer
export default handleActions({
  [getSessionCountRoutine.SUCCESS]: (state, { payload }) => ({
    ...state,
    sessionCount: payload
  }),
  [getXpRoutine.SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload,
    xp: R.concat(state.xp, [payload.xp])
  }),
  [getXpRangeRoutine.SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload
  })
}, {
  sessionCount: 0,
  xp: [],
  name: '',
  start: '',
  end: ''
})

const getLatestVersion = async (dispatch) => {
  const releases = await dispatch(getReleases())

  if (releases.length === 0) {
    return
  }

  const release = releases[0]

  return release.name.substr(
    release.name.lastIndexOf('-') + 1,
    release.name.length)
}

// Action creators
export const getSessionCount = createAction(getSessionCountRoutine.TRIGGER, () => async (dispatch) => {
  try {
    dispatch(getSessionCountRoutine.request())
    const version = await getLatestVersion(dispatch)

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

export const getXp = createAction(getSessionCountRoutine.TRIGGER, (name, date) => async (dispatch) => {
  try {
    dispatch(getXpRoutine.request())
    const version = await getLatestVersion(dispatch)
    const dateString = date.toISOString()

    const response = await runeliteApi.wrapFailure(dispatch, runeliteApi.fetch(
      `runelite-${version}/xp/get?username=${name}&time=${dateString}`, { method: 'GET' }
    ))

    const formattedResponse = {
      name,
      start: date,
      end: date,
      xp: {
        date,
        ...response
      }
    }

    dispatch(getXpRoutine.success(formattedResponse))
    return formattedResponse
  } catch (e) {
    dispatch(getXpRoutine.failure(e))
  } finally {
    dispatch(getXpRoutine.fulfill())
  }
})

export const getXpRange = createAction(getSessionCountRoutine.TRIGGER, ({name, start, end}) => async (dispatch) => {
  try {
    dispatch(getXpRangeRoutine.request())

    const endDate = end === 'now' ? new Date() : new Date(end)
    let startDate = Date.parse(start)

    if (isNaN(start)) {
      const parsed = start.match(/(\d+)(\w+)/)
      startDate = moment(endDate).subtract(parsed[1], parsed[2]).toDate()
    } else {
      startDate = new Date(startDate)
    }

    const dayXps = []

    for (let d = new Date(startDate); new Date(d.getTime()) <= endDate; d.setDate(d.getDate() + 1)) {
      const dayXp = await dispatch(getXp(name, new Date(d.getTime())))
      dayXps.push(dayXp.xp)
    }

    const formattedResponse = {
      name,
      start: startDate,
      end: endDate,
      xp: dayXps
    }

    dispatch(getXpRangeRoutine.success(formattedResponse))
    return formattedResponse
  } catch (e) {
    dispatch(getXpRangeRoutine.failure(e))
  } finally {
    dispatch(getXpRangeRoutine.fulfill())
  }
})

// Selectors
export const sessionCountSelector = createSelector(
  state => state.runelite.sessionCount,
  sessionCount => sessionCount
)
