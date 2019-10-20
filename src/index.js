import { h, render } from 'preact'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './components/app'
import configureStore from './store'
import { sessionCheck } from './modules/account'
import { fetchBootstrap } from './modules/bootstrap'

// Check session and get API version
const callback = async store => {
  await store.dispatch(fetchBootstrap())
  await store.dispatch(sessionCheck())
}

// Create redux store
const { store, persistor } = configureStore(callback)

// Create application
const Main = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

// Show website contents
const root = document.getElementById('root')
render(<Main />, root)
