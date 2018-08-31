/** @jsx h */
import 'bootstrap/dist/css/bootstrap.min.css'
import { h } from 'preact'
import { connect } from 'preact-redux'
import { constants } from 'router5'
import { createRouteNodeSelector } from 'redux-router5'
import './app.css'
import Navigation from './navigation'
import * as routes from '../routes/*.js'

const App = ({ route, loading }) => {
  const Route =
    route.name === constants.UNKNOWN_ROUTE
      ? routes['_not_found']
      : routes['_' + route.name.replace('-', '_')]

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
