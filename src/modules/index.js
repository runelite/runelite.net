import appReducer from './app'
import gitReducer from './git'
import navigationReducer from './navigation'
import runeliteReducer from './runelite'

// Combine all redux reducers into one root reducer
export default {
  app: appReducer,
  git: gitReducer,
  navigation: navigationReducer,
  runelite: runeliteReducer
}
