import { h, Fragment } from 'preact'
import { connect } from 'react-redux'
import { Link } from 'preact-router'
import { bindActionCreators } from 'redux'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { isLoggedIn, logout } from '../modules/account'
import Redirect from '../components/redirect'
import {
  changeAccount,
  getAccounts,
  getBossLog,
  getLoot,
  getSelectedAccount,
  getSlayerTask,
  getTags,
  getTileMarkers,
  getGe
} from '../modules/config'
import Home from './account/home'
import LootTracker from './account/loot-tracker'
import NotFound from '../components/not-found'
import './account.scss'
import Tags from './account/tags'
import TimeTracking from './account/time-tracking'
import { getTimeTracking } from '../modules/time-tracking'
import { upperToTitleCase } from '../util'
import Delete from './account/delete'
import Tiles from './account/tiles'
import GrandExchange from './account/grand-exchange'

const menu = [
  {
    tag: 'home',
    label: 'Home',
    icon: 'fa-fw fas fa-home',
    component: Home,
    showAccounts: true,
    data: ({ slayerTask, bossLog }) => ({
      slayerTask,
      bossLog
    })
  },
  {
    tag: 'grand-exchange',
    label: 'Grand Exchange',
    icon: 'fa-fw fas fa-balance-scale',
    component: GrandExchange,
    showAccounts: true,
    data: ({ rawGe }) =>
      rawGe.map(ge => ({
        buy: ge.buy,
        itemId: ge.itemId,
        quantity: ge.quantity,
        price: ge.price,
        time: ge.time
      }))
  },
  {
    tag: 'loot-tracker',
    label: 'Loot Tracker',
    icon: 'fa-fw fas fa-file-invoice-dollar',
    component: LootTracker,
    showAccounts: true,
    data: ({ rawLoot }) => rawLoot
  },
  {
    tag: 'time-tracking',
    label: 'Time Tracking',
    icon: 'fa-fw fas fa-clock',
    component: TimeTracking,
    showAccounts: true,
    data: ({ rawTimeTracking }) => rawTimeTracking
  },
  {
    tag: 'tags',
    label: 'Tags',
    icon: 'fa-fw fas fa-code',
    component: Tags,
    data: ({ rawTags }) => rawTags
  },
  {
    tag: 'tile-markers',
    label: 'Tile markers',
    icon: 'fa-fw fas fa-tree',
    component: Tiles,
    data: ({ rawTiles }) => rawTiles
  },
  {
    tag: 'delete',
    label: 'Delete profile',
    icon: 'fa-fw fas fa-trash',
    class: 'list-group-item-danger',
    bottom: true,
    component: Delete,
    showAccounts: true
  }
]

const menuItem = (currentMenu, m) => (
  <Link
    class={
      'list-group-item list-group-item-action' +
      (m.class ? ' ' + m.class : '') +
      (currentMenu.tag === m.tag ? ' active' : '')
    }
    key={m.tag}
    href={`/account/${m.tag}`}
  >
    <i class={m.icon} /> {m.label}
  </Link>
)

const menuBody = currentMenu => currentMenu.component
const menuExport = (currentMenu, props) => {
  if (!currentMenu.data) {
    return null
  }

  const currentSelector = currentMenu.data
  const dataJson = currentSelector(props)
  const data = URL.createObjectURL(
    new Blob([JSON.stringify(dataJson)], {
      type: 'application/octet-stream'
    })
  )
  return (
    <a
      id="account-export"
      class="list-group-item list-group-item-primary"
      download={currentMenu.tag + '.json'}
      href={data}
    >
      <i class="fas fa-fw fa-download" /> Export {currentMenu.label}
    </a>
  )
}

const accountType = type => {
  if (type && type !== 'STANDARD') {
    return <span class="badge badge-info">{upperToTitleCase(type)}</span>
  }

  return ''
}

const accountMenu = (account, selectedAccount, changeAccount) => (
  <button
    class={
      'list-group-item list-group-item-action' +
      (selectedAccount && selectedAccount.accountId === account.accountId
        ? ' active'
        : '')
    }
    onClick={() => changeAccount(account)}
  >
    <i class="fas fa-fw fa-user" /> {account.displayName}{' '}
    {accountType(account.type)}
  </button>
)

const Account = ({
  tag,
  accounts,
  changeAccount,
  loggedIn,
  logout,
  ...props
}) => {
  if (!loggedIn) {
    return <Redirect to="/" />
  }

  const currentMenu = menu.find(m => m.tag === tag)
  const topMenu = menu.filter(m => !m.bottom)
  const bottomMenu = menu.filter(m => m.bottom)

  if (!currentMenu) {
    return <NotFound />
  }

  const MenuBody = menuBody(currentMenu)

  return (
    <Layout>
      <Meta title={`${currentMenu.label} - Account - ${hero.title}`} />
      <section id="account" class="dark-card">
        <div class="content-section account-container">
          <div class="row">
            <div class="col-xl-3 col-md-4 col-sm-12 col-xs-12">
              <ul class="list-group list-group-small mb-4">
                {topMenu.map(m => menuItem(currentMenu, m))}
              </ul>
              <ul class="list-group list-group-small mb-4">
                {menuExport(currentMenu, props)}
                <button
                  class="list-group-item list-group-item-action"
                  onClick={logout}
                >
                  <i class="fas fa-fw fa-power-off" /> Logout
                </button>
              </ul>
              {currentMenu.showAccounts && (
                <Fragment>
                  <p className="list-title">RuneScape Profile</p>
                  <ul class="list-group list-group-small mb-4">
                    {accounts
                      .filter(a => a.displayName !== null)
                      .map(a =>
                        accountMenu(a, props.selectedAccount, changeAccount)
                      )}
                    {bottomMenu.map(m => menuItem(currentMenu, m))}
                  </ul>
                </Fragment>
              )}
            </div>
            <div class="col-xl-9 col-md-8 col-sm-12 col-xs-12">
              <MenuBody {...props} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

const mapStateToProps = (state, props) => ({
  ...props,
  loggedIn: isLoggedIn(state),
  accounts: getAccounts(state),
  selectedAccount: getSelectedAccount(state),
  slayerTask: getSlayerTask(state),
  bossLog: getBossLog(state),
  rawGe: getGe(state),
  rawLoot: getLoot(state),
  rawTags: getTags(state),
  rawTimeTracking: getTimeTracking(state),
  rawTiles: getTileMarkers(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      changeAccount
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Account)
