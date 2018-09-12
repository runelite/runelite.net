import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
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
    middlewares.push(require('redux-logger').default)
  }

  // Create reducer
  const reducer = combineReducers(rootReducer)

  // Enable persisted reducer
  const persistedReducer = persistReducer(
    {
      key: 'root',
      storage,
      debug: process.env.NODE_ENV === 'development'
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
