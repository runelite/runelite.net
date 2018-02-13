import React from 'react'
import { Button, Jumbotron } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/fontawesome-free-solid'

class Hero extends React.Component {
  constructor (props) {
    super(props)
    this.updateBackground = this.updateBackground.bind(this)

    this.state = {
      index: 0,
      interval: setInterval(() => this.updateBackground(this.state.index), 5000)
    }
  }

  updateBackground (index) {
    const image = this.props.images[index]
    const jumbo = document.getElementById('jumbo')
    jumbo.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image}) no-repeat center center fixed`
    jumbo.style.backgroundSize = 'cover'

    this.setState({
      ...this.state,
      index: (index + 1) % this.props.images.length
    })
  }

  static makeNavigationDark () {
    const navbar = document.getElementsByClassName('navbar')[0]
    navbar.className = navbar.className.replace('navbar-light', 'navbar-dark').replace('bg-white', 'bg-faded')
  }

  static makeNavigationWhite () {
    const navbar = document.getElementsByClassName('navbar')[0]
    navbar.className = navbar.className.replace('navbar-dark', 'navbar-light').replace('bg-faded', 'bg-white')
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
    const { title, logo, description, buttons, release, stars } = this.props

    const style = {
      backgroundBlendMode: 'darken',
      transition: '3s',
      color: 'white',
      textShadow: '1px 1px 2px black',
      display: 'table',
      width: '100%',
      margin: 0,
      height: '100%'
    }

    return (
      <Jumbotron fluid style={style} id='jumbo'>
        <div style={{
          display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: 'center'
        }}>
          <div style={{maxWidth: 900, margin: 'auto'}}>
            <img src={logo} alt='Logo' />
            <h1 className='display-1'>{title}</h1>
            <p className='lead'>{description}</p>
            <p className='lead'>
              {buttons.map(({link, color, icon, text}) => (
                <span key={link}>
                  <Button color={color} href={link}>
                    <FontAwesomeIcon icon={icon} /> {text}
                  </Button>
                  {' '}
                </span>
              ))}
              <span>
                <Button color='secondary' href='https://github.com/runelite/runelite/stargazers'>
                  {stars} <FontAwesomeIcon icon={faStar} />
                </Button>
              </span>
            </p>
            <p className='lead'>
              Latest release: <b>{release || 'unknown'}</b>
            </p>
          </div>
        </div>
      </Jumbotron>
    )
  }
}

export default Hero
