import { createActions, handleActions } from 'redux-actions'

export const { setActiveTag } = createActions('SET_ACTIVE_TAG')

export default handleActions(
  {
    [setActiveTag]: (state, { payload }) => ({
      ...state,
      activeTag: payload
    })
  },
  {
    activeTag: ''
  }
)
