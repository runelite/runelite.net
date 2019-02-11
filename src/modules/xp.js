import dayjs from 'dayjs'
import { concat, forEachObjIndexed, uniq } from 'ramda'
import { createActions, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import skills from '../_data/skills'
import api from '../api'
import { latestReleaseSelector } from './git'

const runeliteApi = api('https://api.runelite.net/')

// Actions
export const { getXpRange, setXp, setXpRange } = createActions(
  {
    GET_XP_RANGE: ({ skill, name, start, end }) => async (
      dispatch,
      getState
    ) => {
      dispatch(setXpRange([]))

      const version = latestReleaseSelector(getState()).name
      const results = []

      for (
        let momDate = dayjs(start);
        momDate.diff(end, 'day') <= 0;
        momDate = momDate.add(1, 'day')
      ) {
        const date = momDate.toDate()
        const dateString = date.toISOString()

        results.push(
          runeliteApi(
            `runelite-${version}/xp/get?username=${name}&time=${dateString}`,
            {
              method: 'GET'
            }
          ).then(dayResponse => {
            const formattedResponse = {
              date,
              ...dayResponse
            }

            dispatch(setXp(formattedResponse))
          })
        )
      }

      return await Promise.all(results)
    }
  },
  'SET_XP',
  'SET_XP_RANGE'
)

// Reducer
export default handleActions(
  {
    [setXp]: (state, { payload }) => uniq(concat(state, [payload])),
    [setXpRange]: (state, { payload }) => payload || []
  },
  []
)

const calculateOverallXp = xpEntry =>
  Object.keys(skills)
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
          rank: curObj.rank > 0 ? curObj.rank - value : value
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

// Selectors
export const xpSelector = state =>
  state.xp
    .filter(xpEntry => Boolean(xpEntry))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(xpEntry => ({
      ...xpEntry,
      overall_xp: calculateOverallXp(xpEntry)
    }))

export const collectedXpSelector = createSelector(
  xpSelector,
  xp => {
    const collector = {}
    if (xp.length === 0) {
      return collector
    }

    const startEntry = xp[0]
    const endEntry = xp[xp.length - 1]
    forEachObjIndexed(calculateRanksAndExp(collector), startEntry)
    forEachObjIndexed(calculateRanksAndExp(collector), endEntry)
    return collector
  }
)
