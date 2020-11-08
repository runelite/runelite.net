import { h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import './tag.css'
import { setActiveTag } from '../modules/tag'
import { connect } from 'react-redux'

const Tag = ({ activeTag, setActiveTag }) => (
  <Layout>
    <Meta
      title={`Select tag tab - ${hero.title}`}
      description="Paste tag code exported from RuneLite Bank Tags plugin here"
    />
    <section id="tags">
      <div class="content-section tag-container">
        <div class="page-header">
          <h1>Enter tag</h1>
          <p class="text-muted">
            Paste a tag exported from RuneLite Bank Tags plugin and click 'GO'
          </p>
        </div>

        <textarea
          rows="5"
          class="form-control"
          placeholder="Enter your tags here"
          onChange={event => setActiveTag(event.target.value)}
        >
          {activeTag}
        </textarea>
        <a class="btn btn-block btn-success" href={`/tag/show/${activeTag}`}>
          Go
        </a>
      </div>
    </section>
  </Layout>
)

const mapStateToProps = state => ({ activeTag: state.tag.activeTag })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setActiveTag }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Tag)
