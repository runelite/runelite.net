import React from 'react'
import { Helmet } from 'react-helmet'
import { NavLink } from 'redux-first-router-link'
import hero from '../_data/hero'

const Error404 = (store) => (
  <div style={{
    backgroundImage: 'url(/img/cat.jpg)',
    display: 'table',
    width: '100%',
    height: '100%',
    boxShadow: 'inset 0 0 5rem rgba(0,0,0,.5)'
  }}>
    <Helmet>
      <title>404 - {hero.title}</title>
    </Helmet>
    <div style={{
      display: 'table-cell',
      verticalAlign: 'middle'
    }}>
      <div style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        fontWeight: 700
      }}>
        <h1>
          404
        </h1>
        <p className='lead'>
          Sorry, page was not found
          Click <NavLink to='/'>here</NavLink> to return to home page.
        </p>
      </div>
    </div>
  </div>
)

export default Error404
