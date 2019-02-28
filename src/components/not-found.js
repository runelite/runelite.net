import { h } from 'preact'
import hero from '../_data/hero'
import Meta from './meta'
import { Link } from 'preact-router'

const NotFound = () => (
  <div
    style={{
      backgroundImage: 'url(/img/cat.jpg)',
      backgroundSize: 'cover',
      display: 'table',
      width: '100%',
      height: '100%',
      boxShadow: 'inset 0 0 5rem rgba(0,0,0,.5)'
    }}
  >
    <Meta title={`404 - ${hero.title}`} />
    <div
      style={{
        display: 'table-cell',
        verticalAlign: 'middle'
      }}
    >
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          fontWeight: 700
        }}
      >
        <h1>404</h1>
        <p class="lead">
          Page not found. Click <Link href="/">here</Link> to return to home
          page.
        </p>
      </div>
    </div>
  </div>
)

export default NotFound
