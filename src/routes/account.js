import { h } from 'preact'
import { connect } from 'react-redux'
import { Link } from 'preact-router'
import { bindActionCreators } from 'redux'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { isLoggedIn, logout } from '../modules/account'
import Redirect from '../components/redirect'
import { find, propEq } from 'ramda'
import {
  changeAccount,
  getAccounts,
  getBossLog,
  getSelectedAccount,
  getSlayerTask,
  getTags
} from '../modules/config'
import { getGe } from '../modules/ge'
import { getLoot } from '../modules/loot'
import Home from './account/home'
import GrandExchange from './account/grand-exchange'
import LootTracker from './account/loot-tracker'
import NotFound from '../components/not-found'
import './account.scss'
import Tags from './account/tags'
import TimeTracking from './account/time-tracking'
import { getTimeTracking } from '../modules/time-tracking'

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
    data: ({ rawLoot }) =>
      rawLoot.map(entry => ({
        eventId: entry.eventId,
        type: entry.type,
        drops: entry.drops.map(drop => ({
          id: drop.id,
          qty: drop.qty
        }))
      }))
  },
  {
    tag: 'tags',
    label: 'Tags',
    icon: 'fa-fw fas fa-code',
    component: Tags,
    data: ({ rawTags }) => rawTags
  },
  {
    tag: 'time-tracking',
    label: 'Time Tracking',
    icon: 'fa-fw fas fa-clock',
    component: TimeTracking,
    showAccounts: true,
    data: ({ rawTimeTracking }) => rawTimeTracking
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

  const currentMenu = find(propEq('tag', tag), menu)

  if (!currentMenu) {
    return <NotFound />
  }

  const MenuBody = menuBody(currentMenu)
  const accountsTitle =
    accounts.length > 1 && currentMenu.showAccounts ? 'Accounts' : 'Account'

  return (
    <Layout>
      <Meta title={`${currentMenu.label} - Account - ${hero.title}`} />
      <section id="account">
        <div class="content-section account-container">
          <div class="row">
            <div class="col-xl-3 col-md-4 col-sm-12 col-xs-12">
              <ul class="list-group list-group-small mb-4">
                {menuItems(currentMenu)}
                {menuExport(currentMenu, props)}
              </ul>

              <p className="list-title">{accountsTitle}</p>
              <ul class="list-group list-group-small mb-4">
                {currentMenu.showAccounts ? (
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
  rawTimeTracking: getTimeTracking(state)
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
