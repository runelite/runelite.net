import '@fortawesome/fontawesome-free/css/all.min.css'
import { h } from 'preact'
import { connect } from 'preact-redux'
import Router from 'preact-router'

import './app.scss'
import './hero.css'
import './layout.css'
import { stargazersSelector } from '../modules/git'
import Async from './async'
import links from '../_data/links'
import Loader from './loader'
import Navigation from './navigation'
import Redirect from './redirect'

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
      <Async path="/tag" getComponent={() => import('../routes/tag')} />
      <Async
        path="/tag/show/:csv"
        getComponent={() => import('../routes/tag-show')}
      />
      <Async default getComponent={() => import('../routes/not-found')} />
    </Router>
  </div>
)

const mapStateToProps = state => ({
  stars: stargazersSelector(state),
  ...state.app
})

export default connect(mapStateToProps)(App)
