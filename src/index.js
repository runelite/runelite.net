import './polyfills'
import { h, render } from 'preact'
import { Provider } from 'react-redux'
import App from './components/app'
import configureStore from './store'
import { sessionCheck } from './modules/account'
import { fetchBootstrap } from './modules/bootstrap'

// Properly handle scrolling
if (window && window.history) {
  const scrollHistory = {}

  let { pushState } = window.history
  window.history.pushState = (a, b, url) => {
    scrollHistory[window.location.pathname] =
      window.scrollY || window.pageYOffset
    pushState.call(window.history, a, b, url)
    if (!url.includes('#')) window.scrollTo(0, 0)
  }

  window.onpopstate = () => {
    if (window.location.hash) {
      return
    }

    const y = scrollHistory[window.location.pathname] || 0
    window.setTimeout(() => window.scrollTo(0, y), 1)
  }
}

// Check session and get API version
const callback = async store => {
  await store.dispatch(fetchBootstrap())
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
render(<Main />, root)
