/** @jsx h */
import 'babel-polyfill'
import { h, render } from 'preact'
import { config, dom, library } from '@fortawesome/fontawesome-svg-core'
import { faApple, faWindows, faGithub, faDiscord, faPatreon } from '@fortawesome/free-brands-svg-icons'
import { faCoffee, faHeart, faNewspaper, faFileAlt, faCogs, faFont, faStar } from '@fortawesome/free-solid-svg-icons'
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

// Configure FontAwesome
config.autoReplaceSvg = 'nest'
config.observeMutations = true
library.add(faApple, faWindows, faGithub, faDiscord, faPatreon)
library.add(faCoffee, faHeart, faNewspaper, faFileAlt, faCogs, faFont, faStar)
dom.watch()

// Show website contents
const root = document.getElementById('root')
router.start(() => render(<Main />, root, root.firstElementChild))
