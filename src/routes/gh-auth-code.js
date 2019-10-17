import { h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import './gh-auth-code.scss'

const GitHubAuthCode = ({ code }) => (
  <div>
    <Meta title={`GitHub-Discord Connection - ${hero.title}`} />
    <Layout>
      <section id="gh-auth">
        <div class="content-section gh-auth-container">
          <h1>Almost there...</h1>
          <hr />
          <div>
            To complete authentication, send:
            <pre class="pre-select">!ghauth {code}</pre>
            In a Direct Message to the RuneLite Discord bot.
          </div>{' '}
        </div>
      </section>
    </Layout>
  </div>
)

export default GitHubAuthCode
