import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'
import thunkMiddleware from './middleware/thunk-middleware'
import rootReducer from './modules'

/**
 * Configure react store
 */
export default () => {
  // Create middlewares
  const middlewares = [thunkMiddleware]

  // Add logger
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  // Create our store from rootReducer and initial state
  return createStore(
    combineReducers(rootReducer),
    applyMiddleware(...middlewares)
  )
}
