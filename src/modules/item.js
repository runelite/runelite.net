import { createActions, handleActions } from 'redux-actions'
import api from '../api'

const runeliteStaticApi = api('https://static.runelite.net/')

// Actions
export const { fetchItems, setItems } = createActions(
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
    }
  },
  'SET_ITEMS'
)

// Reducer
export default handleActions(
  {
    [setItems]: (state, { payload }) => payload
  },
  []
)

// Selectors
export const getItems = state => state.item
