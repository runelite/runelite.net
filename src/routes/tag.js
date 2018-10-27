import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { bindActionCreators } from 'redux'

import './tag.css'
import { setActiveTag } from '../modules/tag'
import { setMetaDetails } from '../utilities/meta-utils'
import hero from '../_data/hero'
import Layout from '../components/layout'
import TagForm from '../components/tag/Form'
import TagHeader from '../components/tag/Header'

class Tag extends Component {
  constructor(props) {
    super(props)
    setMetaDetails({ title: `Select tag tab - ${hero.title}` })
  }

  render({ setActiveTag, activeTag }) {
    return (
      <div>
        <Layout class="tag-container">
          <TagHeader />
          <hr />
          <TagForm setActiveTag={setActiveTag} activeTag={activeTag} />
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = ({ tag }) => ({ activeTag: tag.activeTag })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setActiveTag }, dispatch)

export { Tag }
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tag)
