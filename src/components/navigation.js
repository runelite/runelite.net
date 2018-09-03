/** @jsx h */
import { h } from 'preact'
import { connect } from 'preact-redux'
import hero from '../_data/hero'
import links from '../_data/links'
import { stargazersSelector } from '../modules/git'
import { Link } from 'preact-router'

const Navigation = ({ stars, dark }) => (
  <nav
    class={
      'navbar navbar-expand-md fixed-top ' +
      (dark ? 'navbar-dark' : 'navbar-light bg-white')
    }
    style={{
      background: dark
        ? 'linear-gradient(rgba(0,0,0,0.7) 40%, transparent)'
        : ''
    }}
  >
    <Link class='navbar-brand' activeClassName='active' href='/'>
      <img src={hero.logo} alt='Logo' width='30' height='30' /> Home
    </Link>
    <input type='checkbox' id='navbar-toggle-cbox' />
    <label
      htmlFor='navbar-toggle-cbox'
      class='navbar-toggler'
      data-toggle='collapse'
      data-target='#navbar'
      aria-expanded='false'
      aria-controls='navbar'
    >
      <span class='navbar-toggler-icon' />
    </label>
    <div class='collapse navbar-collapse' id='navbar'>
      <ul class='navbar-nav'>
        <li class='nav-item'>
          <Link class='nav-link' activeClassName='active' href='/features'>
            <i class='fas fa-cogs' /> Features
          </Link>
        </li>
        <li class='nav-item'>
          <Link class='nav-link' activeClassName='active' href='/blog'>
            <i class='fas fa-newspaper' /> Blog
          </Link>
        </li>
        <li class='nav-item'>
          <a class='nav-link' href='https://github.com/runelite/runelite/wiki'>
            <i class='fas fa-file-alt' /> Wiki
          </a>
        </li>
        <li class='nav-item dropdown'>
          <a
            class='nav-link dropdown-toggle'
            id='navbarDropdown'
            role='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <i class='fas fa-font' /> API
          </a>
          <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
            <a
              class='dropdown-item'
              href='https://static.runelite.net/api/runelite-api/'
            >
              RuneLite API
            </a>
            <a
              class='dropdown-item'
              href='https://static.runelite.net/api/runelite-client/'
            >
              RuneLite Client API
            </a>
          </div>
        </li>
        <li class='nav-item'>
          <a class='nav-link' href={links.discord}>
            <i class='fab fa-discord' /> Discord
          </a>
        </li>
      </ul>
      <ul class='navbar-nav ml-auto'>
        <li class='nav-item'>
          <a class='nav-link' href={links.patreon}>
            <i class='fab fa-patreon' /> Become a patron
          </a>
        </li>
        <li class='nav-item'>
          <a class='nav-link' href='https://github.com/runelite'>
            <i class='fab fa-github' /> GitHub
          </a>
        </li>
        <li class='nav-item'>
          <a
            class='nav-link'
            href='https://github.com/runelite/runelite/stargazers'
          >
            <i class='fas fa-star' /> {stars} Stargazers
          </a>
        </li>
      </ul>
    </div>
  </nav>
)

export default connect((state, props) => ({
  stars: stargazersSelector(state, props),
  ...state.navigation
}))(Navigation)
