import { uniq, concat } from 'ramda'
import { createActions, handleActions } from 'redux-actions'
import api from '../api'
import { getLatestRelease } from './bootstrap'

const runeliteApi = api('https://api.runelite.net/')
const runeliteStaticApi = api('https://static.runelite.net/')

// Actions
export const { fetchItemInfo, setItemInfo } = createActions(
  {
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
  'SET_ITEM_INFO'
)

// Reducer
export default handleActions(
  {
    [setItemInfo]: (state, { payload }) => uniq(concat(state, [payload]))
  },
  []
)
