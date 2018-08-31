/** @jsx h */
import { h } from 'preact'
import { connect } from 'preact-redux'
import Feature from '../components/feature'
import Layout from '../components/layout'
import Hero from '../components/hero'
import { getLatest } from '../blog'
import {
  latestCommitSelector,
  latestReleaseSelector,
  stargazersSelector
} from '../modules/git'
import hero from '../_data/hero'
import features from '../_data/features'
import { sessionCountSelector } from '../modules/runelite'
import Meta from '../components/meta'
import Link from '../components/link'

const Home = ({ commit, release, stars, sessionCount }) => (
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
        <Link routeName='features' style={{ fontSize: 18 }}>
          See all features...
        </Link>
      </h1>
      <hr />
      <div class='row'>
        {features
          .filter(feature => feature.home)
          .map(({ image, title }) => ({ image, title }))
          .map(feature => (
            <Feature key={feature.title} {...feature} />
          ))}
      </div>
      <h1 id='news'>
        Latest news{' '}
        <Link routeName='blog' style={{ fontSize: 18 }}>
          See all news...
        </Link>
      </h1>
      <hr />
      <div
        class='markdown-body'
        dangerouslySetInnerHTML={{ __html: getLatest().__content }}
      />
    </Layout>
  </div>
)

export default connect((state, props) => ({
  commit: latestCommitSelector(state, props),
  release: latestReleaseSelector(state, props),
  stars: stargazersSelector(state, props),
  sessionCount: sessionCountSelector(state, props)
}))(Home)
