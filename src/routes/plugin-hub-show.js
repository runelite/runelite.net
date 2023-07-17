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
import '../components/feature.scss'

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
        <div class="content-section dark-card pb-0">
          <div class="card">
            <div class="card-header card-body d-flex align-self-stretch">
              <div class="mr-4 d-flex align-items-center">
                <img
                  width="36"
                  alt=""
                  src={
                    externalPlugin.imageUrl
                      ? externalPlugin.imageUrl
                      : '/img/plugin-hub/missingicon.png'
                  }
                />
              </div>
              <div>
                <h5 class="card-title">{externalPlugin.displayName}</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                  <a href={`/plugin-hub/${externalPlugin.author}`}>
                    {externalPlugin.author}
                  </a>
                </h6>
                {externalPlugin.count > 0 && (
                  <p class="card-text">
                    <span class="badge badge-primary">
                      {numberWithCommas(externalPlugin.count)}{' '}
                      {externalPlugin.count > 1
                        ? 'active installs'
                        : 'active install'}
                    </span>{' '}
                    {externalPlugin.installed && (
                      <span class="badge badge-success">installed</span>
                    )}
                  </p>
                )}
              </div>
              <div className="ml-4 text-muted">
                {externalPlugin.description}
              </div>
              <div className="ml-auto">
                <a
                  href={`https://github.com/${externalPlugin.github.user}/${externalPlugin.github.repo}/issues`}
                >
                  <i class="fab fa-github" />
                  <span> Report an issue</span>
                </a>
              </div>
            </div>
            {externalPlugin.github && (
              <div class="card-body markdown-body">
                <InnerHTMLHelper
                  tagName="div"
                  html={externalPlugin.github.readme}
                />
              </div>
            )}
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
