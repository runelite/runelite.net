import { h, Fragment } from 'preact'
import '@gouch/to-title-case'
import { bindActionCreators } from 'redux'
import {
  fetchConfig,
  getTileMarkers,
  getTileMarkersFilter,
  setTileMarkersFilter
} from '../../modules/config'
import { connect } from 'react-redux'
import prepare from '../../components/prepare'
import { fetchBootstrap } from '../../modules/bootstrap'
import '../../components/tooltip.css'
import Choice from '../../components/choice'
import RuneScapeMap from '../../components/runescape-map'

const tileName = t => t.name + ' (' + t.region + ')'

const Tiles = ({ tiles, filter, setTileMarkersFilter }) => {
  if (tiles.length === 0) {
    return null
  }

  const choices = tiles.map(tileName)
  filter = filter || choices[0]
  const mapTiles = tiles.find(t => tileName(t) === filter).data
  const mapData = JSON.stringify(mapTiles)

  return (
    <Fragment>
      <div class="mb-2">
        <Choice
          prefix=""
          value={filter}
          choices={choices}
          onClick={setTileMarkersFilter}
        />
      </div>
      <RuneScapeMap tiles={mapTiles} />
      <pre class="pre-select">{mapData}</pre>
    </Fragment>
  )
}

const mapStateToProps = (state, props) => ({
  ...props,
  tiles: getTileMarkers(state),
  filter: getTileMarkersFilter(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBootstrap,
      fetchConfig,
      setTileMarkersFilter
    },
    dispatch
  )

const prepareComponentData = async ({
  fetchBootstrap,
  fetchConfig,
  fetchItems
}) => {
  await fetchBootstrap()
  await fetchConfig()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(Tiles))
