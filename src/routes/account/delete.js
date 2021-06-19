import { h } from 'preact'
import {
  changeAccount,
  fetchConfig,
  getProfileConfig,
  getSelectedAccount,
  updateConfig
} from '../../modules/config'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import prepare from '../../components/prepare'
import { fetchBootstrap } from '../../modules/bootstrap'
import { route } from 'preact-router'
import { upperToTitleCase } from '../../util'

const deleteAccount = async (profileConfig, updateConfig, changeAccount) => {
  const newConfig = {
    ...profileConfig
  }

  Object.keys(newConfig).forEach(k => (newConfig[k] = null))
  changeAccount(null)
  await updateConfig(newConfig)
  route('/account/home')
}

const changeList = profileConfig =>
  Object.keys(profileConfig)
    .map(k => k.split('.')[0])
    .filter((v, i, a) => a.indexOf(v) === i)
    .filter(k => k !== 'rsprofile')
    .map(k => (
      <li>
        <small>{k}</small>
      </li>
    ))

const accountType = type => {
  if (type !== 'STANDARD') {
    return ' for ' + upperToTitleCase(type)
  }

  return ''
}

const Delete = ({
  selectedAccount,
  profileConfig,
  updateConfig,
  changeAccount
}) => {
  if (!selectedAccount) {
    return (
      <div class="card">
        <div class="card-body">No RuneScape profile selected</div>
      </div>
    )
  }

  return (
    <div class="card">
      <div class="card-header">
        Do you really want to delete RuneScape profile{' '}
        <b>{selectedAccount.displayName}</b>
        {accountType(selectedAccount.type)}?
        <br />
        <span class="text-muted">
          You can select different profile from the list on left.
        </span>
      </div>
      <div class="card-body">
        <p>
          This will delete the RuneScape profile{' '}
          <b>{selectedAccount.displayName}</b>
          {accountType(selectedAccount.type)} which also includes data for:
        </p>
        <ul>{changeList(profileConfig)}</ul>
      </div>
      <div class="card-footer">
        <p class="text-center">
          <b>Warning:</b> This action is irreversible!
        </p>
        <button
          class="btn btn-block btn-danger"
          onClick={() =>
            deleteAccount(profileConfig, updateConfig, changeAccount)
          }
        >
          Delete RuneScape profile <b>{selectedAccount.displayName}</b>
          {accountType(selectedAccount.type)}
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  ...props,
  selectedAccount: getSelectedAccount(state),
  profileConfig: getProfileConfig(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateConfig,
      fetchBootstrap,
      fetchConfig,
      changeAccount
    },
    dispatch
  )

const prepareComponentData = async ({ fetchBootstrap, fetchConfig }) => {
  await fetchBootstrap()
  await fetchConfig()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(Delete))
