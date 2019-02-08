import dayjs from 'dayjs'
import { uniq, concat, forEachObjIndexed } from 'ramda'
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

      const response = await runeliteApi(`session/count`, {
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
      const names = await runeliteStaticApi('cache/item/names.json', {
        method: 'GET'
      })

      const result = await Promise.all(
        items.map(item =>
          dispatch(
            setItemInfo({
              id: item,
              name: names[item],
              examine: ''
            })
          )
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
    const collector = {}
    forEachObjIndexed(calculateRanksAndExp(collector), startEntry)
    forEachObjIndexed(calculateRanksAndExp(collector), endEntry)
    return collector
  }
)
