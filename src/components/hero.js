/** @jsx h */
import platform from 'platform'
import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { filter, find, prepend } from 'ramda'
import { bindActionCreators } from 'redux'
import { changeStyle } from '../modules/navigation'
import Commit from './commit'

function isOsCorrect (osName) {
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
  constructor (props) {
    super(props)
    this.updateBackground = this.updateBackground.bind(this)
    this.handleScroll = this.handleScroll.bind(this)

    this.state = {
      index: 0,
      image: this.props.images[0],
      interval: 0
    }
  }

  updateBackground (index) {
    this.setState({
      ...this.state,
      image: this.props.images[index],
      index: (index + 1) % this.props.images.length
    })
  }

  handleScroll () {
    const jumbo = document.getElementById('jumbo')
    const jumboBottom = jumbo.offsetTop + jumbo.offsetHeight
    const navbar = document.getElementsByClassName('navbar')[0]
    const fromTop = jumboBottom - navbar.offsetHeight
    const stop =
      window.scrollY || window.pageYOffset || document.body.scrollTop
    this.props.changeStyle(stop <= fromTop)
  }

  componentDidMount () {
    // Update background
    this.updateBackground(0)

    // Add background updater
    this.setState({
      internal: setInterval(() => this.updateBackground(this.state.index), 8000)
    })

    // Change navigation bar to fit hero
    this.handleScroll()

    // Add scroll listener for navigation bar
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    // Remove background updater
    clearInterval(this.state.interval)

    // Reset navigation bar
    this.props.changeStyle(false)

    // Remove scroll listener
    document.removeEventListener('scroll', this.handleScroll)
  }

  render ({ title, description, buttons, release, commit, playing }) {
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
        class='jumbotron jumbotron-fluid'
        style={{ backgroundImage: `url(${this.state.image})` }}
        id='jumbo'
      >
        <div class='jumbotron-cell'>
          <div class='jumbotron-body'>
            <h1 class='display-2'>{title}</h1>
            <p class='lead'>{description}</p>
            <p class='lead'>
              <div class='btn-group dropdown'>
                <a
                  type='button'
                  class={'btn btn-' + mainDropdownItem.color}
                  href={mainDropdownItem.link}
                >
                  <i class={mainDropdownItem.icon} /> {mainDropdownItem.text}
                </a>
                <button
                  type='button'
                  class={
                    'btn dropdown-toggle dropdown-toggle-split btn-' +
                    mainDropdownItem.color
                  }
                >
                  <span class='sr-only'>Toggle Dropdown</span>
                </button>
                <div class='dropdown-menu' style={{ textShadow: 'none' }}>
                  {dropdownButtons.map(({ link, icon, text }) => (
                    <a class='dropdown-item' href={link} native>
                      <i class={icon} /> {text}
                    </a>
                  ))}
                </div>
              </div>
              {regularButtons.map(({ link, color, icon, text }) => (
                <span key={link}>
                  {' '}
                  <a type='button' class={'btn btn-' + color} href={link}>
                    <i class={icon} /> {text}
                  </a>
                  <br style={{ marginBottom: 10 }} class='d-md-none' />
                </span>
              ))}
            </p>
            <div class='small'>
              <Commit {...commit} />
              <b>Latest release:</b>{' '}
              <a href='#news' style={{ color: 'cyan' }}>
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
  state => state,
  dispatch => bindActionCreators({ changeStyle }, dispatch)
)(Hero)
