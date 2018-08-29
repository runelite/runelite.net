import React from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'redux-first-router-link'
import hero from '../_data/hero'
import links from '../_data/links'
import {stargazersSelector} from '../redux/modules/git'

const Navigation = ({ stars, dark }) => (
  <nav className={'navbar navbar-expand-md fixed-top ' + (dark ? 'navbar-dark' : 'navbar-light bg-white')} style={{
    background: dark ? 'linear-gradient(rgba(0,0,0,0.7) 40%, transparent)' : ''
  }}>
    <NavLink className='navbar-brand' to='/'><img src={hero.logo} alt='Logo' width='30' height='30' /> Home</NavLink>
    <input type='checkbox' id='navbar-toggle-cbox' />
    <label for='navbar-toggle-cbox' className='navbar-toggler' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
      <span className='navbar-toggler-icon' />
    </label>
    <div className='collapse navbar-collapse' id='navbar'>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/features'><i className='fas fa-cogs' /> Features</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/blog'><i className='fas fa-newspaper' /> Blog</NavLink>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='https://github.com/runelite/runelite/wiki'><i className='fas fa-file-alt' /> Wiki</a>
        </li>
        <li className='nav-item dropdown'>
          <a className='nav-link dropdown-toggle' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            <i className='fas fa-font' /> API
          </a>
          <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
            <a className='dropdown-item' href='https://static.runelite.net/api/runelite-api/'>RuneLite API</a>
            <a className='dropdown-item' href='https://static.runelite.net/api/runelite-client/'>RuneLite Client API</a>
          </div>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href={links.discord}><i className='fab fa-discord' /> Discord</a>
        </li>
      </ul>
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <a className='nav-link' href={links.patreon}><i className='fab fa-patreon' /> Become a patron</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='https://github.com/runelite'><i className='fab fa-github' /> GitHub</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='https://github.com/runelite/runelite/stargazers'>
            <i className='fas fa-star' /> {stars} Stargazers
          </a>
        </li>
      </ul>
    </div>
  </nav>
)

export default connect(
  (state, props) => ({
    stars: stargazersSelector(state, props),
    ...state.navigation
  })
)(Navigation)
