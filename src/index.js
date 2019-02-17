import { h, render } from 'preact'
import { Provider } from 'preact-redux'
import App from './components/app'
import configureStore from './store'
import { sessionCheck } from './modules/account'
import { fetchReleases } from './modules/git'

// Check session and get API version
const callback = async store => {
  await store.dispatch(fetchReleases())
  await store.dispatch(sessionCheck())
}

// Create redux store
const { store } = configureStore(callback)

// Create application
const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

// Show website contents
const root = document.getElementById('root')
render(<Main />, root, root.firstElementChild)
