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
  getPluginFilter,
  getSortedExternalPlugins,
  setPluginFilter
} from '../modules/plugin-hub'
import SearchBar from '../components/search-bar'
import { fetchConfig } from '../modules/config'

const handleChange = (event, setPluginFilter) =>
  setPluginFilter({
    name: event.target.value
  })

const PluginHub = ({
  author,
  externalPlugins,
  pluginFilter,
  setPluginFilter
}) => (
  <Layout>
    <Meta title={`${author ? author + ' ' : ''}Plugin Hub - ${hero.title}`} />

    <section id="externalPlugins">
      <div class="content-section">
        <h1 class="page-header">{author ? author + ' ' : ''}Plugin Hub</h1>
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
          <a href="https://github.com/runelite/runelite/wiki/Information-about-the-Plugin-Hub">
            guide on our wiki
          </a>
        </p>
        <SearchBar
          value={pluginFilter.name}
          onInput={e => handleChange(e, setPluginFilter)}
        />
        <div class="row">
          {externalPlugins
            .filter(plugin => (author ? plugin.author === author : true))
            .map(plugin => (
              <ExternalPlugin key={plugin.internalName} {...plugin} />
            ))}
        </div>
      </div>
    </section>
  </Layout>
)

const mapStateToProps = (state, props) => ({
  ...props,
  externalPlugins: getSortedExternalPlugins(state),
  pluginFilter: getPluginFilter(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBootstrap,
      fetchConfig,
      fetchExternalPlugins,
      setPluginFilter
    },
    dispatch
  )

const prepareComponentData = async ({
  fetchBootstrap,
  fetchConfig,
  fetchExternalPlugins
}) => {
  await fetchBootstrap()
  await fetchConfig()
  await fetchExternalPlugins()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(PluginHub))
