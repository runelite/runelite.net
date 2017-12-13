import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import App from './components/app'
import configureStore from './redux/store'
import registerServiceWorker from './service-worker'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Create redux store
const store = configureStore(history)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
