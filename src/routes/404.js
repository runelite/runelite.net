/** @jsx h */
import { h } from 'preact'
import hero from '../_data/hero'
import Link from '../components/link'
import Meta from '../components/meta'

const Error404 = () => (
  <div
    style={{
      backgroundImage: 'url(/img/cat.jpg)',
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
        <p class='lead'>
          Sorry, page was not found Click <Link routeName='home'>here</Link> to
          return to home page.
        </p>
      </div>
    </div>
  </div>
)

export default Error404
