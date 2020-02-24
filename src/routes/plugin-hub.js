import { h } from 'preact'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import prepare from '../components/prepare'
import Layout from '../components/layout'
import ExternalPlugin from '../components/external-plugin'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { fetchBootstrap } from '../modules/bootstrap'
import { fetchExternalPlugins, getExternalPlugins } from '../modules/plugin-hub'
import './plugin-hub.css'

const PluginHub = ({ externalPlugins }) => (
  <Layout>
    <Meta title={`Plugin Hub - ${hero.title}`} />

    <section id="externalPlugins">
      <div class="content-section">
        <h1>Plugin Hub</h1>
        <p>
          The Plugin Hub is a repository of plugins that are created and
          maintained by members of the community who are not officially
          affiliated with RuneLite. These plugins are verified by RuneLite
          Developers to ensure they comply with Jagex's 3rd party client rules
          and are not malicious in some other way.
        </p>
        <p>
          For more information about the Plugin Hub and how to install these
          plugins read the{' '}
          <a
            href="https://github.com/runelite/runelite/wiki/Information-about-the-Plugin-Hub"
            rel="noopener noreferrer"
            target="_blank"
          >
            guide on our wiki
          </a>
        </p>
        <div class="row">
          {externalPlugins.map(plugin => (
            <ExternalPlugin key={plugin.displayName} {...plugin} />
          ))}
        </div>
      </div>
    </section>
  </Layout>
)

const mapStateToProps = (state, props) => ({
  ...props,
  externalPlugins: getExternalPlugins(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBootstrap,
      fetchExternalPlugins
    },
    dispatch
  )

const prepareComponentData = async ({
  fetchBootstrap,
  fetchExternalPlugins
}) => {
  await fetchBootstrap()
  await fetchExternalPlugins()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(PluginHub))
