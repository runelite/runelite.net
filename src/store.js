import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from './middleware/thunk-middleware'
import rootReducer from './modules'

/**
 * Configure react store
 */
export default () => {
  // Check if we are in debug mode
  const isDebug = process.env.NODE_ENV === 'development'

  // Create middlewares
  const middlewares = [thunkMiddleware]

  // Add logger
  if (isDebug) {
    middlewares.push(require('redux-logger').default)
  }

  // Create reducer
  const reducer = combineReducers(rootReducer)

  // Enable persisted reducer
  const persistedReducer = persistReducer(
    {
      key: 'session',
      storage,
      debug: isDebug,
      whitelist: ['session']
    },
    reducer
  )

  // Create our store from rootReducer and initial state
  const store = createStore(persistedReducer, applyMiddleware(...middlewares))

  // Persist store
  const persistor = persistStore(store)

  return {
    store,
    persistor
  }
}
