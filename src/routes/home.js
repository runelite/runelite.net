import { h } from 'preact'
import './home.scss'
import './blog.scss'
import { connect } from 'react-redux'
import Feature from '../components/feature'
import Layout from '../components/layout'
import Hero from '../components/hero'
import { latest } from '../blog'
import {
  fetchCommits,
  fetchReleases,
  fetchRepository,
  getLatestCommit,
  getLatestRelease
} from '../modules/git'
import hero from '../_data/hero'
import features from '../_data/features'
import { fetchSessionCount, getSessionCount } from '../modules/session'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import { Link } from 'preact-router'
import Async from '../components/async'
import prepare from '../components/prepare'

const Home = ({ commit, release, sessionCount }) => (
  <div style={{ height: 'inherit' }}>
    <Meta
      title={`${hero.title} - Open Source Old School RuneScape Client`}
      description={hero.description}
    />
    <Layout>
      <section id="intro">
        <Hero
          {...hero}
          release={release.name}
          commit={commit}
          playing={sessionCount}
        />
      </section>

      <section id="features">
        <div class="content-section homepage">
          <h1>FEATURES</h1>
          <Link href="/features" style={{ color: 'inherit' }}>
            <h4>SHOW ALL FEATURES</h4>
          </Link>

          <div class="row">
            {features
              .filter(feature => feature.home)
              .map(feature => (
                <Feature key={feature.title} {...feature} />
              ))}
          </div>
        </div>
      </section>

      <section id="news">
        <div class="content-section homepage">
          <h1 id="news">LATEST NEWS</h1>
          <Link href="/blog" style={{ color: 'inherit' }}>
            <h4>SHOW ALL NEWS</h4>
          </Link>

          <Async
            getComponent={() =>
              latest().then(({ body }) => (
                <div
                  class="markdown-body news-page"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              ))
            }
          />
        </div>
      </section>
    </Layout>
  </div>
)

const mapStateToProps = (state, props) => ({
  commit: getLatestCommit(state, props),
  release: getLatestRelease(state, props),
  sessionCount: getSessionCount(state, props)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCommits,
      fetchReleases,
      fetchRepository,
      fetchSessionCount
    },
    dispatch
  )

const prepareComponentData = async ({
  fetchCommits,
  fetchRepository,
  fetchReleases,
  fetchSessionCount
}) => {
  fetchCommits()
  await fetchReleases()
  await fetchSessionCount()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(Home))
