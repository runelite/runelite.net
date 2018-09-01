/** @jsx h */
import { h } from 'preact'
import Layout from '../components/layout'
import Feature from '../components/feature'
import features from '../_data/features'
import hero from '../_data/hero'
import Meta from '../components/meta'

const Features = () => (
  <Layout>
    <Meta title={`Features - ${hero.title}`} />
    <h1>Features</h1>
    <hr />
    <div class='row'>
      {features.map(feature => (
        <Feature key={feature.title} {...feature} />
      ))}
    </div>
  </Layout>
)

export default Features
