import dayjs from 'dayjs'
import { uniq, concat } from 'ramda'
import { createActions, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import skills from '../_data/skills'
import api from '../api'
import { startLoading, stopLoading } from './app'
import { latestReleaseSelector } from './git'

const runeliteApi = api('https://api.runelite.net/')
const runeliteStaticApi = api('https://static.runelite.net/')

// Actions
export const {
  getSessionCount,
  getXpRange,
  getItemInfo,
  setSessionCount,
  setXp,
  setXpRange,
  setItemInfo
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

      const result = await Promise.all(results)
      dispatch(stopLoading())
      return result
    },
    GET_ITEM_INFO: items => async (dispatch, getState) => {
      dispatch(startLoading())
      const version = latestReleaseSelector(getState()).name
      const names = await runeliteStaticApi('cache/item/names.json', {
        method: 'GET'
      })

      const result = await Promise.all(
        items.map(item =>
          runeliteApi(`runelite-${version}/examine/item/${item}`, {
            method: 'GET'
          }).then(examine => {
            dispatch(
              setItemInfo({
                id: item,
                name: names[item],
                examine
              })
            )
          })
        )
      )

      dispatch(stopLoading())
      return result
    }
  },
  'SET_SESSION_COUNT',
  'SET_XP',
  'SET_XP_RANGE',
  'SET_ITEM_INFO'
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
    }),
    [setItemInfo]: (state, { payload }) => ({
      ...state,
      items: uniq(concat(state.items, [payload]))
    })
  },
  {
    sessionCount: 0,
    xp: [],
    items: []
  }
)

const calculateOverallXp = xpEntry =>
  Object.keys(skills)
    .map(skill => xpEntry[skill + '_xp'] || 0)
    .reduce((a, b) => a + b, 0)

const calcRankAndExp = (start = {}, end = {}) => {
  const unWantedKeys = ['time', 'date']

  const skillKeys = Object.keys(start).map(key => key.split('_')[0])

  const wantedKeys = [...new Set(skillKeys)]

  const skillData = wantedKeys.reduce((acc, key) => {
    if (unWantedKeys.includes(key)) return acc

    const xpKey = `${key}_xp`
    const rankKey = `${key}_rank`

    const startXp = start[xpKey]
    const endXp = end[xpKey]

    const startLvl = getLevelByExp(startXp)
    const endLvl = getLevelByExp(endXp)

    acc[key] = {
      xp: endXp - startXp,
      rank: start[rankKey] - end[rankKey],
      lvl: endLvl - startLvl
    }

    return acc
  }, {})

  const totalLevelsGained = Object.keys(skillData).reduce((acc, key) => {
    if (key === 'overall') return acc
    acc = acc + skillData[key]['lvl']
    return acc
  }, 0)

  if (skillData['overall']) skillData['overall']['lvl'] = totalLevelsGained

  return skillData
}

const expForLevel = level => {
  return Math.floor(Math.floor(level + 300 * Math.pow(2, level / 7)) / 4)
}
const expForLevels = Array.from({ length: 126 }).reduce((acc, _, i) => {
  const expForNextlevel = expForLevel(i + 1)

  if (i === 0) return (acc = [...acc, expForNextlevel])

  return (acc = [...acc, acc[i - 1] + expForNextlevel])
}, [])

const getLevelByExp = (exp = 0) => {
  // The +2 offsets the 0 based index and that you start at level 1
  return (
    expForLevels.findIndex((_, index, list) => {
      return exp >= list[index - 1] && exp <= list[index + 1]
    }) + 2
  )
}

// Selectors
export const sessionCountSelector = state => state.runelite.sessionCount
export const xpSelector = state =>
  state.runelite.xp
    .filter(xpEntry => Boolean(xpEntry))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(xpEntry => ({
      ...xpEntry,
      overall_xp: calculateOverallXp(xpEntry)
    }))

export const collectedXpSelector = createSelector(
  xpSelector,
  xp => {
    const startEntry = xp[0]
    const endEntry = xp[xp.length - 1]

    return calcRankAndExp(startEntry, endEntry)
  }
)
