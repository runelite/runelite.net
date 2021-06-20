import { h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import { setActiveTile } from '../modules/tile'
import { connect } from 'react-redux'
import './tag.css'

const Tile = ({ activeTile, setActiveTile }) => (
  <Layout>
    <Meta
      title={`Select tile markers - ${hero.title}`}
      description="Paste tile markers code exported from RuneLite here"
    />
    <section id="tiles">
      <div class="content-section tag-container">
        <div class="page-header">
          <h1>Enter tile markers</h1>
          <p class="text-muted">
            Paste tile markers exported from RuneLite and click 'GO'
          </p>
        </div>

        <textarea
          rows="5"
          class="form-control"
          placeholder="Enter your tile markers here"
          onChange={event => setActiveTile(event.target.value)}
        >
          {activeTile}
        </textarea>
        <a
          class="btn btn-block btn-success"
          href={`/tile/show/#${btoa(activeTile)}`}
        >
          Go
        </a>
      </div>
    </section>
  </Layout>
)

const mapStateToProps = state => ({ activeTile: state.tile.activeTile })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setActiveTile }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Tile)
