import { h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { connect } from 'react-redux'
import RuneScapeMap from '../components/runescape-map'
import './tag.css'
import NotFound from '../components/not-found'

const TileShow = ({ data, tiles }) => {
  if (!tiles || tiles.length === 0) {
    return <NotFound />
  }

  return (
    <Layout>
      <Meta title={`Tile markers - ${hero.title}`} description={data} />
      <section id="tiles">
        <div class="content-section tag-container">
          <RuneScapeMap tiles={tiles} />
          <pre class="pre-select">{data}</pre>
        </div>
      </section>
    </Layout>
  )
}

const mapStateToProps = (state, { b64 }) => {
  let decodedData = ''
  let jsonData = []

  try {
    const b64string = b64 || window.location.hash.substring(1)
    decodedData = atob(b64string)
    jsonData = JSON.parse(decodedData)
  } catch (ignored) {}

  return {
    data: decodedData,
    tiles: jsonData
  }
}

export default connect(mapStateToProps)(TileShow)
