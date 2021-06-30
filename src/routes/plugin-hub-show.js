import { h } from 'preact'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import prepare from '../components/prepare'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { fetchBootstrap } from '../modules/bootstrap'
import {
  fetchExternalPluginInfo,
  fetchExternalPlugins,
  fetchPluginHubStats,
  getExternalPluginsWithState
} from '../modules/plugin-hub'
import { fetchConfig } from '../modules/config'
import { numberWithCommas } from '../util'
import InnerHTMLHelper from '../components/inner-html-helper'
import NotFound from '../components/not-found'

const PluginHubShow = ({ externalPlugin }) => {
  if (!externalPlugin) {
    return <NotFound />
  }

  return (
    <Layout>
      <Meta
        title={`${externalPlugin.displayName} - Plugin Hub - ${hero.title}`}
        description={externalPlugin.description}
      />

      <section id="externalPlugins">
        <div class="content-section dark-card">
          <div class="card">
            <div class="card-header">
              <img
                width="36"
                alt=""
                src={
                  externalPlugin.imageUrl
                    ? externalPlugin.imageUrl
                    : '/img/plugin-hub/missingicon.png'
                }
              />{' '}
              {externalPlugin.support ? (
                <a
                  href={externalPlugin.support}
                  alt="Support link"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  {externalPlugin.displayName}
                </a>
              ) : (
                externalPlugin.displayName
              )}{' '}
              by{' '}
              <a href={`/plugin-hub/${externalPlugin.author}`}>
                {externalPlugin.author}
              </a>
              <div class="float-right">
                {externalPlugin.count > 0 && (
                  <span class="badge badge-primary">
                    {numberWithCommas(externalPlugin.count)}{' '}
                    {externalPlugin.count > 1
                      ? 'active installs'
                      : 'active install'}
                  </span>
                )}{' '}
                {externalPlugin.installed && (
                  <span class="badge badge-success">installed</span>
                )}
              </div>
            </div>
            <div class="card-footer text-muted">
              {externalPlugin.description}
            </div>
            <div class="card-body markdown-body">
              {externalPlugin.github && (
                <InnerHTMLHelper
                  tagName="div"
                  html={externalPlugin.github.readme}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

const mapStateToProps = (state, props) => ({
  ...props,
  externalPlugin: getExternalPluginsWithState(state).find(
    p => p.internalName === props.internalName
  )
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBootstrap,
      fetchConfig,
      fetchExternalPlugins,
      fetchExternalPluginInfo,
      fetchPluginHubStats
    },
    dispatch
  )

const prepareComponentData = async ({
  fetchBootstrap,
  fetchConfig,
  fetchExternalPlugins,
  fetchExternalPluginInfo,
  fetchPluginHubStats,
  internalName
}) => {
  await fetchBootstrap()
  await fetchConfig()
  await fetchExternalPlugins()
  await fetchPluginHubStats()
  await fetchExternalPluginInfo(internalName)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(PluginHubShow))
