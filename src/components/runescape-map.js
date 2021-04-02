import { h, Fragment } from 'preact'
import { point, rectangle, Control, DomUtil, DomEvent } from 'leaflet'
import {
  MapContainer,
  TileLayer,
  Rectangle,
  Tooltip,
  ImageOverlay,
  useMap
} from 'react-leaflet'
import './runescape-map.scss'

// lat/lng calculations source
// https://github.com/Explv/Explv.github.io/blob/master/js/model/Position.js
const MAP_HEIGHT_PX = 296704
const RS_TILE_WIDTH_PX = 32
const RS_TILE_HEIGHT_PX = 32
const RS_OFFSET_X = 1152
const RS_OFFSET_Y = 8328
const BOUNDS_TOLERANCE = 4
const MIN_ZOOM = 6
const MAX_ZOOM = 11
const DEFAULT_ZOOM = 8
const RS_CENTER_X = 8
const DEFAULT_VIEW = [3225, 3219]

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
  const latLng = map.unproject(point(x, y), MAX_ZOOM)
  return [latLng.lat, latLng.lng]
}

const prepareMap = map => {
  const defaultView = toLatLng(map, DEFAULT_VIEW[0], DEFAULT_VIEW[1])
  map.setView(defaultView)

  const mouseRect = rectangle(
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

  mouseRect.addTo(map)

  map.on('mousemove', e => {
    const mousePos = fromLatLng(map, e.latlng)
    mouseRect.setBounds([
      toLatLng(map, mousePos.x, mousePos.y),
      toLatLng(map, mousePos.x + 1, mousePos.y + 1)
    ])
  })

  const resetButton = new Control({ position: 'topleft' })
  resetButton.onAdd = map => {
    const container = DomUtil.create(
      'div',
      'leaflet-bar leaflet-control leaflet-control-zoom'
    )
    const button = DomUtil.create('a', 'fas fa-redo', container)

    DomEvent.disableClickPropagation(button).addListener(
      button,
      'click',
      () =>
        map.viewport
          ? map.fitBounds(map.viewport)
          : map.setView(defaultView, DEFAULT_ZOOM),
      button
    )

    return container
  }

  resetButton.addTo(map)
}

const TileLayerHandler = ({ plane }) => (
  <TileLayer
    url="https://raw.githubusercontent.com/Explv/osrs_map_tiles/master/{plane}/{z}/{x}/{y}.png"
    noWrap={true}
    tms={true}
    plane={plane}
  />
)

const TileMapHandler = ({ tiles }) => {
  const map = useMap()

  if (tiles.length > 0) {
    const tilesX = tiles.map(t => t.x)
    const tilesY = tiles.map(t => t.y)
    const minX = Math.min(...tilesX) - BOUNDS_TOLERANCE
    const maxX = Math.max(...tilesX) + BOUNDS_TOLERANCE
    const minY = Math.min(...tilesY) - BOUNDS_TOLERANCE
    const maxY = Math.max(...tilesY) + BOUNDS_TOLERANCE
    const minCorner = toLatLng(map, minX, minY)
    const maxCorner = toLatLng(map, maxX, maxY)
    const viewport = [minCorner, maxCorner]

    map.viewport = viewport
    map.fitBounds(viewport)
    map.setMaxBounds(viewport)
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
            weight: 1,
            interactive: false
          }}
        >
          {tile.label && <Tooltip>{tile.label}</Tooltip>}
        </Rectangle>
      </Fragment>
    )
  })
}

const RuneScapeMap = ({ tiles }) => {
  if (!tiles) {
    tiles = []
  }

  const plane = tiles.length > 0 ? tiles[0].z : 0

  return (
    <MapContainer
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
      zoom={DEFAULT_ZOOM}
      attributionControl={false}
      whenCreated={prepareMap}
    >
      <TileLayerHandler plane={plane} />
      <TileMapHandler tiles={tiles} />
    </MapContainer>
  )
}

export default RuneScapeMap
