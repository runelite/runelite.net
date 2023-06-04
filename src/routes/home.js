import { h } from 'preact'
import './home.scss'
import './blog.scss'
import { connect } from 'react-redux'
import Feature from '../components/feature'
import Layout from '../components/layout'
import Hero from '../components/hero'
import { latest } from '../blog'
import { fetchCommits, getLatestCommit } from '../modules/git'
import hero from '../_data/hero'
import features from '../_data/features'
import {
  fetchSessionCount,
  fetchLoggedInCount,
  getSessionCount,
  getLoggedInCount
} from '../modules/session'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import { Link } from 'preact-router'
import Async from '../components/async'
import prepare from '../components/prepare'
import { fetchBootstrap, getLatestRelease } from '../modules/bootstrap'
import { InView } from 'react-intersection-observer'

const Home = ({ commit, release, sessionCount, loggedInCount }) => (
  <Layout>
    <Meta
      title={`${hero.title} - Open Source Old School RuneScape Client`}
      description={hero.description}
    />

    <section id="intro">
      <Hero
        {...hero}
        release={release}
        commit={commit}
        playing={sessionCount}
        loggedIn={loggedInCount}
      />
    </section>

    <section id="features-home">
      <div class="content-section homepage">
        <h1 class="page-header">FEATURES</h1>
        <Link href="/features" style={{ color: 'inherit' }}>
          <h4 class="right-header">SHOW ALL FEATURES</h4>
        </Link>

        <div class="row">
          {features
            .filter(feature => feature.home)
            .map(feature => (
              <Feature
                key={feature.title}
                linkAlt="View on Wiki"
                {...feature}
              />
            ))}
        </div>
      </div>
    </section>

    <section id="news">
      <div class="content-section homepage">
        <h1 class="page-header">LATEST NEWS</h1>
        <Link href="/blog" style={{ color: 'inherit' }}>
          <h4 class="right-header">SHOW ALL NEWS</h4>
        </Link>

        <InView>
          {({ inView, ref }) => (
            <div ref={ref}>
              {inView ? (
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
              ) : null}
            </div>
          )}
        </InView>
      </div>
    </section>
  </Layout>
)

const mapStateToProps = (state, props) => ({
  commit: getLatestCommit(state, props),
  release: getLatestRelease(state, props),
  sessionCount: getSessionCount(state, props),
  loggedInCount: getLoggedInCount(state, props)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBootstrap,
      fetchCommits,
      fetchSessionCount,
      fetchLoggedInCount
    },
    dispatch
  )

const prepareComponentData = async ({
  fetchBootstrap,
  fetchCommits,
  fetchSessionCount,
  fetchLoggedInCount
}) => {
  fetchBootstrap().then(() => fetchCommits())
  fetchSessionCount()
  fetchLoggedInCount()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(Home))
