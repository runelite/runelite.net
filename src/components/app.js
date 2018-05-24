import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'
import React from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import Navigation from './navigation'
import Footer from './footer'

const App = ({ component, payload }) => {
  const Component = require(`../containers/${component}`).default

  return (
    <div style={{ height: '100%' }}>
      <LoadingBar style={{zIndex: 9999}} />
      <Navigation />
      <Component {...payload}>
        <Footer />
      </Component>
    </div>
  )
}

export default connect(
  (state, props) => ({
    ...props,
    ...state.app
  })
)(App)
