import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCoffee, faHeart } from '@fortawesome/fontawesome-free-solid'
import Layout from './layout'

const Footer = () => (
  <div>
    <hr />
    <Layout>
      Developed with <FontAwesomeIcon icon={faHeart} /> and <FontAwesomeIcon icon={faCoffee} /> using{' '}
      <a href='https://getbootstrap.com/'>Bootstrap</a>, <a href='https://reactjs.org/'>React</a> and{' '}
      <a href='https://fontawesome.com/'>Font Awesome</a>
    </Layout>
  </div>
)

export default Footer
