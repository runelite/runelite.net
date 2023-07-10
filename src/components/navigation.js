import { h } from 'preact'
import './navigation.css'
import hero from '../_data/hero'
import links from '../_data/links'
import { Link } from 'preact-router'
import { getChristmasImage } from '../season'

function toggleMenu() {
  const nav = document.getElementsByClassName('navbar-collapse')[0]
  const curDisplay = nav.style.display
  const isHidden = curDisplay === 'none' || curDisplay === ''
  nav.style.display = isHidden ? 'block' : 'none'
}

const Navigation = ({ dark, login, loggedIn, username }) => (
  <nav class={'navbar navbar-expand-lg fixed-top navbar-dark'}>
    <Link
      onClick={toggleMenu}
      class="navbar-brand"
      activeClassName="active"
      href="/"
    >
      <img src={getChristmasImage(hero.logo)} class="icon" alt="RuneLite" />{' '}
    </Link>
    <input type="checkbox" id="navbar-check-box" />
    <label for="navbar-check-box" class="navbar-toggler">
      <span class="navbar-toggler-icon" onClick={toggleMenu} />
    </label>
    <div class="collapse navbar-collapse" id="navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link
            onClick={toggleMenu}
            class="nav-link"
            activeClassName="active"
            href="/features"
          >
            Features
          </Link>
        </li>
        <li class="nav-item">
          <Link
            onClick={toggleMenu}
            class="nav-link"
            activeClassName="active"
            href="/blog"
          >
            Blog
          </Link>
        </li>
        <li class="nav-item">
          <Link
            onClick={toggleMenu}
            class="nav-link"
            activeClassName="active"
            href="/pulse"
          >
            Pulse
          </Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://github.com/runelite/runelite/wiki">
            Wiki
          </a>
        </li>
        <li class="nav-item dropdown">
          {/* eslint-disable-next-line */}
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
          <Link
            onClick={toggleMenu}
            class="nav-link"
            activeClassName="active"
            href="/tag"
          >
            Tags
          </Link>
        </li>
        <li class="nav-item">
          <Link
            onClick={toggleMenu}
            class="nav-link"
            activeClassName="active"
            href="/tile"
          >
            Tile markers
          </Link>
        </li>
        <li class="nav-item">
          <Link
            onClick={toggleMenu}
            class="nav-link"
            activeClassName="active"
            href="/plugin-hub"
          >
            Plugin Hub
          </Link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href={links.patreon}>
            Become a patron
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link nav-icon"
            href="https://runelite.net/discord"
            title="Discord"
          >
            <i class="fab fa-discord" />
            <span class="d-lg-none"> Discord</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-icon" href={links.twitter} title="Twitter">
            <i class="fab fa-twitter" />
            <span class="d-lg-none"> Twitter</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-icon" href={links.github} title="GitHub">
            <i class="fab fa-github" />
            <span class="d-lg-none"> GitHub</span>
          </a>
        </li>
        <li class="nav-item" onClick={toggleMenu}>
          {loggedIn ? (
            <a class="nav-link" href="/account/home">
              <i class="fas fa-user fa-fw" /> {username}
            </a>
          ) : (
            <form class="form-inline">
              <button class="btn btn-primary" type="button" onClick={login}>
                Login
              </button>
            </form>
          )}
        </li>
      </ul>
    </div>
  </nav>
)

export default Navigation
