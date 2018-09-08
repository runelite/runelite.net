import { createActions, handleActions } from 'redux-actions'

export const { startLoading, stopLoading } = createActions(
  'START_LOADING',
  'STOP_LOADING'
)

export default handleActions(
  {
    [startLoading]: state => ({
      ...state,
      loading: true
    }),
    [stopLoading]: state => ({
      ...state,
      loading: false
    })
  },
  {
    loading: false
  }
)
