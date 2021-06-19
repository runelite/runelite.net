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

const deleteAccount = async (profileConfig, updateConfig, changeAccount) => {
  const newConfig = {
    ...profileConfig
  }

  Object.keys(newConfig).forEach(k => (newConfig[k] = null))
  changeAccount(null)
  await updateConfig(newConfig)
  route('/account/home')
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
        <div class="card-body">No account selected</div>
      </div>
    )
  }

  return (
    <div class="card">
      <div class="card-header">
        Do you really want to delete{' '}
        <b>{selectedAccount.displayName} account?</b>
      </div>
      <div class="card-body">
        <p>This will delete following config entries:</p>

        <ul>
          {Object.keys(profileConfig).map(k => (
            <li>
              <small>{k}</small>
            </li>
          ))}
        </ul>
      </div>
      <div class="card-footer">
        <button
          class="btn btn-block btn-danger"
          onClick={() =>
            deleteAccount(profileConfig, updateConfig, changeAccount)
          }
        >
          Delete{' '}
          <b>{selectedAccount ? selectedAccount.displayName : 'unknown'}</b>
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
