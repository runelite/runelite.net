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
import {
  fetchLoot,
  getGroupedLoot,
  getLoot,
  setLootFilter
} from '../modules/loot'
import { fetchReleases } from '../modules/git'
import Home from '../components/account/Home'
import {
  changeAccount,
  fetchConfig,
  getAccounts,
  getBossLog,
  getSlayerTask
} from '../modules/config'
import { fetchGe, getGe, setGeFilter } from '../modules/ge'
import GrandExchange from '../components/account/GrandExchange'

const menu = [
  {
    tag: 'home',
    label: 'Home',
    icon: 'fa-fw fas fa-home',
    component: Home,
    data: props => ({
      task: props.slayerTask,
      bossLog: props.bossLog
    })
  },
  {
    tag: 'grand-exchange',
    label: 'Grand Exchange',
    icon: 'fa-fw fas fa-balance-scale',
    component: GrandExchange,
    data: props =>
      props.ge.map(ge => ({
        buy: ge.buy,
        itemId: ge.itemId,
        quantity: ge.quantity,
        price: ge.prixe,
        time: ge.time
      }))
  },
  {
    tag: 'loot-tracker',
    label: 'Loot Tracker',
    icon: 'fa-fw fas fa-file-invoice-dollar',
    component: LootTracker,
    data: props =>
      props.rawLoot.map(entry => ({
        eventId: entry.eventId,
        type: entry.type,
        drops: entry.drops.map(drop => ({
          id: drop.id,
          qty: drop.qty
        }))
      }))
  }
]

const menuItems = currentMenu =>
  menu.map(m => (
    <Link
      class={
        'list-group-item list-group-item-action' +
        (currentMenu.tag === m.tag ? ' active' : '')
      }
      key={m.tag}
      href={`/account/${m.tag}`}
    >
      <i class={m.icon} /> {m.label}
    </Link>
  ))

const menuBody = currentMenu => currentMenu.component
const menuExport = (currentMenu, props) => {
  const currentSelector = currentMenu.data
  const dataJson = currentSelector(props)
  const data =
    'data:application/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(dataJson))
  return (
    <a
      class="list-group-item list-group-item-primary"
      download={currentMenu.tag + '.json'}
      href={data}
    >
      <i class="fas fa-fw fa-download" /> Export {currentMenu.label}
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
  render({ tag, accounts, changeAccount, loggedIn, logout, ...props }) {
    if (!loggedIn) {
      return <Redirect to="/" />
    }

    const currentMenu = find(propEq('tag', tag), menu)
    const MenuBody = menuBody(currentMenu)

    return (
      <Layout>
        <Meta title={`${currentMenu.label} - Account - ${hero.title}`} />
        <div class="row">
          <div class="col-xl-3 col-md-4 col-sm-12 col-xs-12">
            <ul class="list-group list-group-small mb-4">
              {menuItems(currentMenu)}
              {menuExport(currentMenu, props)}
            </ul>
            <ul class="list-group list-group-small mb-4">
              {currentMenu.tag === 'home' ? (
                accounts.map(a =>
                  accountMenu(a, props.selectedAccount, changeAccount)
                )
              ) : (
                <noscript />
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
  (state, props) => ({
    ...props,
    loggedIn: isLoggedIn(state),
    ...state.session,
    ...state.config,
    rawLoot: getLoot(state),
    loot: getGroupedLoot(state),
    ge: getGe(state),
    geFilter: state.ge.filter,
    accounts: getAccounts(state),
    slayerTask: getSlayerTask(state),
    bossLog: getBossLog(state),
    lootFilter: state.loot.filter
  }),
  dispatch =>
    bindActionCreators(
      {
        logout,
        fetchReleases,
        fetchConfig,
        changeAccount,
        fetchLoot,
        fetchGe,
        setLootFilter,
        setGeFilter
      },
      dispatch
    )
)(Account)
