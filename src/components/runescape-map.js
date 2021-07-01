import { h, Fragment } from 'preact'
import {
  rectangle,
  setOptions,
  Control,
  DomUtil,
  DomEvent,
  TileLayer,
  Util,
  CRS
} from 'leaflet'
import {
  MapContainer,
  Rectangle,
  Tooltip,
  ImageOverlay,
  useMap
} from 'react-leaflet'
import regions from '../_data/regions'
import './runescape-map.scss'

const BOUNDS_TOLERANCE = 4
const MIN_ZOOM = -4
const MAX_ZOOM = 8
const MAX_NATIVE_ZOOM = 2
const DEFAULT_ZOOM = 0
const DEFAULT_VIEW = [3225, 3219]

const MainTileLayer = TileLayer.extend({
  initialize: function (url, options) {
    this._url = url
    setOptions(this, options)
  },

  getTileUrl: function (coords) {
    return Util.template(this._url, {
      source: this.options.source,
      mapId: -1,
      zoom: coords.z,
      plane: this.options.plane,
      x: coords.x,
      y: -(1 + coords.y)
    })
  },

  createTile: function (coords, done) {
    let tile = TileLayer.prototype.createTile.call(this, coords, done)
    tile.onerror = error => error.preventDefault()
    return tile
  }
})

const fromLatLng = latLng => {
  return {
    x: parseInt(latLng.lng),
    y: parseInt(latLng.lat)
  }
}

const toLatLng = (x, y) => {
  return [y, x]
}

const findCurrentRegion = map => {
  const center = map.getCenter()
  const rsCenter = fromLatLng(center)
  const rsRegion = ((rsCenter.x >> 6) << 8) | (rsCenter.y >> 6)

  for (const region of regions) {
    if (region.regions.includes(rsRegion)) {
      return region.name
    }
  }

  return ''
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

const prepareMap = map => {
  const defaultView = toLatLng(DEFAULT_VIEW[0], DEFAULT_VIEW[1])
  map.setView(defaultView)
  map.locked = true

  const mouseRect = rectangle(
    [
      [0, 0],
      [1, 1]
    ],
    {
      color: '#1e1e1e',
      fillColor: '#1e1e1e',
      fillOpacity: 0.3,
      weight: 1,
      interactive: false
    }
  )

  mouseRect.addTo(map)

  map.on('mousemove', e => {
    const mousePos = fromLatLng(e.latlng)
    mouseRect.setBounds([
      toLatLng(mousePos.x, mousePos.y),
      toLatLng(mousePos.x + 1, mousePos.y + 1)
    ])
  })

  const locationControl = new Control({ position: 'topright' })
  locationControl.onAdd = map => {
    const container = DomUtil.create('div', 'leaflet-bar leaflet-control')

    const button = DomUtil.create('span', 'leaflet-custom-control', container)
    const updateButton = () => {
      const region = findCurrentRegion(map)
      button.hidden = !region
      button.innerHTML = region
    }

    updateButton()
    map.on('move', updateButton)
    return container
  }

  locationControl.addTo(map)

  const resetButton = new Control({ position: 'topleft' })
  resetButton.onAdd = map => {
    const container = DomUtil.create('div', 'leaflet-bar leaflet-control')
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

  const lockButton = new Control({ position: 'topleft' })
  lockButton.onAdd = map => {
    const container = DomUtil.create('div', 'leaflet-bar leaflet-control')
    const button = DomUtil.create('a', 'fas fa-lock', container)

    DomEvent.disableClickPropagation(button).addListener(
      button,
      'click',
      () => {
        if (map.locked) {
          map.setMaxBounds(defaultView)
          map.locked = false
          DomUtil.removeClass(button, 'fa-lock')
          DomUtil.addClass(button, 'fa-lock-open')
        } else if (map.viewport) {
          map.fitBounds(map.viewport)
          map.setMaxBounds(map.viewport)
          map.locked = true
          DomUtil.removeClass(button, 'fa-lock-open')
          DomUtil.addClass(button, 'fa-lock')
        }
      }
    )

    return container
  }

  lockButton.addTo(map)
}

const TileMapHandler = ({ tiles, plane }) => {
  const map = useMap()

  const layer = new MainTileLayer(
    'https://raw.githubusercontent.com/mejrs/mejrs.github.io/master/layers/{source}/-1/{zoom}/{plane}_{x}_{y}.png',
    {
      noWrap: true,
      plane: plane,
      source: 'map_squares_osrs',
      minZoom: MIN_ZOOM,
      maxNativeZoom: MAX_NATIVE_ZOOM,
      maxZoom: MAX_ZOOM,
      errorTileUrl:
        'https://raw.githubusercontent.com/mejrs/mejrs.github.io/master/layers/alpha_pixel.png'
    }
  )

  if (map.tileLayer) {
    map.tileLayer.removeFrom(map)
  }

  map.tileLayer = layer
  map.tileLayer.addTo(map).bringToBack()

  if (tiles.length > 0) {
    const tilesX = tiles.map(t => t.x)
    const tilesY = tiles.map(t => t.y)
    const minX = Math.min(...tilesX) - BOUNDS_TOLERANCE
    const maxX = Math.max(...tilesX) + BOUNDS_TOLERANCE
    const minY = Math.min(...tilesY) - BOUNDS_TOLERANCE
    const maxY = Math.max(...tilesY) + BOUNDS_TOLERANCE
    const minCorner = toLatLng(minX, minY)
    const maxCorner = toLatLng(maxX, maxY)
    const viewport = [minCorner, maxCorner]

    map.viewport = viewport
    map.fitBounds(viewport)

    if (map.locked || map.locked === undefined) {
      map.setMaxBounds(viewport)
    }
  }

  return tiles.map(tile => {
    const pos = toLatLng(tile.x, tile.y)
    const pos2 = toLatLng(tile.x + 1, tile.y + 1)
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

  tiles = tiles.map(mapTile)

  const plane = tiles.length > 0 ? tiles[0].z : 0

  return (
    <Fragment>
      <MapContainer
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        maxBounds={[
          [-1000, -1000],
          [12800 + 1000, 12800 + 1000]
        ]}
        maxBoundsViscosity={0.5}
        zoom={DEFAULT_ZOOM}
        attributionControl={false}
        whenCreated={prepareMap}
        crs={CRS.Simple}
      >
        <TileMapHandler tiles={tiles} plane={plane} />
      </MapContainer>
    </Fragment>
  )
}

export default RuneScapeMap
