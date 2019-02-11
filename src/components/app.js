import '@fortawesome/fontawesome-free/css/all.min.css'
import { h } from 'preact'
import { connect } from 'preact-redux'
import Router from 'preact-router'
import { bindActionCreators } from 'redux'
import './app.scss'
import './hero.css'
import './layout.css'
import Navigation from './navigation'
import links from '../_data/links'
import Redirect from './redirect'
import Loader from './loader'
import Async from './async'
import { getStargazers } from '../modules/git'
import NotFound from './not-found'
import { isLoggedIn, login } from '../modules/account'

const App = ({
  loading,
  stars,
  navbarDark,
  login,
  logout,
  loggedIn,
  username
}) => (
  <div style={{ height: '100%' }}>
    <Loader loading={loading > 0} />
    <Navigation
      dark={navbarDark}
      stars={stars}
      login={login}
      logout={logout}
      loggedIn={loggedIn}
      username={username}
    />
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
      <Async
        path="/gh-auth-code"
        getComponent={() => import('../routes/gh-auth-code')}
      />
      <Async path="/loading" getComponent={() => import('../routes/loading')} />
      <Async path="/tag" getComponent={() => import('../routes/tag')} />
      <Async
        path="/tag/show/:csv"
        getComponent={() => import('../routes/tag-show')}
      />
      <Async
        path="/account/:menu"
        getComponent={() => import('../routes/account')}
      />
      <NotFound default />
    </Router>
  </div>
)

export default connect(
  state => ({
    stars: getStargazers(state),
    loggedIn: isLoggedIn(state),
    ...state.app,
    ...state.account
  }),
  dispatch => bindActionCreators({ login }, dispatch)
)(App)
