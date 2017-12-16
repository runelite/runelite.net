import React from 'react'
import { Button, Jumbotron } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/fontawesome-free-solid'

const Hero = ({ title, logo, description, buttons, release, stars }) => (
  <Jumbotron fluid style={{
    background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/img/fullpic.png)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    color: 'white',
    textShadow: '1px 1px 2px black',
    display: 'table',
    width: '100%',
    margin: 0
  }}>
    <div style={{
      display: 'table-cell',
      verticalAlign: 'middle',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: 900, margin: 'auto' }}>
        <img src={logo} alt='Logo' />
        <h1 className='display-1'>{title}</h1>
        <p className='lead'>{description}</p>
        <p className='lead'>
          {buttons.map(({ link, color, icon, text }) => (
            <span key={link}>
              <Button color={color} href={link}>
                <FontAwesomeIcon icon={icon} /> {text}
              </Button>
              {' '}
            </span>
          ))}
        </p>
        <p className='lead'>
          <Button size='sm' color='secondary'
            href='https://github.com/runelite/runelite/stargazers'>
            {stars} <FontAwesomeIcon icon={faStar} />
          </Button>{' '}
          Latest release: <b>{release || 'unknown'}</b>
        </p>
      </div>
    </div>
  </Jumbotron>
)

export default Hero
