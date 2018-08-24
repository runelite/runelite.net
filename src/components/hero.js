import React from 'react'
import {Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Jumbotron} from 'reactstrap'
import platform from 'platform'
import * as R from 'ramda'
import Commit from './commit'

class Hero extends React.Component {
  constructor (props) {
    super(props)
    this.updateBackground = this.updateBackground.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)

    this.state = {
      index: 0,
      image: this.props.images[0],
      isDropdownOpen: false,
      interval: setInterval(() => this.updateBackground(this.state.index), 8000)
    }
  }

  updateBackground (index) {
    this.setState({
      ...this.state,
      image: this.props.images[index],
      index: (index + 1) % this.props.images.length
    })
  }

  static isOsCorrect (osName) {
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

  static getNavbar () {
    return document.getElementsByClassName('navbar')[0]
  }

  static makeNavigationDark () {
    const navbar = Hero.getNavbar()
    navbar.className = navbar.className.replace('navbar-light', 'navbar-dark').replace('bg-white', 'bg-faded')
    navbar.style.background = 'linear-gradient(rgba(0,0,0,0.7) 40%, transparent)'
  }

  static makeNavigationWhite () {
    const navbar = Hero.getNavbar()
    navbar.className = navbar.className.replace('navbar-dark', 'navbar-light').replace('bg-faded', 'bg-white')
    navbar.style.background = ''
  }

  static handleScroll () {
    const jumbo = document.getElementById('jumbo')
    const jumboBottom = jumbo.offsetTop + jumbo.offsetHeight
    const navbar = document.getElementsByClassName('navbar')[0]
    const fromTop = jumboBottom - navbar.offsetHeight
    const stop = window.scrollY || window.pageYOffset || document.body.scrollTop

    if (stop > fromTop) {
      Hero.makeNavigationWhite()
    } else {
      Hero.makeNavigationDark()
    }
  }

  toggleDropdown () {
    this.setState({
      ...this.state,
      isDropdownOpen: !this.state.isDropdownOpen
    })
  }

  componentDidMount () {
    // Update background
    this.updateBackground(0)

    // Change navigation bar to fit hero
    Hero.handleScroll()

    // Add scroll listener for navigation bar
    document.addEventListener('scroll', Hero.handleScroll)
  }

  componentWillUnmount () {
    // Remove background updater
    clearInterval(this.state.interval)

    // Reset navigation bar
    Hero.makeNavigationWhite()

    // Remove scroll listener
    document.removeEventListener('scroll', Hero.handleScroll)
  }

  render () {
    const { title, description, buttons, release, commit, playing } = this.props

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
    const mainDropdownItem = R.find(button => Hero.isOsCorrect(button.os))(dropdownButtons) || defaultDropdownItem

    if (defaultDropdownItem !== mainDropdownItem) {
      regularButtons = R.prepend(defaultDropdownItem)(regularButtons)
    }

    return (
      <Jumbotron fluid style={style} id='jumbo'>
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
      </Jumbotron>
    )
  }
}

export default Hero
