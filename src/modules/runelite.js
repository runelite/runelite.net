import dayjs from 'dayjs'
import { uniq, concat, forEachObjIndexed } from 'ramda'
import { createAction, handleActions } from 'redux-actions'
import { createRoutine } from 'redux-routines'
import { createSelector } from 'reselect'
import skills from '../_data/skills'
import api from '../api'
import { startLoading, stopLoading } from './app'
import { getReleases } from './git'

const runeliteApi = api('https://api.runelite.net/')

// Actions
export const getXpRoutine = createRoutine('react-ui/runelite/GET_XP')
export const getXpRangeRoutine = createRoutine(
  'react-ui/runelite/GET_XP_RANGE'
)
export const getSessionCountRoutine = createRoutine(
  'react-ui/runelite/GET_SESSION_COUNT'
)

// Reducer
export default handleActions(
  {
    [getSessionCountRoutine.SUCCESS]: (state, { payload }) => ({
      ...state,
      sessionCount: payload
    }),
    [getXpRoutine.SUCCESS]: (state, { payload }) => ({
      ...state,
      xp: uniq(concat(state.xp, [payload]))
    }),
    [getXpRangeRoutine.REQUEST]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [getXpRangeRoutine.SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload
    })
  },
  {
    sessionCount: 0,
    xp: []
  }
)

const getLatestVersion = async dispatch => {
  const releases = await dispatch(getReleases())

  if (releases.length === 0) {
    return
  }

  const release = releases[0]

  return release.name.substr(
    release.name.lastIndexOf('-') + 1,
    release.name.length
  )
}

// Action creators
export const getSessionCount = createAction(
  getSessionCountRoutine.TRIGGER,
  () => async dispatch => {
    dispatch(startLoading())
    const version = await getLatestVersion(dispatch)

    const response = await runeliteApi(`runelite-${version}/session/count`, {
      method: 'GET'
    })

    dispatch(getSessionCountRoutine.success(response))
    dispatch(stopLoading())
    return response
  }
)

export const getXpRange = createAction(
  getXpRangeRoutine.TRIGGER,
  ({ skill, name, start, end }) => async dispatch => {
    dispatch(
      getXpRangeRoutine.request({
        start,
        end,
        name,
        skill
      })
    )

    const version = await getLatestVersion(dispatch)

    dispatch(startLoading())
    const xp = []

    for (
      let momDate = dayjs(start);
      momDate.diff(end, 'day') <= 0;
      momDate = momDate.add(1, 'day')
    ) {
      const date = momDate.toDate()
      const dateString = date.toISOString()

      const dayResponse = await runeliteApi(
        `runelite-${version}/xp/get?username=${name}&time=${dateString}`,
        {
          method: 'GET'
        }
      )

      const formattedResponse = {
        date,
        ...dayResponse
      }

      dispatch(getXpRoutine.success(formattedResponse))
      xp.push(formattedResponse)
    }

    dispatch(getXpRangeRoutine.success({ xp }))
    dispatch(stopLoading())
  }
)

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1)
const skillNames = Object.keys(skills)
const capitalizedSkills = Object.keys(skills).map(skill =>
  capitalizeFirstLetter(skill)
)
const calculateOverallXp = xpEntry =>
  skillNames
    .map(skill => xpEntry[skill + '_xp'] || 0)
    .reduce((a, b) => a + b, 0)

const calculateRanksAndExp = collector => (value, key) => {
  let curKey = key
  let isRank = true

  if (key.indexOf('_rank') !== -1) {
    curKey = key.replace('_rank', '')
    isRank = true
  } else if (key.indexOf('_xp') !== -1) {
    curKey = key.replace('_xp', '')
    isRank = false
  } else {
    return
  }

  const curObj = collector[curKey]

  if (isRank) {
    collector[curKey] = curObj
      ? {
        ...curObj,
        rank: value - curObj.rank
      }
      : {
        xp: 0,
        rank: value
      }
  } else {
    collector[curKey] = curObj
      ? {
        ...curObj,
        xp: value - curObj.xp
      }
      : {
        xp: value,
        rank: 0
      }
  }
}

const inverseRank = rankCollector => {
  rankCollector.rank = -rankCollector.rank
  return rankCollector
}

// Selectors
export const sessionCountSelector = state => state.runelite.sessionCount
export const xpSelector = state =>
  state.runelite.xp.filter(xpEntry => Boolean(xpEntry))
export const nameSelector = (state, props) => props.name
export const skillSelector = (state, props) => props.skill

export const skillDatesSelector = createSelector(xpSelector, xp =>
  xp.map(xpEntry => xpEntry.date.toDateString())
)

export const xpWithOverallSelector = createSelector(xpSelector, xp =>
  xp.map(xpEntry => ({
    ...xpEntry,
    overall_xp: calculateOverallXp(xpEntry)
  }))
)

export const collectedSkillsSelector = createSelector(
  xpWithOverallSelector,
  xp => {
    const startEntry = xp[0]
    const endEntry = xp[xp.length - 1]
    const collector = {}
    forEachObjIndexed(calculateRanksAndExp(collector), startEntry)
    forEachObjIndexed(calculateRanksAndExp(collector), endEntry)
    return collector
  }
)

export const ranksSelector = createSelector(
  collectedSkillsSelector,
  collectedSkills => {
    const ranks = skillNames
      .map(name => ({
        skill: name,
        ...(collectedSkills[name]
          ? inverseRank(collectedSkills[name])
          : {
            xp: 0,
            rank: 0
          })
      }))
      .sort()

    return ranks
  }
)

export const skillRankSelector = createSelector(
  skillSelector,
  skillDatesSelector,
  xpWithOverallSelector,
  (skill, dates, xp) => ({
    labels: dates,
    series: [
      xp.map(xpEntry => ({
        meta: xpEntry.date.toDateString(),
        value: xpEntry[skill + '_rank']
      }))
    ]
  })
)

export const skillXpSelector = createSelector(
  skillSelector,
  skillDatesSelector,
  xpWithOverallSelector,
  (skill, dates, xp) => ({
    labels: dates,
    series: [
      xp.map(xpEntry => ({
        meta: xpEntry.date.toDateString(),
        value: xpEntry[skill + '_xp']
      }))
    ]
  })
)

export const allXpSelector = createSelector(
  collectedSkillsSelector,
  collectedXp => ({
    labels: capitalizedSkills,
    series: [
      skillNames.map(skill => ({
        meta: skill,
        value: collectedXp[skill] ? collectedXp[skill].xp : 0
      }))
    ]
  })
)

export const allRanksSelector = createSelector(
  collectedSkillsSelector,
  collectedXp => ({
    labels: capitalizedSkills,
    series: [
      skillNames.map(skill => ({
        meta: skill,
        value: collectedXp[skill] ? collectedXp[skill].rank : 0
      }))
    ]
  })
)
