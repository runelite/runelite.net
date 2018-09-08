import { createActions, handleActions } from 'redux-actions'

export const { changeStyle } = createActions('CHANGE_STYLE')

export default handleActions(
  {
    [changeStyle]: (state, { payload }) => ({
      ...state,
      dark: payload
    })
  },
  {
    dark: false
  }
)
