import { Component, h } from 'preact'
import { connect } from 'preact-redux'
import Feature from '../components/feature'
import Layout from '../components/layout'
import Hero from '../components/hero'
import { latest } from '../blog'
import {
  fetchCommits,
  fetchReleases,
  fetchRepository,
  getLatestCommit,
  getLatestRelease,
  getStargazers
} from '../modules/git'
import hero from '../_data/hero'
import features from '../_data/features'
import { fetchSessionCount, getSessionCount } from '../modules/runelite'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import { Link } from 'preact-router'
import Async from '../components/async'

class Home extends Component {
  componentDidMount() {
    this.props.fetchCommits()
    this.props.fetchReleases().then(() => this.props.fetchSessionCount())
    this.props.fetchRepository()
  }

  render({ commit, release, stars, sessionCount }) {
    return (
      <div style={{ height: 'inherit' }}>
        <Meta
          title={`${hero.title} - Open Source Old School RuneScape Client`}
          description={hero.description}
        />
        <Hero
          {...hero}
          release={release.name}
          stars={stars}
          commit={commit}
          playing={sessionCount}
        />
        <Layout>
          <h1>
            Features{' '}
            <Link href="/features" style={{ fontSize: 18 }}>
              See all features...
            </Link>
          </h1>
          <hr />
          <div class="row">
            {features
              .filter(feature => feature.home)
              .map(feature => (
                <Feature key={feature.title} {...feature} />
              ))}
          </div>
          <h1 id="news">
            Latest news{' '}
            <Link href="/blog" style={{ fontSize: 18 }}>
              See all news...
            </Link>
          </h1>
          <hr />
          <Async
            getComponent={() =>
              latest().then(({ body }) => (
                <div
                  class="markdown-body"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              ))
            }
          />
        </Layout>
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    commit: getLatestCommit(state, props),
    release: getLatestRelease(state, props),
    stars: getStargazers(state, props),
    sessionCount: getSessionCount(state, props)
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchCommits,
        fetchReleases,
        fetchRepository,
        fetchSessionCount
      },
      dispatch
    )
)(Home)
