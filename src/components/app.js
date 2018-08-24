import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import React from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import universal from 'react-universal-component'
import Navigation from './navigation'
import Footer from './footer'

const App = ({ component, payload }) => {
  const UniversalComponent = universal(() => import(`../containers/${component}`))

  return (
    <div style={{ height: '100%' }}>
      <LoadingBar style={{zIndex: 9999}} />
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
