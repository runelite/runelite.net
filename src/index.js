import React from 'react'
import { render } from 'react-snapshot'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import App from './components/app'
import configureStore from './redux/store'
import * as serviceWorker from './service-worker'

window.escape = (string) => string
window.unescape = (string) => string

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Create redux store
const store = configureStore(history)

// Render website
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// Unregister service worker for people who registered it before
serviceWorker.unregister()
