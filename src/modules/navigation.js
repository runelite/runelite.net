import { createAction, handleActions } from 'redux-actions'

export default handleActions(
  {
    CHANGE_STYLE: (state, { payload }) => ({
      ...state,
      dark: payload
    })
  },
  {
    dark: false
  }
)

export const changeStyle = createAction('CHANGE_STYLE', dark => dark)
