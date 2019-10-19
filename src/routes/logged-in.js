import { h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import './logged-in.scss'

const LoggedIn = () => (
  <Layout>
    <Meta title={`Successfully logged in - ${hero.title}`} />
    <section id="logged-in">
      <div class="content-section">
        <h1>Congratulations!</h1>
        <hr />
        <p>
          You have successfully logged into RuneLite. You may now close this
          window.
        </p>
      </div>
    </section>
  </Layout>
)

export default LoggedIn
