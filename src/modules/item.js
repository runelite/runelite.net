import { uniqBy, prop } from 'ramda'
import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { getLatestRelease } from './bootstrap'

const runeliteApi = api('https://api.runelite.net/')
const runeliteStaticApi = api('https://static.runelite.net/')

// Actions
export const {
  fetchItems,
  fetchItemInfo,
  setItems,
  setItemInfo
} = createActions(
  {
    FETCH_ITEMS: () => async dispatch => {
      const names = await runeliteStaticApi('cache/item/names.json', {
        method: 'GET'
      })

      const items = []

      for (let [id, name] of Object.entries(names)) {
        items.push({
          id: parseInt(id),
          name
        })
      }

      dispatch(setItems(items))
      return items
    },
    FETCH_ITEM_INFO: items => async (dispatch, getState) => {
      const version = getLatestRelease(getState())
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

      return result
    }
  },
  'SET_ITEMS',
  'SET_ITEM_INFO'
)

// Reducer
export default handleActions(
  {
    [setItems]: (state, { payload }) => payload,
    [setItemInfo]: (state, { payload }) =>
      uniqBy(prop('id'), state.concat(payload))
  },
  []
)

// Selectors
export const getItems = state => state.item
