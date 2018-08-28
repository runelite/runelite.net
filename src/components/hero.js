import React from 'react'
import {Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'
import platform from 'platform'
import * as R from 'ramda'
import Commit from './commit'
import {changeStyle} from '../redux/modules/navigation'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

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

class Hero extends React.Component {
  constructor (props) {
    super(props)
    this.updateBackground = this.updateBackground.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.handleScroll = this.handleScroll.bind(this)

    this.state = {
      index: 0,
      image: this.props.images[0],
      isDropdownOpen: false,
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

  toggleDropdown () {
    this.setState({
      ...this.state,
      isDropdownOpen: !this.state.isDropdownOpen
    })
  }

  handleScroll () {
    const jumbo = document.getElementById('jumbo')
    const jumboBottom = jumbo.offsetTop + jumbo.offsetHeight
    const navbar = document.getElementsByClassName('navbar')[0]
    const fromTop = jumboBottom - navbar.offsetHeight
    const stop = window.scrollY || window.pageYOffset || document.body.scrollTop
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
    const style = {
      backgroundBlendMode: 'darken',
      transition: 'background-image 3s',
      color: 'white',
      textShadow: '1px 1px 2px black',
      display: 'table',
      width: '100%',
      margin: 0,
      height: '100%',
      background: 'rgba(0,0,0,0.4) no-repeat center center fixed',
      backgroundImage: `url(${this.state.image})`,
      backgroundSize: 'cover'
    }

    let regularButtons = R.filter(button => !button.dropdown)(buttons)
    const dropdownButtons = R.filter(button => button.dropdown)(buttons)
    const defaultDropdownItem = R.find(button => button.os === 'all')(dropdownButtons)
    const mainDropdownItem = R.find(button => isOsCorrect(button.os))(dropdownButtons) || defaultDropdownItem

    if (defaultDropdownItem !== mainDropdownItem) {
      regularButtons = R.prepend(defaultDropdownItem)(regularButtons)
    }

    return (
      <div className='jumbotron jumbotron-fluid' style={style} id='jumbo'>
        <div style={{
          display: 'table-cell',
          verticalAlign: 'bottom'
        }}>
          <style>
            {`
            .navbar-dark .navbar-nav .nav-link {
              color: white;
              text-shadow: black 1px 1px 2px;
            }
            `}
          </style>
          <div style={{maxWidth: '1000px', padding: 25, paddingLeft: 50}}>
            <h1 className='display-2'>
              {title}
            </h1>
            <p className='lead'>{description}</p>
            <p className='lead'>
              <ButtonDropdown isOpen={this.state.isDropdownOpen} toggle={this.toggleDropdown}>
                <Button id='caret' color={mainDropdownItem.color} href={mainDropdownItem.link}>
                  <i className={mainDropdownItem.icon} /> {mainDropdownItem.text}
                </Button>
                <DropdownToggle caret color={mainDropdownItem.color} />
                <DropdownMenu style={{textShadow: 'none'}}>
                  {dropdownButtons.map(({link, icon, text}) => (
                    <DropdownItem key={link} href={link}>
                      <i className={icon} /> {text}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </ButtonDropdown>
              {regularButtons.map(({link, color, icon, text}) => (
                <span key={link}>
                  {' '}
                  <Button color={color} href={link}>
                    <i className={icon} /> {text}
                  </Button>
                  <br style={{ marginBottom: 10 }} className='d-md-none' />
                </span>
              ))}
            </p>
            <div className='small'>
              <Commit {...commit} />
              <b>Latest release:</b> <a href='#news' style={{color: 'cyan'}}>{release || 'unknown'}</a><br />
              <b>Players online:</b> {playing || 'unknown'}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => state,
  (dispatch) => bindActionCreators({ changeStyle }, dispatch)
)(Hero)
