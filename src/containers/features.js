import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Feature from '../components/feature'
import features from '../_data/features'
import hero from '../_data/hero'

const Features = ({ children }) => (
  <Layout>
    <Helmet>
      <title>Features - {hero.title}</title>
    </Helmet>
    <h1>Features</h1>
    <hr />
    <div className='row'>
      {features.map(feature => (<Feature key={feature.title} {...feature} />))}
    </div>
    {children}
  </Layout>
)

export default Features
