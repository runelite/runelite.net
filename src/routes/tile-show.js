import { h, Fragment } from 'preact'
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
  ImageOverlay,
  useMap
} from 'react-leaflet'
import './tile.scss'

const MAP_HEIGHT_PX = 296704
const RS_TILE_WIDTH_PX = 32
const RS_TILE_HEIGHT_PX = 32
const RS_OFFSET_X = 1152
const RS_OFFSET_Y = 8328
const BOUNDS_TOLERANCE = 4
const RS_CENTER_X = 8
const MIN_ZOOM = 8
const MAX_ZOOM = 11

const fromLatLng = (map, latLng) => {
  const point = map.project(latLng, MAX_ZOOM)
  point.x += RS_CENTER_X * 2
  let y = MAP_HEIGHT_PX - point.y + RS_TILE_HEIGHT_PX / 4
  y = Math.round((y - RS_TILE_HEIGHT_PX) / RS_TILE_HEIGHT_PX) + RS_OFFSET_Y
  const x =
    Math.round((point.x - RS_TILE_WIDTH_PX) / RS_TILE_WIDTH_PX) + RS_OFFSET_X
  return { x, y }
}

const toLatLng = (map, x, y) => {
  x = (x - RS_OFFSET_X) * RS_TILE_WIDTH_PX + RS_TILE_WIDTH_PX / 4
  y = MAP_HEIGHT_PX - (y - RS_OFFSET_Y) * RS_TILE_HEIGHT_PX
  x -= RS_CENTER_X
  const latLng = map.unproject(L.point(x, y), MAX_ZOOM)
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
    label: tile['label'],
    color: jsColor
  }
}

const TileLayerHandler = ({ tiles }) => (
  <TileLayer
    url="https://raw.githubusercontent.com/Explv/osrs_map_tiles/master/{plane}/{z}/{x}/{y}.png"
    noWrap={true}
    tms={true}
    plane={tiles[0].z}
  />
)

const TileMapHandler = ({ tiles }) => {
  const map = useMap()
  const tilesX = tiles.map(t => t.x)
  const tilesY = tiles.map(t => t.y)
  const minX = Math.min(...tilesX) - BOUNDS_TOLERANCE
  const maxX = Math.max(...tilesX) + BOUNDS_TOLERANCE
  const minY = Math.min(...tilesY) - BOUNDS_TOLERANCE
  const maxY = Math.max(...tilesY) + BOUNDS_TOLERANCE
  const minCorner = toLatLng(map, minX, minY)
  const maxCorner = toLatLng(map, maxX, maxY)
  const viewport = [minCorner, maxCorner]

  map.fitBounds(viewport)
  map.setMaxBounds(viewport)

  if (!map.mouseRect) {
    map.mouseRect = L.rectangle(
      [
        [0, 0],
        [0, 0]
      ],
      {
        color: '#FFFFFF',
        fillColor: '#FFFFFF',
        fillOpacity: 0.3,
        weight: 1,
        interactive: false
      }
    )

    map.mouseRect.addTo(map)

    map.on('mousemove', function (e) {
      const mousePos = fromLatLng(map, e.latlng)
      map.mouseRect.setBounds([
        toLatLng(map, mousePos.x, mousePos.y),
        toLatLng(map, mousePos.x + 1, mousePos.y + 1)
      ])
    })
  }

  if (!map.resetButton) {
    map.resetButton = new L.Control({ position: 'topleft' })
    map.resetButton.onAdd = map => {
      const container = L.DomUtil.create(
        'div',
        'leaflet-bar leaflet-control leaflet-control-zoom'
      )
      const button = L.DomUtil.create('a', 'fas fa-redo', container)

      L.DomEvent.disableClickPropagation(button).addListener(
        button,
        'click',
        () => map.fitBounds(viewport),
        button
      )

      return container
    }

    map.resetButton.addTo(map)
  }

  return tiles.map(tile => {
    const pos = toLatLng(map, tile.x, tile.y)
    const pos2 = toLatLng(map, tile.x + 1, tile.y + 1)
    const bounds = [pos, pos2]
    return (
      <Fragment>
        {tile.label && (
          <ImageOverlay bounds={bounds} url={'/img/tile-text.png'} />
        )}
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
      </Fragment>
    )
  })
}

const TileMap = ({ tiles }) => {
  if (!tiles || tiles.length === 0) {
    return null
  }

  return (
    <MapContainer
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
      zoom={(MAX_ZOOM + MIN_ZOOM) / 2}
    >
      <TileLayerHandler tiles={tiles} />
      <TileMapHandler tiles={tiles} />
    </MapContainer>
  )
}

const TileShow = ({ data, tiles }) => {
  return (
    <Layout>
      <Meta title={`Tile markers - ${hero.title}`} description={data} />
      <section id="tiles">
        <div class="content-section tag-container">
          <h1 class="page-header">Tile markers</h1>
          <TileMap tiles={tiles.map(mapTile)} />
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
