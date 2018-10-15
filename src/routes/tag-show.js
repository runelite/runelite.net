import { Component, h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import { getReleases, latestReleaseSelector } from '../modules/git'
import { getItemInfo } from '../modules/runelite'
import { connect } from 'preact-redux'
import './tag-show.css'

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
              const item = items.find(i => i.id === parseInt(id, 10)) || {}
              const name = item.name || ''
              const nameSan = name.replace(' ', '_')

              return (
                <div class="card">
                  <a
                    href={`https://oldschool.runescape.wiki/w/${nameSan}`}
                    title={name}
                  >
                    <img
                      class="card-img-top"
                      alt={name}
                      title={name}
                      src={`https://api.runelite.net/runelite-${
                        version.name
                      }/cache/item/${id}/image`}
                    />
                  </a>
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
    const parts = csv.split(',')
    const name = parts.shift()
    const icon = parts.shift()

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
