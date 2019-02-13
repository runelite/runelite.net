import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { Link } from 'preact-router'
import { bindActionCreators } from 'redux'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { isLoggedIn, logout } from '../modules/account'
import Redirect from '../components/redirect'
import { find, propEq } from 'ramda'
import LootTracker from '../components/account/LootTracker'
import { fetchLoot } from '../modules/loot'
import { fetchReleases } from '../modules/git'
import Home from '../components/account/Home'
import {
  changeAccount,
  fetchConfig,
  getAccounts,
  getKillCounts,
  getSlayerTask
} from '../modules/config'
import { fetchGe } from '../modules/ge'
import GrandExchange from '../components/account/GrandExchange'

const menu = [
  {
    tag: 'home',
    label: 'Home',
    icon: 'fa-fw fas fa-home',
    component: Home,
    data: props => ({
      task: props.slayerTask,
      kc: props.killCounts
    })
  },
  {
    tag: 'grand-exchange',
    label: 'Grand Exchange',
    icon: 'fa-fw fas fa-balance-scale',
    component: GrandExchange,
    data: props => props.ge
  },
  {
    tag: 'loot-tracker',
    label: 'Loot Tracker',
    icon: 'fa-fw fas fa-file-invoice-dollar',
    component: LootTracker,
    data: props => props.loot
  },
  {
    tag: 'farming-tracker',
    label: 'Farming Tracker',
    icon: 'fa-fw fas fa-tree',
    component: () => <noscript />,
    data: () => ({})
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
const menuExport = (currentMenu, props) => {
  const current = find(propEq('tag', currentMenu), menu)
  const currentSelector = current.data
  const dataJson = currentSelector(props)
  const data =
    'data:application/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(dataJson))
  return (
    <a
      class="list-group-item list-group-item-primary"
      download={current.tag + '.json'}
      href={data}
    >
      <i class="fas fa-fw fa-download" /> Export {current.label}
    </a>
  )
}

const accountMenu = (account, selectedAccount, changeAccount) => (
  <button
    class={
      'list-group-item list-group-item-action' +
      (selectedAccount === account ? ' active' : '')
    }
    onClick={() => changeAccount(account)}
  >
    <i class="fas fa-fw fa-user" /> {account}
  </button>
)

class Account extends Component {
  render({ menu, accounts, changeAccount, loggedIn, logout, ...props }) {
    if (!loggedIn) {
      return <Redirect to="/" />
    }

    const MenuBody = menuBody(menu)

    return (
      <Layout>
        <Meta title={`Account - ${hero.title}`} />
        <div class="row">
          <div class="col-xl-3 col-md-4 col-sm-12 col-xs-12">
            <ul class="list-group list-group-small mb-4">
              {menuItems(menu)}
              {menuExport(menu, props)}
            </ul>
            <ul class="list-group list-group-small mb-4">
              {accounts.map(a =>
                accountMenu(a, props.selectedAccount, changeAccount)
              )}
              <button
                class="list-group-item list-group-item-action list-group-item-danger"
                onClick={logout}
              >
                <i class="fas fa-fw fa-power-off" /> Logout
              </button>
            </ul>
          </div>
          <div class="col-xl-9 col-md-8 col-sm-12 col-xs-12">
            <MenuBody {...props} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default connect(
  state => ({
    loggedIn: isLoggedIn(state),
    ...state.session,
    ...state.config,
    loot: state.loot,
    ge: state.ge,
    accounts: getAccounts(state),
    slayerTask: getSlayerTask(state),
    killCounts: getKillCounts(state)
  }),
  dispatch =>
    bindActionCreators(
      { logout, fetchReleases, fetchConfig, changeAccount, fetchLoot, fetchGe },
      dispatch
    )
)(Account)
