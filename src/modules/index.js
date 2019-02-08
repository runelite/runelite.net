import appReducer from './app'
import gitReducer from './git'
import itemReducer from './item'
import runeliteReducer from './runelite'
import sessionReducer from './session'
import tagReducer from './tag'
import xpReducer from './xp'

// Combine all redux reducers into one root reducer
export default {
  app: appReducer,
  git: gitReducer,
  item: itemReducer,
  runelite: runeliteReducer,
  session: sessionReducer,
  tag: tagReducer,
  xp: xpReducer
}
