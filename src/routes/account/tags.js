import { h, Fragment } from 'preact'
import '@gouch/to-title-case'
import { bindActionCreators } from 'redux'
import { fetchConfig, getTags } from '../../modules/config'
import { connect } from 'react-redux'
import prepare from '../../components/prepare'
import { fetchBootstrap } from '../../modules/bootstrap'
import { fetchItems } from '../../modules/item'
import { formatIcon, wikiURLForItem } from '../../util'
import '../../components/tooltip.css'
import '../tag.css'

const buildTag = tag => {
  const csv = [tag.name, tag.icon].concat(tag.items.map(i => i.id)).join(',')

  return (
    <div
      class="content-section tag-container"
      style={{
        margin: 0,
        padding: 0,
        paddingBottom: 15,
        maxWidth: 'initial',
        width: '100%'
      }}
    >
      <h1>
        <img alt="" src={formatIcon(tag.icon)} /> {tag.name}
      </h1>

      <pre class="pre-select">
        {csv}
        <div class="text-right">
          <a href={'/tag/show/' + csv} class="user-select-none">
            Share
          </a>
        </div>
      </pre>
      <div class="row pl-2">
        {tag.items.map(item => {
          const name = item.name || ''
          const id = item.id

          return (
            <div class="card">
              <div class="tooltip-tag">
                <a href={wikiURLForItem(item)}>
                  <img class="card-img-top" alt={name} src={formatIcon(id)} />
                </a>
                <div class="tooltip-tag-text">
                  <b>{item.name || 'Loading...'}</b>
                  <br />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Tags = ({ tags }) => <Fragment>{tags.map(buildTag)}</Fragment>

const mapStateToProps = (state, props) => ({
  ...props,
  tags: getTags(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBootstrap,
      fetchConfig,
      fetchItems
    },
    dispatch
  )

const prepareComponentData = async ({
  fetchBootstrap,
  fetchConfig,
  fetchItems
}) => {
  await fetchBootstrap()
  await fetchConfig()
  await fetchItems()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(Tags))
