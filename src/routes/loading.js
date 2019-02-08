import { h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'

const Loading = () => (
  <div>
    <Meta title={`Loading - ${hero.title}`} />
    <Layout>
      <h1>Loading...</h1>
      <hr />
      <div>Please wait until you will be redirected.</div>
    </Layout>
  </div>
)

export default Loading
