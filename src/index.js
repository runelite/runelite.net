/** @jsx h */
import { h, render } from 'preact'
import App from './components/app'
import configureRouter from './router'
import configureStore from './store'
import Provider from './components/provider'
import routes from './routes'

// Create redux store
const store = configureStore()

// Create router
const router = configureRouter(routes)(store)

// Create application
const Main = () => (
  <Provider store={store} router={router}>
    <App />
  </Provider>
)

// Show website contents
const root = document.getElementById('root')
router.start(() => render(<Main />, root, root.firstElementChild))
