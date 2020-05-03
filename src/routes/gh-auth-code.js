import { h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'

const GitHubAuthCode = ({ code }) => (
  <Layout>
    <Meta title={`GitHub-Discord Connection - ${hero.title}`} />

    <section id="gh-auth">
      <div class="content-section">
        <h1 class="page-header">Almost there...</h1>
        <div>
          To complete authentication, send:
          <pre class="pre-select">!ghauth {code}</pre>
          In a Direct Message to the RuneLite Discord bot.
        </div>{' '}
      </div>
    </section>
  </Layout>
)

export default GitHubAuthCode
