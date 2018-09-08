import dayjs from 'dayjs'
import { uniq, concat, forEachObjIndexed } from 'ramda'
import { createActions, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import skills from '../_data/skills'
import api from '../api'
import { startLoading, stopLoading } from './app'
import { latestReleaseSelector } from './git'

const runeliteApi = api('https://api.runelite.net/')

// Actions
export const {
  getSessionCount,
  getXpRange,
  setSessionCount,
  setXp,
  setXpRange
} = createActions(
  {
    GET_SESSION_COUNT: () => async (dispatch, getState) => {
      dispatch(startLoading())

      const version = latestReleaseSelector(getState()).name

      const response = await runeliteApi(`runelite-${version}/session/count`, {
        method: 'GET'
      })

      dispatch(setSessionCount(response))
      dispatch(stopLoading())
      return response
    },
    GET_XP_RANGE: ({ skill, name, start, end }) => async (
      dispatch,
      getState
    ) => {
      dispatch(startLoading())
      dispatch(
        setXpRange({
          start,
          end,
          name,
          skill
        })
      )

      const version = latestReleaseSelector(getState()).name
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

        dispatch(setXp(formattedResponse))
        xp.push(formattedResponse)
      }

      dispatch(stopLoading())
    }
  },
  'SET_SESSION_COUNT',
  'SET_XP',
  'SET_XP_RANGE'
)

// Reducer
export default handleActions(
  {
    [setSessionCount]: (state, { payload }) => ({
      ...state,
      sessionCount: payload
    }),
    [setXp]: (state, { payload }) => ({
      ...state,
      xp: uniq(concat(state.xp, [payload]))
    }),
    [setXpRange]: (state, { payload }) => ({
      ...state,
      ...payload
    })
  },
  {
    sessionCount: 0,
    xp: []
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
  collectedSkills =>
    skillNames.map(name => ({
      skill: name,
      ...(collectedSkills[name]
        ? inverseRank(collectedSkills[name])
        : {
          xp: 0,
          rank: 0
        })
    }))
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
