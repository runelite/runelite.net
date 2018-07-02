import './polyfills/object.values'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import App from './components/app'
import configureStore from './redux/store'
import * as serviceWorker from './service-worker'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Create redux store
const store = configureStore(history)

// Show website contents
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// Unregister service worker for people who registered it before
serviceWorker.unregister()
