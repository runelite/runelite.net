import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from './middleware/thunk-middleware'
import rootReducer from './modules'

/**
 * Configure react store
 */
export default callback => {
  // Check if we are in debug mode
  const isDebug = process.env.NODE_ENV === 'development'

  // Create middlewares
  const middlewares = [thunkMiddleware]

  // Add logger
  if (isDebug) {
    const { createLogger } = require('redux-logger')
    middlewares.push(
      createLogger({
        diff: true
      })
    )
  }

  // Create reducer
  const reducer = combineReducers(rootReducer)

  // Enable persisted reducer
  const persistedReducer = persistReducer(
    {
      key: 'runelite',
      storage,
      debug: isDebug,
      whitelist: ['account', 'git'],
      // Transform dates back into JS Dates on rehydrate
      // (see: https://github.com/rt2zz/redux-persist/issues/82)
      transforms: [
        createTransform(JSON.stringify, toRehydrate =>
          JSON.parse(toRehydrate, (key, value) =>
            typeof value === 'string' &&
            value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
              ? new Date(value)
              : value
          )
        )
      ]
    },
    reducer
  )

  // Create our store from rootReducer and initial state
  const store = createStore(persistedReducer, applyMiddleware(...middlewares))

  // Persist store
  const persistor = persistStore(store, null, () => callback(store))

  return {
    store,
    persistor
  }
}
