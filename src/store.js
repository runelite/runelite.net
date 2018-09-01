import { applyMiddleware, combineReducers, createStore } from 'redux'
import { router5Reducer } from 'redux-router5'
import thunkMiddleware from './middleware/thunk-middleware'
import rootReducer from './modules'

/**
 * Configure react store
 */
export default () => {
  // Create middlewares
  const middlewares = [thunkMiddleware]

  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`)
    middlewares.push(logger)
  }

  // Create our store from rootReducer and initial state
  const store = createStore(
    combineReducers({ ...rootReducer, router: router5Reducer }),
    applyMiddleware(...middlewares)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules/index', () => {
      const nextRootReducer = require('./modules').default
      store.replaceReducer(
        combineReducers({ ...nextRootReducer, router: router5Reducer })
      )
    })
  }

  return store
}
