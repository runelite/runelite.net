import { h, render } from 'preact'
import { Provider } from 'preact-redux'
import App from './components/app'
import configureStore from './store'
import { sessionCheck } from './modules/session'
import { getReleases } from './modules/git'

// Create redux store
const { store } = configureStore()

// Check session and get API version
store.dispatch(getReleases()).then(() => store.dispatch(sessionCheck()))

// Create application
const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

// Show website contents
const root = document.getElementById('root')
render(<Main />, root, root.firstElementChild)
