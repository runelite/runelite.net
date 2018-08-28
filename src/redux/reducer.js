import appReducer from './modules/app'
import gitReducer from './modules/git'
import navigationReducer from './modules/navigation'
import runeliteReducer from './modules/runelite'

// Combine all redux reducers into one root reducer
export default {
  app: appReducer,
  git: gitReducer,
  navigation: navigationReducer,
  runelite: runeliteReducer
}
