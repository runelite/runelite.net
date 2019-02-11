import { Component, h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import { fetchReleases, getLatestRelease } from '../modules/git'
import { fetchItemInfo } from '../modules/item'
import { connect } from 'preact-redux'
import '../components/tooltip.css'
import './tag.css'

const formatIcon = icon =>
  `https://static.runelite.net/cache/item/icon/${icon}.png`

class TagShow extends Component {
  componentDidMount() {
    this.props
      .fetchReleases()
      .then(() => this.props.fetchItemInfo(this.props.itemIds))
  }

  render({ name, icon, itemIds, items, version, csv }) {
    return (
      <div>
        <Meta title={`${name} tag tab - ${hero.title}`} />
        <Layout class="tag-container">
          <h1>
            <img alt="" src={formatIcon(icon)} /> {name}
          </h1>
          <hr />
          <div class="row">
            <pre class="pre-select">{csv}</pre>
            {itemIds.map(id => {
              const item = items.find(i => i.id === id) || {}
              const name = item.name || ''
              const examine = item.examine || ''
              const nameSan = name.replace(' ', '_')

              return (
                <div class="card">
                  <div class="tooltip-tag">
                    <a href={`https://oldschool.runescape.wiki/w/${nameSan}`}>
                      <img
                        class="card-img-top"
                        alt={name}
                        src={formatIcon(id)}
                      />
                    </a>
                    <div class="tooltip-tag-text">
                      <b>{item.name || 'Loading...'}</b>
                      <br />
                      <small>{examine}</small>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Layout>
      </div>
    )
  }
}

export default connect(
  (state, { csv }) => {
    let parts = csv.split(',')
    const name = parts.shift()
    const icon = parts.shift()
    parts = parts.map(id => Math.abs(parseInt(id, 10))).sort((a, b) => a - b)

    return {
      name,
      icon,
      itemIds: parts,
      items: state.item || [],
      version: getLatestRelease(state)
    }
  },
  dispatch => bindActionCreators({ fetchReleases, fetchItemInfo }, dispatch)
)(TagShow)
