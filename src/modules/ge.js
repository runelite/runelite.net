import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { getLatestRelease } from './bootstrap'
import { createSelector } from 'reselect'

const runeliteApi = api('https://api.runelite.net/')
const runeliteStaticApi = api('https://static.runelite.net/')

// Actions
export const {
  fetchGe,
  setGe,
  setGeRange,
  setGeFilter,
  setGePagination
} = createActions(
  {
    FETCH_GE: () => async (dispatch, getState) => {
      dispatch(setGeRange([]))
      const version = getLatestRelease(getState())
      const uuid = getState().account.uuid

      // Assign names to items
      const names = await runeliteStaticApi('cache/item/names.json', {
        method: 'GET'
      })

      const chunkSize = 500
      let offset = 0

      while (true) {
        const newEntries = await runeliteApi(
          `runelite-${version}/ge?limit=${chunkSize}&offset=${offset}`,
          {
            method: 'GET',
            headers: {
              'RUNELITE-AUTH': uuid
            }
          }
        )

        const result = newEntries.map(entry => {
          entry.name = names[entry.itemId]
          entry.date = new Date(0)
          entry.date.setUTCSeconds(Math.floor(entry.time / 1000))
          return entry
        })

        const length = result.length
        offset += length
        dispatch(setGe(result))

        if (length !== chunkSize) {
          break
        }
      }

      return offset
    }
  },
  'SET_GE',
  'SET_GE_RANGE',
  'SET_GE_FILTER',
  'SET_GE_PAGINATION'
)

// Reducer
export default handleActions(
  {
    [setGe]: (state, { payload }) => ({
      ...state,
      data: state.data.concat(payload)
    }),
    [setGeRange]: (state, { payload }) => ({
      ...state,
      data: payload
    }),
    [setGeFilter]: (state, { payload }) => ({
      ...state,
      filter: {
        ...state.filter,
        ...payload
      }
    }),
    [setGePagination]: (state, { payload }) => ({
      ...state,
      pagination: {
        ...state.pagination,
        ...payload
      }
    })
  },
  {
    filter: {
      name: ''
    },
    pagination: {
      page: 1,
      perPage: 100
    },
    data: []
  }
)

// Selectors
export const getGe = state => state.ge.data
export const getGeFilter = state => state.ge.filter
export const getGePagination = state => state.ge.pagination

export const getFilteredGe = createSelector(
  getGe,
  getGeFilter,
  (data, filter) =>
    data
      .filter(
        l =>
          !filter.name ||
          l.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1
      )
      .sort((a, b) => b.date - a.date)
)

export const getPaginatedGe = createSelector(
  getFilteredGe,
  getGePagination,
  (data, pagination) => {
    const offset = (pagination.page - 1) * pagination.perPage
    const limit = offset + pagination.perPage
    return data.slice(offset, limit)
  }
)

export const getPageCount = createSelector(
  getFilteredGe,
  getGePagination,
  (data, pagination) => Math.ceil(data.length / pagination.perPage)
)
