import { Component, h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setSession } from '../modules/account'

class LoggedIn extends Component {
  componentDidMount() {
    if (this.props.sessionId && this.props.username) {
      this.props.setSession({
        uuid: this.props.sessionId,
        username: this.props.username
      })
    }
  }

  render({ sessionId, username }) {
    const message =
      username && sessionId ? (
        <p>
          You have successfully logged in as <b>{username}</b>. You can now
          either close this window or navigate to your{' '}
          <a href="/account/home">account page</a>.
        </p>
      ) : (
        <p>
          You have successfully logged into RuneLite. Your profiles have been
          synced to the client, if you have any. If you want to use one of these
          profiles now, switch to the profile by double clicking the profile in
          the profiles panel.
          <br />
          <br />
          You may now close this window.
        </p>
      )

    return (
      <Layout>
        <Meta title={`Successfully logged in - ${hero.title}`} />
        <section id="logged-in">
          <div class="content-section">
            <h1 class="page-header">Congratulations!</h1>
            {message}
          </div>
        </section>
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setSession }, dispatch)

export default connect(state => state, mapDispatchToProps)(LoggedIn)
