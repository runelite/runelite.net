import accountReducer from './account'
import appReducer from './app'
import configReducer from './config'
import geReducer from './ge'
import gitReducer from './git'
import itemReducer from './item'
import lootReducer from './loot'
import sessionReducer from './session'
import tagReducer from './tag'
import xpReducer from './xp'

// Combine all redux reducers into one root reducer
export default {
  account: accountReducer,
  app: appReducer,
  config: configReducer,
  ge: geReducer,
  git: gitReducer,
  item: itemReducer,
  loot: lootReducer,
  session: sessionReducer,
  tag: tagReducer,
  xp: xpReducer
}
