import { h } from 'preact'
import Layout from '../components/layout'
import Feature from '../components/feature'
import features from '../_data/features'
import hero from '../_data/hero'
import Meta from '../components/meta'

const Features = () => (
  <Layout>
    <Meta
      title={`Features - ${hero.title}`}
      description="RuneLite plugins and features"
    />

    <section id="features">
      <div class="content-section">
        <h1 class="page-header">Features</h1>
        <div class="row">
          {features.map(feature => (
            <Feature key={feature.title} linkAlt="View on Wiki" {...feature} />
          ))}
        </div>
      </div>
    </section>
  </Layout>
)

export default Features
