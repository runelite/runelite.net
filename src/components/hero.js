import React from 'react'
import { Button, Jumbotron } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/fontawesome-free-solid'

const secs = 5

class Hero extends React.Component {
  constructor (props) {
    super(props)
    this.backgroundSequence = this.backgroundSequence.bind(this)
    this.backgroundSequence()
  }

  backgroundSequence () {
    let k = 0

    for (let i = 0; i < this.props.images.length; i++) {
      setTimeout(() => {
        const jumbo = document.getElementById('jumbo')
        jumbo.style.background =
          `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.props.images[i]}) no-repeat center center fixed`
        jumbo.style.backgroundSize = 'cover'

        if ((k + 1) === this.props.images.length) {
          setTimeout(() => this.backgroundSequence(), (secs * 1000))
        } else {
          k++
        }
      }, (secs * 1000) * i)
    }
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
      margin: 0
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
            </p>
            <p className='lead'>
              <Button size='sm' color='secondary' href='https://github.com/runelite/runelite/stargazers'>
                {stars} <FontAwesomeIcon icon={faStar} />
              </Button>{' '}
              Latest release: <b>{release || 'unknown'}</b>
            </p>
          </div>
        </div>
      </Jumbotron>
    )
  }
}

export default Hero
