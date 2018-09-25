import { h } from 'preact'
import './navigation.css'
import hero from '../_data/hero'
import { Link } from 'preact-router'

const Navigation = ({ stars, dark }) => (
  <nav
    class={
      'navbar navbar-expand-lg fixed-top ' +
      (dark ? 'navbar-transparent' : 'navbar-dark')
    }
  >
    <Link class="navbar-brand" activeClassName="active" href="/">
      <img src={hero.logo} class="icon" alt="Logo" />
    </Link>
    <input type="checkbox" id="navbar-check-box" />
    <label for="navbar-check-box" class="navbar-toggler">
      <span class="navbar-toggler-icon" />
    </label>
    <div class="collapse navbar-collapse" id="navbar">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <Link class="nav-link" activeClassName="active" href="/features">
            Features
          </Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://github.com/runelite">
            GitHub
          </a>
        </li>
        <li class="nav-item">
          <Link class="nav-link" activeClassName="active" href="/blog">
            Blog
          </Link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown">
            API
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a
              class="dropdown-item"
              href="https://static.runelite.net/api/runelite-api/"
            >
              RuneLite API
            </a>
            <a
              class="dropdown-item"
              href="https://static.runelite.net/api/runelite-client/"
            >
              RuneLite Client API
            </a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://github.com/runelite/runelite/wiki">
            Wiki
          </a>
        </li>
        <li class="nav-item">
          <a href="/" role="button" class="btn btn-primary btn-sm">
            Download
          </a>
        </li>
      </ul>
    </div>
  </nav>
)

export default Navigation
