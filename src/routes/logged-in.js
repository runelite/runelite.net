import { h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'

const LoggedIn = () => (
  <div>
    <Meta title={`Successfully logged in - ${hero.title}`} />
    <Layout>
      <h1>Congratulations!</h1>
      <hr />
      <div>
        You have successfully logged into RuneLite. You may now close this
        window.
      </div>
    </Layout>
  </div>
)

export default LoggedIn
