import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import App from './components/app'
import configureStore from './redux/store'

// Create redux store
const store = configureStore(createHistory())

// Show website contents
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
