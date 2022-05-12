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
          <pre class="pre-select">/ghauth oauth_code:{code}</pre>
          In the{' '}
          <a href="https://runelite.net/discord" title="RuneLite Discord">
            RuneLite Discord
          </a>
        </div>
      </div>
    </section>
  </Layout>
)

export default GitHubAuthCode
