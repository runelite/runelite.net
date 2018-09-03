/** @jsx h */
import 'babel-polyfill'
import { h, render } from 'preact'
import { Provider } from 'preact-redux'
import { config, dom, library } from '@fortawesome/fontawesome-svg-core'
import {
  faApple,
  faWindows,
  faGithub,
  faDiscord,
  faPatreon
} from '@fortawesome/free-brands-svg-icons'
import {
  faCoffee,
  faHeart,
  faNewspaper,
  faFileAlt,
  faCogs,
  faFont,
  faStar
} from '@fortawesome/free-solid-svg-icons'
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

// Configure FontAwesome
config.autoReplaceSvg = 'nest'
config.observeMutations = true
library.add(faApple, faWindows, faGithub, faDiscord, faPatreon)
library.add(faCoffee, faHeart, faNewspaper, faFileAlt, faCogs, faFont, faStar)
dom.watch()

// Show website contents
const root = document.getElementById('root')
render(<Main />, root, root.firstElementChild)
