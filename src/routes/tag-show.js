import { h } from 'preact'
import Layout from '../components/layout'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import { fetchItems } from '../modules/item'
import { connect } from 'react-redux'
import '../components/tooltip.css'
import './tag.css'
import prepare from '../components/prepare'
import { formatIcon, wikiURLForItem } from '../util'
import NotFound from '../components/not-found'

const TagShow = ({ name, icon, itemIds, items, csv }) => {
  const itemsToShow = itemIds
    .map(id => items.find(i => i.id === id))
    .filter(i => !!i)

  if (itemsToShow.length === 0) {
    return <NotFound />
  }

  return (
    <Layout>
      <Meta title={`${name} tag tab - ${hero.title}`} description={csv} />
      <section id="tags">
        <div class="content-section tag-container">
          <h1 class="page-header">
            <img alt="" src={formatIcon(icon)} /> {name}
          </h1>

          <pre class="pre-select">{csv}</pre>

          <div class="row pl-2">
            {itemsToShow.map(item => (
              <div class="card">
                <div class="tooltip-tag">
                  <a href={wikiURLForItem(item)}>
                    <img
                      class="card-img-top"
                      alt={item.name}
                      src={formatIcon(item.id)}
                    />
                  </a>
                  <div class="tooltip-tag-text">
                    <b>{item.name || 'Loading...'}</b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

const mapStateToProps = (state, { csv }) => {
  let parts = csv.split(',')
  const name = parts.shift()
  const icon = parts.shift()
  parts = parts.map(id => Math.abs(parseInt(id, 10))).sort((a, b) => a - b)

  return {
    name,
    icon,
    itemIds: parts,
    items: state.item || []
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchItems }, dispatch)

const prepareComponentData = async ({ fetchItems }) => {
  await fetchItems()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(TagShow))
