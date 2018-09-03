/** @jsx h */
import 'bootstrap/dist/css/bootstrap.min.css'
import { h } from 'preact'
import { connect } from 'preact-redux'
import './app.css'
import Navigation from './navigation'
import Router from 'preact-router'
import Home from '../routes/home'
import Blog from '../routes/blog'
import BlogShow from '../routes/blog-show'
import Features from '../routes/features'
import XpShow from '../routes/xp-show'
import LoggedIn from '../routes/logged-in'
import NotFound from '../routes/not-found'
import links from '../_data/links'
import Redirect from './redirect'

const handleChange = e => {
  if (e.url === '/discord') {
  }
}

const App = ({ loading }) => (
  <div style={{ height: '100%' }}>
    <div
      class='fixed-top animated loader'
      style={{ display: loading ? 'block' : 'none' }}
    />
    <Navigation />
    <Router onChange={handleChange}>
      <Home path='/' />
      <Blog path='/blog' />
      <BlogShow path='/blog/show/:id' />
      <Features path='/features' />
      <XpShow path='/xp/show/:skill/:name/:start/:end' />
      <LoggedIn path='/logged-in' />
      <Redirect path='/discord' to={links.discord} />
      <NotFound default />
    </Router>
  </div>
)

export default connect(state => state.app)(App)
