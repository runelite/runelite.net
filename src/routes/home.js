import { h } from 'preact'
import './home.css'
import { connect } from 'preact-redux'
import Feature from '../components/feature'
import Layout from '../components/layout'
import links from '../_data/links'
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
    <Hero
      {...hero}
      release={release.name}
      commit={commit}
      playing={sessionCount}
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

      <section id="about">
        <div class="content-section">
          <div class="video">
            <iframe
              width="100%"
              height="100%"
              src={hero.video_url}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>

          <div class="info">
            <h1>WHAT IS RUNELITE</h1>
            <p style="white-space: pre-line">{hero.about}</p>
            <a href={links.github} title="GitHub">
              <i class="fab fa-github" />
            </a>
            <a href={links.discord} title="Discord">
              <i class="fab fa-discord" />
            </a>
            <a href={links.twitter} title="Twitter">
              <i class="fab fa-twitter" />
            </a>
            <a href={links.patreon} title="Patreon">
              <i class="fab fa-patreon" />
            </a>
          </div>
        </div>
      </section>

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
