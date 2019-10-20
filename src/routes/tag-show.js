import { h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import { fetchItemInfo } from '../modules/item'
import { connect } from 'react-redux'
import '../components/tooltip.css'
import './tag.css'
import prepare from '../components/prepare'
import { wikiURLForItem } from '../util'
import { getLatestRelease } from '../modules/bootstrap'

const formatIcon = icon =>
  `https://static.runelite.net/cache/item/icon/${icon}.png`

const TagShow = ({ name, icon, itemIds, items, version, csv }) => (
  <Layout>
    <Meta title={`${name} tag tab - ${hero.title}`} />
    <section id="tags">
      <div class="content-section tag-container">
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

            return (
              <div class="card">
                <div class="tooltip-tag">
                  <a href={wikiURLForItem(item)}>
                    <img class="card-img-top" alt={name} src={formatIcon(id)} />
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
      </div>
    </section>
  </Layout>
)

const mapStateToProps = (state, { csv }) => {
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
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchItemInfo }, dispatch)

const prepareComponentData = async ({ fetchItemInfo, itemIds }) => {
  await fetchItemInfo(itemIds)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(TagShow))
