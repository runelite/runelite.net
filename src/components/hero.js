import platform from 'platform'
import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { filter, find, prepend } from 'ramda'
import { bindActionCreators } from 'redux'
import { getChristmasImage } from '../season'
import {
  makeNavbarDark,
  makeNavbarDefault,
  nextHeroImage
} from '../modules/app'
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
    // return osName === (arch === 64 ? 'Windows64' : 'Windows32')
    return osName === 'Windows32'
  }

  if (family.indexOf('linux') !== -1) {
    return osName === (arch === 64 ? 'Linux64' : 'Linux32')
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
          backgroundImage: `url(${getChristmasImage(
            this.props.images[heroImage]
          )})`
        }}
        id="jumbo"
      >
        <div class="jumbotron-cell">
          <div class="jumbotron-body">
            <h1 class="display-2">{title}</h1>
            <p class="lead">{description}</p>
            <p class="lead">
              <div class="btn-group dropdown">
                <a
                  class={'btn btn-' + mainDropdownItem.color}
                  href={mainDropdownItem.link}
                >
                  <i class={mainDropdownItem.icon} /> {mainDropdownItem.text}
                </a>
                <button
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
              {regularButtons.map(({ link, color, icon, text }) => (
                <span key={link}>
                  {' '}
                  <a class={'btn btn-' + color} href={link}>
                    <i class={icon} /> {text}
                  </a>
                  <br style={{ marginBottom: 10 }} class="d-md-none" />
                </span>
              ))}
            </p>
            <div class="small">
              <Commit {...commit} />
              <b>Latest release:</b>{' '}
              <a href="#news" style={{ color: 'cyan' }}>
                {release || 'unknown'}
              </a>
              <br />
              <b>Players online:</b> {playing || 'unknown'}
            </div>
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
