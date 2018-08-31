import { createAction, handleActions } from 'redux-actions'

// Reducer
export default handleActions(
  {
    START_LOADING: state => ({
      ...state,
      loading: true
    }),
    STOP_LOADING: state => ({
      ...state,
      loading: false
    })
  },
  {
    loading: false
  }
)

export const startLoading = createAction('START_LOADING')
export const stopLoading = createAction('STOP_LOADING')
