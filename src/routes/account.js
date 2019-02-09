import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { Link } from 'preact-router'
import { bindActionCreators } from 'redux'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { isLoggedIn, logout } from '../modules/session'
import Redirect from '../components/redirect'
import { find, propEq } from 'ramda'

const Home = ({ logout }) => (
  <button class="btn btn-danger" onClick={logout}>
    Logout
  </button>
)

const menu = [
  {
    tag: 'home',
    label: 'Home',
    icon: 'fa-fw fas fa-home',
    component: Home
  },
  {
    tag: 'grand-exchange',
    label: 'Grand Exchange',
    icon: 'fa-fw fas fa-balance-scale',
    component: () => <noscript />
  },
  {
    tag: 'loot-tracker',
    label: 'Loot Tracker',
    icon: 'fa-fw fas fa-file-invoice-dollar',
    component: () => <noscript />
  },
  {
    tag: 'farming-tracker',
    label: 'Farming Tracker',
    icon: 'fa-fw fas fa-tree',
    component: () => <noscript />
  }
]

const menuItems = currentMenu =>
  menu.map(m => (
    <Link
      class={
        'list-group-item list-group-item-action' +
        (currentMenu === m.tag ? ' active' : '')
      }
      key={m.tag}
      href={`/account/${m.tag}`}
    >
      <i class={m.icon} /> {m.label}
    </Link>
  ))

const menuBody = currentMenu => find(propEq('tag', currentMenu), menu).component

class Account extends Component {
  render({ menu, username, loggedIn, logout }) {
    if (!loggedIn) {
      return <Redirect to="/" />
    }

    const MenuBody = menuBody(menu)

    return (
      <Layout>
        <Meta title={`Account - ${hero.title}`} />
        <div class="row">
          <div class="col-xl-3 col-md-4 col-sm-12 col-xs-12">
            <ul class="list-group list-group-small">{menuItems(menu)}</ul>
          </div>
          <div class="col-xl-9 col-md-8 col-sm-12 col-xs-12">
            <MenuBody logout={logout} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default connect(
  state => ({
    loggedIn: isLoggedIn(state),
    ...state.session
  }),
  dispatch => bindActionCreators({ logout }, dispatch)
)(Account)
