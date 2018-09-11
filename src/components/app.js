import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { h } from 'preact'
import { connect } from 'preact-redux'
import Router from 'preact-router'
import './app.css'
import './hero.css'
import './layout.css'
import Navigation from './navigation'
import links from '../_data/links'
import Redirect from './redirect'
import Loader from './loader'
import Async from './async'
import { stargazersSelector } from '../modules/git'

const App = ({ loading, stars, navbarDark }) => (
  <div style={{ height: '100%' }}>
    <Loader loading={loading > 0} />
    <Navigation dark={navbarDark} stars={stars} />
    <Router>
      <Redirect path="/discord" to={links.discord} />
      <Async path="/" getComponent={() => import('../routes/home')} />
      <Async path="/blog" getComponent={() => import('../routes/blog')} />
      <Async
        path="/blog/show/:id"
        getComponent={() => import('../routes/blog-show')}
      />
      <Async
        path="/features"
        getComponent={() => import('../routes/features')}
      />
      <Async
        path="/xp/show/:skill/:name/:start/:end"
        getComponent={() => import('../routes/xp-show')}
      />
      <Async
        path="/logged-in"
        getComponent={() => import('../routes/logged-in')}
      />
      <Async default getComponent={() => import('../routes/not-found')} />
    </Router>
  </div>
)

export default connect(state => ({
  stars: stargazersSelector(state),
  ...state.app
}))(App)
