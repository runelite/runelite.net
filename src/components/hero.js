import platform from 'platform'
import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { filter, find, prepend } from 'ramda'
import { bindActionCreators } from 'redux'
import {
  makeNavbarDark,
  makeNavbarDefault,
  nextHeroImage
} from '../modules/app'
import links from '../_data/links'
import Commit from './commit'

function isOsCorrect(osName) {
  if (!platform.os.family) {
    return false
  }

  const arch = platform.os.architecture
  const family = platform.os.family.toLowerCase()

  if (family.indexOf('os x') !== -1 || family.indexOf('mac') !== -1) {
    return osName === 'macOS'
  }

  if (family.indexOf('win') !== -1) {
    return osName === (arch === 64 ? 'Windows64' : 'Windows32')
  }

  return osName === family
}

class Hero extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)

    this.state = {
      interval: 0
    }
  }

  handleScroll() {
    const jumbo = document.getElementById('jumbo')
    const jumboBottom = jumbo.offsetTop + jumbo.offsetHeight
    const navbar = document.getElementsByClassName('navbar')[0]
    const fromTop = jumboBottom - navbar.offsetHeight
    const stop = window.scrollY || window.pageYOffset || document.body.scrollTop

    if (this.props.navbarDark) {
      if (stop > fromTop) {
        this.props.makeNavbarDefault()
      }
    } else {
      if (stop <= fromTop) {
        this.props.makeNavbarDark()
      }
    }
  }

  componentDidMount() {
    // Add background updater
    this.setState({
      interval: setInterval(
        () => this.props.nextHeroImage(this.props.images.length),
        8000
      )
    })

    // Change navigation bar to fit hero
    this.handleScroll()

    // Add scroll listener for navigation bar
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    // Remove background updater
    clearInterval(this.state.interval)

    // Reset navigation bar
    this.props.makeNavbarDefault()

    // Remove scroll listener
    document.removeEventListener('scroll', this.handleScroll)
  }

  render({ title, description, buttons, release, commit, playing, heroImage }) {
    let regularButtons = filter(button => !button.dropdown)(buttons)
    const dropdownButtons = filter(button => button.dropdown)(buttons)
    const defaultDropdownItem = find(button => button.os === 'all')(
      dropdownButtons
    )
    const mainDropdownItem =
      find(button => isOsCorrect(button.os))(dropdownButtons) ||
      defaultDropdownItem

    if (defaultDropdownItem !== mainDropdownItem) {
      regularButtons = prepend(defaultDropdownItem)(regularButtons)
    }

    return (
      <div
        class="jumbotron jumbotron-fluid"
        style={{
          backgroundImage: `url(${
            this.props.images[heroImage]
          }), radial-gradient(transparent, rgba(0,0,0,.4), black)`
        }}
        id="jumbo"
      >
        <div class="jumbotron-cell">
          <div class="jumbotron-body">
            <p class="lead" id="description">
              {description}
            </p>
            <p class="lead" id="download">
              <div class="btn-group dropdown">
                <a
                  type="button"
                  class={'btn btn-lg'}
                  href={mainDropdownItem.link}
                >
                  Download
                </a>
                <button
                  type="button"
                  class={
                    'btn dropdown-toggle dropdown-toggle-split btn-' +
                    mainDropdownItem.color
                  }
                >
                  <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu" style={{ textShadow: 'none' }}>
                  {dropdownButtons.map(({ link, icon, text }) => (
                    <a class="dropdown-item" href={link} native>
                      <i class={icon} /> {text}
                    </a>
                  ))}
                </div>
              </div>
            </p>
            <p class="lead" id="version">
              Version {release || 'unknown'}
            </p>
          </div>
          <div id="social-links">
            <div class="social-link">
              <a href={links.github}>
                <img src="img/social/github_icon.png" />
              </a>
            </div>
            <div class="social-link">
              <a href={links.discord}>
                <img src="img/social/discord_icon.png" />
              </a>
            </div>
            <div class="social-link">
              <a href={links.patreon}>
                <img src="img/social/patreon_icon.png" />
              </a>
            </div>
            <div class="social-link">
              <a href={links.twitter}>
                <img src="img/social/twitter_icon.png" />
              </a>
            </div>
          </div>
          <div class="small">
            <Commit {...commit} />
            <div style="color: #e6a32e; line-height: 10px;margin-top: 10px;">
              Players online:
            </div>{' '}
            {playing || 'unknown'}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    navbarDark: state.app.navbarDark,
    heroImage: state.app.heroImage
  }),
  dispatch =>
    bindActionCreators(
      { makeNavbarDark, makeNavbarDefault, nextHeroImage },
      dispatch
    )
)(Hero)
