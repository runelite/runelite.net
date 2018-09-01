/** @jsx h */
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { h } from 'preact'
import { connect } from 'preact-redux'
import { createRouteNodeSelector } from 'redux-router5'
import './app.css'
import Navigation from './navigation'

const App = ({ route, loading }) => {
  const Route = require(`../routes/${route.name}`).default

  return (
    <div style={{ height: '100%' }}>
      <div
        class='animated loader fixed-top'
        style={{ display: loading ? 'block' : 'none' }}
      />
      <Navigation />
      <Route {...route.params} />
    </div>
  )
}

export default connect(state => ({
  ...state.app,
  ...createRouteNodeSelector('')(state)
}))(App)
