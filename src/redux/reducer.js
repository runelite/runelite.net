import appReducer from './modules/app'
import gitReducer from './modules/git'

// Combine all redux reducers into one root reducer
export default {
  app: appReducer,
  git: gitReducer
}
