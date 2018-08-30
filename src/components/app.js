import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './app.css'
import React from 'react'
import { connect } from 'react-redux'
import universal from 'react-universal-component'
import Navigation from './navigation'
import Footer from './footer'

const App = ({ component, payload, loading }) => {
  const UniversalComponent = universal(() => import(`../containers/${component}`))

  return (
    <div style={{ height: '100%' }}>
      <div className='animated loader fixed-top' style={{ display: loading ? 'block' : 'none' }} />
      <Navigation />
      <UniversalComponent {...payload}>
        <Footer />
      </UniversalComponent>
    </div>
  )
}

export default connect(
  (state, props) => ({
    ...props,
    ...state.app
  })
)(App)
