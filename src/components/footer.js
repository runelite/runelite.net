import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons'

const Footer = () => (
  <div>
    <hr />
    Developed with <FontAwesomeIcon icon={faHeart} /> and <FontAwesomeIcon icon={faCoffee} /> using{' '}
    <a href='https://getbootstrap.com/'>Bootstrap</a>, <a href='https://reactjs.org/'>React</a> and{' '}
    <a href='https://fontawesome.com/'>Font Awesome</a>
  </div>
)

export default Footer
