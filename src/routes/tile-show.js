import { h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { connect } from 'react-redux'
import '../components/tooltip.css'
import './tag.css'
import L from 'leaflet'
import {
  MapContainer,
  TileLayer,
  Rectangle,
  Tooltip,
  useMap
} from 'react-leaflet'
import './tile.scss'

const MAP_HEIGHT_PX = 296704
const RS_TILE_WIDTH_PX = 32
const RS_TILE_HEIGHT_PX = 32
const RS_OFFSET_X = 1152
const RS_OFFSET_Y = 8328

const toLatLng = (map, x, y) => {
  x = (x - RS_OFFSET_X) * RS_TILE_WIDTH_PX + RS_TILE_WIDTH_PX / 4
  y = MAP_HEIGHT_PX - (y - RS_OFFSET_Y) * RS_TILE_HEIGHT_PX
  x -= 8
  const latLng = map.unproject(L.point(x, y), map.getMaxZoom())
  return [latLng.lat, latLng.lng]
}

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
  const intColor = tile['color']['value']
  const jsColor = intColor ? toColor(intColor) : '#33b5e5'

  const x = ((regionId >>> 8) << 6) + regionX
  const y = ((regionId & 0xff) << 6) + regionY
  const z = tile['z']

  return {
    x,
    y,
    z,
    label: tile['label'],
    color: jsColor
  }
}

const TileMapHandler = ({ tiles }) => {
  const map = useMap()

  if (!tiles) {
    return null
  }

  map.eachLayer(l => {
    if (l instanceof L.TileLayer) {
      l.options.plane = tiles[0].z
      l.redraw()
    }
  })

  map.setView(toLatLng(map, tiles[0].x, tiles[0].y))

  return tiles.map(tile => {
    const pos = toLatLng(map, tile.x, tile.y)
    const pos2 = toLatLng(map, tile.x + 1, tile.y + 1)
    const bounds = [pos, pos2]
    return (
      <Rectangle
        bounds={bounds}
        pathOptions={{
          color: tile.color,
          fillColor: tile.color,
          fillOpacity: 0.3,
          weight: 1
        }}
      >
        {tile.label && <Tooltip>{tile.label}</Tooltip>}
      </Rectangle>
    )
  })
}

const TileMap = ({ tiles }) => (
  <MapContainer minZoom={4} maxZoom={11} zoom={10}>
    <TileLayer
      url="https://raw.githubusercontent.com/Explv/osrs_map_tiles/master/{plane}/{z}/{x}/{y}.png"
      noWrap={true}
      tms={true}
      plane={0}
    />
    <TileMapHandler tiles={tiles} />
  </MapContainer>
)

const TileShow = ({ data, tiles }) => {
  return (
    <Layout>
      <Meta title={`Tile markers - ${hero.title}`} description={data} />
      <section id="tiles">
        <div class="content-section tag-container">
          <pre class="pre-select">{data}</pre>
          <TileMap tiles={tiles.map(mapTile)} />
        </div>
      </section>
    </Layout>
  )
}

const mapStateToProps = (state, { b64 }) => {
  const decodedData = atob(b64)
  const jsonData = JSON.parse(decodedData)

  return {
    data: decodedData,
    tiles: jsonData
  }
}

export default connect(mapStateToProps)(TileShow)
