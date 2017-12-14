import React from 'react'
import { Helmet } from 'react-helmet'
import { Row } from 'reactstrap'
import Layout from '../components/layout'
import Feature from '../components/feature'
import features from '../_data/features'
import hero from '../_data/hero'

const Features = () => (
  <Layout>
    <Helmet>
      <title>Features - {hero.title}</title>
    </Helmet>
    <h1>Features</h1>
    <hr />
    <Row>
      {features.map(feature => (<Feature key={feature.title} {...feature} />))}
    </Row>
  </Layout>
)

export default Features
