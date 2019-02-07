import { Component, h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'

class GitHubAuthCode extends Component {
  render({ code }) {
    return (
      <div>
        <Meta title={`GitHub-Discord Connection - ${hero.title}`} />
        <Layout>
          <h1>Almost there...</h1>
          <hr />
          <div>
            To complete authentication, send:
            <pre class="pre-select">!ghauth {code}</pre>
            In a Direct Message to the RuneLite Discord bot.
          </div>
        </Layout>
      </div>
    )
  }
}

export default GitHubAuthCode
