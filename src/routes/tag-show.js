import { Component, h } from 'preact'
import { groupBy } from 'ramda'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import { getReleases, latestReleaseSelector } from '../modules/git'
import { getItemInfo } from '../modules/runelite'
import { connect } from 'preact-redux'
import '../components/tooltip.css'
import './tag.css'

const formatIcon = icon =>
  `https://static.runelite.net/cache/item/icon/${icon}.png`

const getCategory = item => {
  const menu = item.interfaceOptions

  if (!menu) {
    return ''
  }

  if (
    item.name.indexOf(' arrow') !== -1 ||
    item.name.indexOf(' bolt') !== -1 ||
    item.name.indexOf(' rune') !== -1 ||
    item.name.indexOf(' dart') !== -1
  ) {
    return 'Ammo'
  }

  if (menu.indexOf('Drink') !== -1) {
    return 'Food'
  }

  if (menu.indexOf('Eat') !== -1) {
    return 'Food'
  }

  if (menu.indexOf('Wear') !== -1) {
    return 'Gear'
  }

  if (menu.indexOf('Wield') !== -1) {
    return 'Gear'
  }

  return ''
}

const sanitizeItem = (items, id) => {
  const item = items.find(i => i.id === id) || {}
  const name = item.name || ''
  const examine = item.examine || ''

  return {
    ...item,
    id,
    name,
    examine
  }
}

const flattenMap = map =>
  Object.keys(map).map(key => ({
    name: key,
    values: map[key]
  }))

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
        <Layout class="tag-container">
          <h1>
            <img alt="" src={formatIcon(icon)} /> {name}
          </h1>
          <hr />
          <pre>{csv}</pre>
          {flattenMap(
            groupBy(item => getCategory(item))(
              itemIds.map(id => sanitizeItem(items, id))
            )
          ).map(group => (
            <div>
              <p>{group.name}</p>
              <div class="row">
                {group.values.map(item => (
                  <div class="card">
                    <div class="tooltip-tag">
                      <a
                        href={`https://oldschool.runescape.wiki/w/${item.name.replace(
                          ' ',
                          '_'
                        )}`}
                      >
                        <img
                          class="card-img-top"
                          alt={item.id}
                          src={formatIcon(item.id)}
                        />
                      </a>
                      <div class="tooltip-tag-text">
                        <b>{item.name || 'Loading...'}</b>
                        <br />
                        <small>{item.examine}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
