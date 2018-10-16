import { Component, h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import { getReleases, latestReleaseSelector } from '../modules/git'
import { getItemInfo } from '../modules/runelite'
import { connect } from 'preact-redux'
import '../components/tooltip.css'
import './tag.css'

class TagShow extends Component {
  componentDidMount() {
    this.props
      .getReleases()
      .then(() => this.props.getItemInfo(this.props.itemIds))
  }

  render({ name, icon, itemIds, items, version, csv }) {
    return (
      <div>
        <Meta title={`${name} tag tab - ${hero.title}`} />
        <Layout>
          <h1>
            <img
              alt={''}
              src={`https://api.runelite.net/runelite-${
                version.name
              }/cache/item/${icon}/image`}
            />{' '}
            {name}
          </h1>
          <hr />
          <div class="row">
            <pre>{csv}</pre>
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
                        src={`https://api.runelite.net/runelite-${
                          version.name
                        }/cache/item/${id}/image`}
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
    parts = parts.map(id => parseInt(id, 10)).sort((a, b) => a - b)

    return {
      name,
      icon,
      itemIds: parts,
      items: state.runelite.items || [],
      version: latestReleaseSelector(state)
    }
  },
  dispatch => bindActionCreators({ getReleases, getItemInfo }, dispatch)
)(TagShow)
