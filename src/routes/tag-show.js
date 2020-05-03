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
import { formatIcon, wikiURLForItem } from '../util'
import { fetchBootstrap, getLatestRelease } from '../modules/bootstrap'

const TagShow = ({ name, icon, itemIds, items, csv }) => (
  <Layout>
    <Meta title={`${name} tag tab - ${hero.title}`} />
    <section id="tags">
      <div class="content-section tag-container">
        <h1 class="page-header">
          <img alt="" src={formatIcon(icon)} /> {name}
        </h1>

        <pre class="pre-select">{csv}</pre>

        <div class="row justify-content-center">
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
  bindActionCreators({ fetchBootstrap, fetchItemInfo }, dispatch)

const prepareComponentData = async ({
  fetchBootstrap,
  fetchItemInfo,
  itemIds
}) => {
  await fetchBootstrap()
  await fetchItemInfo(itemIds)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(TagShow))
