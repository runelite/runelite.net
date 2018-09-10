import { createActions, handleActions } from 'redux-actions'

export const {
  startLoading,
  stopLoading,
  makeNavbarDark,
  makeNavbarDefault
} = createActions(
  'START_LOADING',
  'STOP_LOADING',
  'MAKE_NAVBAR_DARK',
  'MAKE_NAVBAR_DEFAULT'
)

export default handleActions(
  {
    [startLoading]: state => ({
      ...state,
      loading: state.loading + 1
    }),
    [stopLoading]: state => ({
      ...state,
      loading: state.loading - 1
    }),
    [makeNavbarDark]: state => ({
      ...state,
      navbarDark: true
    }),
    [makeNavbarDefault]: state => ({
      ...state,
      navbarDark: false
    })
  },
  {
    loading: 0,
    navbarDark: false
  }
)
