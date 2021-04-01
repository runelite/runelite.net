import { createActions, handleActions } from 'redux-actions'

export const { setActiveTile } = createActions('SET_ACTIVE_TILE')

export default handleActions(
  {
    [setActiveTile]: (state, { payload }) => ({
      ...state,
      activeTile: payload
    })
  },
  {
    activeTile: ''
  }
)
