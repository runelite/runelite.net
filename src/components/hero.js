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
            <div class="jumbotron-header">
              <h1>
                RUNELITE<span>.NET</span>
              </h1>
              <p>{description}</p>

              <a id="contribute" class="btn" href={links.github}>
                Contribute
              </a>

              <div id="download" class="dropdown show">
                <a
                  class="btn btn-secondary dropdown-toggle"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Download
                </a>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  {dropdownButtons.map(({ link, icon, text }) => (
                    <a class="dropdown-item" href={link} native>
                      <i class={icon} /> {text}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div class="small">
              <h6>Players online:</h6>
              {playing || 'unknown'}

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
