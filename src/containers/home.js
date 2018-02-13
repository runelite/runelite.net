import 'github-markdown-css'
import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Row } from 'reactstrap'
import { NavLink } from 'redux-first-router-link'
import Feature from '../components/feature'
import Layout from '../components/layout'
import Hero from '../components/hero'
import { getLatest } from '../blog'
import { latestCommitSelector, latestReleaseSelector, stargazersSelector } from '../redux/modules/git'
import hero from '../_data/hero'
import features from '../_data/features'

const Home = ({ children, commit, release, stars }) => (
  <div style={{height: 'inherit'}}>
    <Helmet>
      <title>{hero.title} - Open Source Old School RuneScape Client</title>
      <meta name='description' content={hero.description} />
    </Helmet>
    <Hero {...hero} release={release.name} stars={stars} commit={commit} />
    <Layout>
      <h1>Features <NavLink to='/features' style={{ fontSize: 18 }}>See all features...</NavLink></h1>
      <hr />
      <Row>
        {features
            .filter(feature => feature.home)
            .map(({ image, title }) => ({ image, title }))
            .map(feature => (<Feature key={feature.title} {...feature} />))}
      </Row>
      <h1>Latest news <NavLink to='/blog' style={{ fontSize: 18 }}>See all news...</NavLink></h1>
      <hr />
      <div className='markdown-body' dangerouslySetInnerHTML={{__html: getLatest().__content}} />
      {children}
    </Layout>
  </div>
)

export default connect(
  (state, props) => ({
    commit: latestCommitSelector(state, props),
    release: latestReleaseSelector(state, props),
    stars: stargazersSelector(state, props)
  })
)(Home)
