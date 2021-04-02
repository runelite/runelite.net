import { h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { connect } from 'react-redux'
import RuneScapeMap from '../components/runescape-map'
import './tag.css'

const toColor = num => {
  num >>>= 0
  const b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16,
    a = ((num & 0xff000000) >>> 24) / 255
  return 'rgba(' + [r, g, b, a].join(',') + ')'
}

const mapTile = tile => {
  const regionId = tile['regionId']
  const regionX = tile['regionX']
  const regionY = tile['regionY']
  let jsColor = '#ffffff'

  if (tile['color']) {
    const intColor = tile['color']['value']

    if (intColor) {
      jsColor = toColor(intColor)
    } else if (tile['color']) {
      const argb = tile['color']
      jsColor = '#' + argb.slice(3, 9) + argb[1] + argb[2]
    }
  }

  const x = ((regionId >>> 8) << 6) + regionX
  const y = ((regionId & 0xff) << 6) + regionY
  const z = tile['z']

  return {
    x,
    y,
    z,
    region: regionId,
    label: tile['label'],
    color: jsColor
  }
}

const TileShow = ({ data, tiles }) => {
  return (
    <Layout>
      <Meta title={`Tile markers - ${hero.title}`} description={data} />
      <section id="tiles">
        <div class="content-section tag-container">
          <RuneScapeMap tiles={tiles.map(mapTile)} />
          <pre class="pre-select">{data}</pre>
        </div>
      </section>
    </Layout>
  )
}

const mapStateToProps = (state, { b64 }) => {
  const decodedData = atob(b64)
  let jsonData = []

  try {
    jsonData = JSON.parse(decodedData)
  } catch (ignored) {}

  return {
    data: decodedData,
    tiles: jsonData
  }
}

export default connect(mapStateToProps)(TileShow)
