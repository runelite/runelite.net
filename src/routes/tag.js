import { Component, h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import './tag.css'
import { setActiveTag } from '../modules/tag'
import { connect } from 'preact-redux'

class Tag extends Component {
  render({ activeTag, setActiveTag }) {
    return (
      <div>
        <Meta title={`Select tag tab - ${hero.title}`} />
        <Layout>
          <h5>
            Enter tag <br />
            <small class="text-muted">
              Paste a tag exported from Runelite's Bank Tags plugin and click
              'GO'
            </small>
          </h5>
          <hr />
          <textarea
            rows="5"
            class="form-control"
            onChange={event => setActiveTag(event.target.value)}
          >
            {activeTag}
          </textarea>
          <a class="btn btn-block btn-success" href={`/tag/show/${activeTag}`}>
            Go
          </a>
        </Layout>
      </div>
    )
  }
}

export default connect(
  state => ({ activeTag: state.tag.activeTag }),
  dispatch => bindActionCreators({ setActiveTag }, dispatch)
)(Tag)
