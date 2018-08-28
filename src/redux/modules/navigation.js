import {createAction, handleActions} from 'redux-actions'

export default handleActions({
  TOGGLE_NAV: (state) => ({
    ...state,
    open: !state.open
  }),
  CHANGE_STYLE: (state, { payload }) => ({
    ...state,
    dark: payload
  })
}, {
  open: false,
  dark: false
})

export const toggleNav = createAction('TOGGLE_NAV')
export const changeStyle = createAction('CHANGE_STYLE', (dark) => dark)
