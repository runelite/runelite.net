import appReducer from './app'
import gitReducer from './git'
import runeliteReducer from './runelite'
import tagReducer from './tag'

// Combine all redux reducers into one root reducer
export default {
  app: appReducer,
  git: gitReducer,
  runelite: runeliteReducer,
  tag: tagReducer
}
