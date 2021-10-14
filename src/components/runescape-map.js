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
const MIN_PLANE = 0
const MAX_PLANE = 3

const MainTileLayer = TileLayer.extend({
  initialize: function (url, options) {
    this._url = url
    this.originalPlane = options.plane
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

  resetPlane: function () {
    this.setPlane(this.originalPlane)
  },

  setPlane: function (plane) {
    const original = this.getPlane()
    plane = Math.max(plane, this.options.minPlane)
    plane = Math.min(plane, this.options.maxPlane)

    if (plane === original) {
      return
    }

    this.options.plane = plane

    if (this._map) {
      this._map.fire('planechange')
    }

    this.redraw()
  },

  getPlane: function () {
    return this.options.plane
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
      button.textContent = region
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
      () => {
        if (map.viewport) {
          map.fitBounds(map.viewport)
        } else {
          map.setView(defaultView, DEFAULT_ZOOM)
        }

        map.tileLayer.resetPlane()
      }
    )

    return container
  }

  resetButton.addTo(map)

  const planeButtons = new Control({ position: 'topright' })
  planeButtons.onAdd = map => {
    const container = DomUtil.create('div', 'leaflet-bar leaflet-control')
    const upButton = DomUtil.create('a', 'fas fa-sort-amount-up-alt', container)
    const label = DomUtil.create('span', 'leaflet-custom-control', container)
    const downButton = DomUtil.create('a', 'fas fa-sort-amount-down', container)

    const updateButtons = () => {
      if (!map.tileLayer) {
        return
      }

      label.textContent = map.tileLayer.getPlane()

      if (map.tileLayer.getPlane() === map.tileLayer.options.maxPlane) {
        DomUtil.addClass(upButton, 'leaflet-disabled')
      } else {
        DomUtil.removeClass(upButton, 'leaflet-disabled')
      }

      if (map.tileLayer.getPlane() === map.tileLayer.options.minPlane) {
        DomUtil.addClass(downButton, 'leaflet-disabled')
      } else {
        DomUtil.removeClass(downButton, 'leaflet-disabled')
      }
    }

    updateButtons()
    map.on('planechange', updateButtons)

    DomEvent.disableClickPropagation(upButton).addListener(
      upButton,
      'click',
      () => {
        map.tileLayer.setPlane(map.tileLayer.getPlane() + 1)
      }
    )

    DomEvent.disableClickPropagation(downButton).addListener(
      downButton,
      'click',
      () => {
        map.tileLayer.setPlane(map.tileLayer.getPlane() - 1)
      }
    )

    return container
  }

  planeButtons.addTo(map)

  if (map.viewport) {
    map.fitBounds(map.viewport)
  }
}

const TileMapHandler = ({ tiles, selected, plane }) => {
  const map = useMap()

  if (!map.tileLayer) {
    map.tileLayer = new MainTileLayer(
      'https://raw.githubusercontent.com/mejrs/layers_osrs/master/{source}/-1/{zoom}/{plane}_{x}_{y}.png',
      {
        noWrap: true,
        plane: plane,
        minPlane: MIN_PLANE,
        maxPlane: MAX_PLANE,
        source: 'mapsquares',
        minZoom: MIN_ZOOM,
        maxNativeZoom: MAX_NATIVE_ZOOM,
        maxZoom: MAX_ZOOM,
        errorTileUrl:
          'https://raw.githubusercontent.com/mejrs/mejrs.github.io/master/layers/alpha_pixel.png'
      }
    )

    map.tileLayer.addTo(map)
  }

  map.tileLayer.originalPlane = plane
  map.tileLayer.setPlane(plane)

  if (selected.length > 0) {
    const tilesX = selected.map(t => t.x)
    const tilesY = selected.map(t => t.y)
    const minX = Math.min(...tilesX) - BOUNDS_TOLERANCE
    const maxX = Math.max(...tilesX) + BOUNDS_TOLERANCE
    const minY = Math.min(...tilesY) - BOUNDS_TOLERANCE
    const maxY = Math.max(...tilesY) + BOUNDS_TOLERANCE
    const minCorner = toLatLng(minX, minY)
    const maxCorner = toLatLng(maxX, maxY)
    const viewport = [minCorner, maxCorner]

    map.viewport = viewport
    map.fitBounds(viewport)
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

const RuneScapeMap = ({ tiles, selected }) => {
  if (!tiles) {
    tiles = []
  }

  if (!selected) {
    selected = tiles
  }

  tiles = tiles.map(mapTile)
  selected = selected.map(mapTile)

  const plane = selected.length > 0 ? selected[0].z || 0 : 0

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
        <TileMapHandler tiles={tiles} selected={selected} plane={plane} />
      </MapContainer>
    </Fragment>
  )
}

export default RuneScapeMap
