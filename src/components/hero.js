import platform from 'platform'
import { h, Component } from 'preact'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getChristmasImage } from '../season'
import {
  makeNavbarDark,
  makeNavbarDefault,
  nextHeroImage
} from '../modules/app'
import { numberWithCommas } from '../util'
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
      interval: setInterval(() => {
        const { images, heroImage, nextHeroImage } = this.props
        const numImages = images.length
        const nextImageId = (heroImage + 1) % numImages
        const img = new Image()
        img.src = getChristmasImage(images[nextImageId])
        img.onload = () => nextHeroImage(numImages)

        this.setState({
          loadingHeroImg: img
        })
      }, 8000)
    })

    // Change navigation bar to fit hero
    this.handleScroll()

    // Add scroll listener for navigation bar
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    const { interval, loadingHeroImg } = this.state

    // Remove background updater
    clearInterval(interval)

    // onload will do some react lifecycle stuff. remove so that
    // component is not modified after its been removed from the DOM
    if (loadingHeroImg) {
      delete loadingHeroImg.onload
    }

    // Reset navigation bar
    this.props.makeNavbarDefault()

    // Remove scroll listener
    document.removeEventListener('scroll', this.handleScroll)
  }

  render({
    title,
    description,
    buttons,
    release,
    commit,
    playing,
    loggedIn,
    heroImage
  }) {
    const dropdownButtons = buttons.filter(button => button.dropdown)
    const defaultDropdownItem = dropdownButtons.find(
      button => button.os === 'all'
    )
    const mainDropdownItem =
      dropdownButtons.find(button => isOsCorrect(button.os)) ||
      defaultDropdownItem

    return (
      <div
        class="jumbotron jumbotron-fluid"
        style={{
          '--jumbotron-background': `url(${getChristmasImage(
            this.props.images[heroImage]
          )})`
        }}
        id="jumbo"
      >
        <div class="jumbotron-cell">
          <div class="jumbotron-body">
            <div class="jumbotron-header">
              <h1>
                RUNELITE<span>.NET</span>
              </h1>
              <p>{description}</p>

              <a id="contribute" class="btn" href={links.github}>
                Contribute
              </a>

              <div id="download">
                <div class="btn-group dropdown">
                  <a
                    id="direct-download-btn"
                    class={'btn btn-' + mainDropdownItem.color}
                    href={mainDropdownItem.link}
                  >
                    Download
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
              </div>
            </div>

            <div class="small">
              <h6>Players:</h6>
              {numberWithCommas(playing) || 'unknown'} online (
              {numberWithCommas(loggedIn) || 'unknown'} in game)
              <h6>Latest release:</h6>
              <a href="#news">{release || 'unknown'}</a>
              <Commit {...commit} />
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
