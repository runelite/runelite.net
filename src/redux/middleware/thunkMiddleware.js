function createThunkMiddleware () {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    if (action && typeof action.payload === 'function') {
      return action.payload(dispatch, getState)
    }

    return next(action)
  }
}

export default createThunkMiddleware()
