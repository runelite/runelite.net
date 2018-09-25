import { Component, h } from 'preact'
import { connect } from 'preact-redux'
import Feature from '../components/feature'
import Layout from '../components/layout'
import Hero from '../components/hero'
import { latest } from '../blog'
import {
  getCommits,
  getReleases,
  getRepository,
  latestCommitSelector,
  latestReleaseSelector,
  stargazersSelector
} from '../modules/git'
import hero from '../_data/hero'
import features from '../_data/features'
import { getSessionCount, sessionCountSelector } from '../modules/runelite'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import { Link } from 'preact-router'
import Async from '../components/async'
import './home.css'

class Home extends Component {
  componentDidMount() {
    this.props.getCommits()
    this.props.getReleases().then(() => this.props.getSessionCount())
    this.props.getRepository()
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
        <div class="home-section-container">
          <div class="home-section container">
            <h1 class="dark-title">
              Features{' '}
              <Link href="/features" class="home-section-link float-right">
                See all features
              </Link>
            </h1>
            <div class="row">
              {features.filter(feature => feature.home).map(feature => (
                <Feature key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </div>
        <Layout>
          <h1 id="news" style={{ margin: '0px' }}>
            Latest news{' '}
            <Link href="/blog" class="home-section-link float-right">
              See all news
            </Link>
          </h1>
          <hr />
          <br />
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
    commit: latestCommitSelector(state, props),
    release: latestReleaseSelector(state, props),
    stars: stargazersSelector(state, props),
    sessionCount: sessionCountSelector(state, props)
  }),
  dispatch =>
    bindActionCreators(
      {
        getCommits,
        getReleases,
        getRepository,
        getSessionCount
      },
      dispatch
    )
)(Home)
