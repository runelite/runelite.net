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
  const allTiles = tiles.flatMap(t => t.data)
  const selectedTiles = tiles.find(t => tileName(t) === filter).data
  const mapData = JSON.stringify(selectedTiles)

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
      <RuneScapeMap tiles={allTiles} selected={selectedTiles} />
      <pre class="pre-select">
        {mapData}
        <div class="text-right">
          <a href={'/tile/show/#' + btoa(mapData)} class="user-select-none">
            Share
          </a>
        </div>
      </pre>
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
