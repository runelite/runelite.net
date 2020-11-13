import { h } from 'preact'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import prepare from '../components/prepare'
import Layout from '../components/layout'
import ExternalPlugin from '../components/external-plugin'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { fetchBootstrap } from '../modules/bootstrap'
import {
  fetchExternalPlugins,
  fetchPluginHubStats,
  getPluginFilter,
  getPluginSorting,
  getSortedExternalPlugins,
  setPluginFilter,
  setPluginSorting
} from '../modules/plugin-hub'
import SearchBar from '../components/search-bar'
import {
  fetchConfig,
  getExternalPlugins,
  getModifiedKeys,
  updateConfig
} from '../modules/config'
import Choice from '../components/choice'
import { numberWithCommas } from '../util'
import { isLoggedIn } from '../modules/account'

const description =
  'The Plugin Hub is a repository of plugins that are created and ' +
  'maintained by members of the community who are not officially ' +
  'affiliated with RuneLite. These plugins are verified by RuneLite ' +
  "Developers to ensure they comply with Jagex's 3rd party client rules " +
  'and are not malicious in some other way.'

const handleChange = (event, setPluginFilter) =>
  setPluginFilter({
    name: event.target.value
  })

const handleUpdate = (updateConfig, fetchConfig, externalPlugins) => async (
  installed,
  pluginName
) => {
  if (installed) {
    externalPlugins = externalPlugins.filter(i => i !== pluginName)
  } else {
    externalPlugins.push(pluginName)
  }

  await updateConfig('runelite.externalPlugins', externalPlugins.join(','))
  await fetchConfig()
}

const PluginHub = ({
  author,
  externalPlugins,
  configExternalPlugins,
  pluginFilter,
  pluginSorting,
  setPluginFilter,
  setPluginSorting,
  updateConfig,
  fetchConfig,
  modifiedKeys,
  loggedIn
}) => {
  externalPlugins = [...externalPlugins].filter(plugin =>
    author ? plugin.author === author : true
  )

  const pluginCount = externalPlugins.length
  const installedPluginCount = externalPlugins.filter(p => p.installed).length
  const totalCount = externalPlugins.reduce((a, b) => a + b.count, 0)
  const updateFunction = handleUpdate(
    updateConfig,
    fetchConfig,
    configExternalPlugins
  )
  const sortChoices = ['active installs', 'name', 'time updated', 'time added']

  if (installedPluginCount > 0) {
    sortChoices.push('installed')
  }

  return (
    <Layout>
      <Meta
        title={`${author ? author + ' ' : ''}Plugin Hub - ${hero.title}`}
        description={description}
      />

      <section id="externalPlugins">
        <div class="content-section">
          <h1 class="page-header">{author ? author + ' ' : ''}Plugin Hub</h1>
          <div class="row">
            <div class="col-sm-8">
              <p>{description}</p>
              <p>
                For more information about the Plugin Hub and how to install
                these plugins, read the{' '}
                <a href="https://github.com/runelite/runelite/wiki/Information-about-the-Plugin-Hub">
                  guide on our wiki
                </a>
                .
              </p>
            </div>
            <div class="col-sm-4">
              {totalCount > 0 && (
                <div class="btn btn-block btn-dark disabled">
                  <b>{numberWithCommas(totalCount)}</b>{' '}
                  {totalCount > 1 ? 'active installs' : 'active install'}
                </div>
              )}
              {pluginCount > 0 && (
                <div class="btn btn-block btn-dark disabled">
                  <b>{numberWithCommas(pluginCount)}</b>{' '}
                  {pluginCount > 1 ? 'plugins' : 'plugin'}
                </div>
              )}
              {installedPluginCount > 0 && (
                <div class="btn btn-block btn-dark disabled">
                  <b>{numberWithCommas(installedPluginCount)}</b>{' '}
                  {installedPluginCount > 1
                    ? 'installed plugins'
                    : 'installed plugin'}
                </div>
              )}
            </div>
          </div>
          <div class="row">
            <div class="col-sm-8">
              <SearchBar
                value={pluginFilter.name}
                onInput={e => handleChange(e, setPluginFilter)}
              />
            </div>
            <div class="col-sm-4">
              <Choice
                prefix="Sort by"
                value={pluginSorting}
                choices={sortChoices}
                onClick={setPluginSorting}
              />
            </div>
          </div>
          {modifiedKeys.includes('runelite.externalPlugins') && (
            <div
              style={{
                background: '#1e1e1e'
              }}
              class="p-3"
            >
              <span class="badge badge-warning">
                <b>Warning</b>
              </span>{' '}
              Installing and uninstalling plugins through this interface
              requires client restart.
            </div>
          )}
          <div class="row">
            {externalPlugins.map(plugin => (
              <ExternalPlugin
                key={plugin.internalName}
                {...plugin}
                update={updateFunction}
                showInstall={loggedIn}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

const mapStateToProps = (state, props) => ({
  ...props,
  externalPlugins: getSortedExternalPlugins(state),
  configExternalPlugins: getExternalPlugins(state),
  pluginFilter: getPluginFilter(state),
  pluginSorting: getPluginSorting(state),
  modifiedKeys: getModifiedKeys(state),
  loggedIn: isLoggedIn(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBootstrap,
      fetchConfig,
      fetchExternalPlugins,
      fetchPluginHubStats,
      setPluginFilter,
      setPluginSorting,
      updateConfig
    },
    dispatch
  )

const prepareComponentData = async ({
  fetchBootstrap,
  fetchConfig,
  fetchExternalPlugins,
  fetchPluginHubStats
}) => {
  await fetchBootstrap()
  await fetchConfig()
  await fetchExternalPlugins()
  await fetchPluginHubStats()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(PluginHub))
