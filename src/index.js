/** @jsx h */
import { h, render } from 'preact'
import { Provider } from 'preact-redux'
import App from './components/app'
import configureStore from './store'

// Create redux store
const store = configureStore()

// Create application
const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

// Show website contents
const root = document.getElementById('root')
render(<Main />, root, root.firstElementChild)
