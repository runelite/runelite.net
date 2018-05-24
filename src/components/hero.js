import React from 'react'
import { Button, Jumbotron } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Commit from './commit'

class Hero extends React.Component {
  constructor (props) {
    super(props)
    this.updateBackground = this.updateBackground.bind(this)

    this.state = {
      index: 0,
      interval: setInterval(() => this.updateBackground(this.state.index), 8000)
    }
  }

  updateBackground (index) {
    const image = this.props.images[index]
    const jumbo = document.getElementById('jumbo')
    jumbo.style.backgroundImage = `url(${image})`
    jumbo.style.backgroundSize = 'cover'

    this.setState({
      ...this.state,
      index: (index + 1) % this.props.images.length
    })
  }

  static getNavbar () {
    return document.getElementsByClassName('navbar')[0]
  }

  static makeNavigationDark () {
    const navbar = Hero.getNavbar()
    navbar.className = navbar.className.replace('navbar-light', 'navbar-dark').replace('bg-white', 'bg-faded')
    navbar.style = 'background: linear-gradient(rgba(0,0,0,0.7) 40%, transparent)'
  }

  static makeNavigationWhite () {
    const navbar = Hero.getNavbar()
    navbar.className = navbar.className.replace('navbar-dark', 'navbar-light').replace('bg-faded', 'bg-white')
    navbar.style = ''
  }

  static handleScroll () {
    const jumbo = document.getElementById('jumbo')
    const jumboBottom = jumbo.offsetTop + jumbo.offsetHeight
    const navbar = document.getElementsByClassName('navbar')[0]
    const fromTop = jumboBottom - navbar.offsetHeight
    const stop = document.documentElement.scrollTop

    if (stop > fromTop) {
      Hero.makeNavigationWhite()
    } else {
      Hero.makeNavigationDark()
    }
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
      background: 'rgba(0,0,0,0.4) no-repeat center center fixed'
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
              {buttons.map(({link, color, icon, text}) => (
                <span key={link}>
                  <Button color={color} href={link} style={{ margin: '5px 0'}}>
                    <FontAwesomeIcon icon={icon} /> {text}
                  </Button>
                  {' '}
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
