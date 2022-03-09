import { h, Fragment } from 'preact'
import '../../components/tooltip.css'
import './loot-tracker.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import prepare from '../../components/prepare'
import { wikiURLForItem } from '../../util'
import SearchBar from '../../components/search-bar'
import { fetchBootstrap } from '../../modules/bootstrap'
import { fetchPrices } from '../../modules/prices'
import { fetchItems } from '../../modules/item'
import {
  fetchConfig,
  getFilteredLoot,
  getLootFilter,
  setLootFilter
} from '../../modules/config'

const getRlIcon = id => `https://static.runelite.net/cache/item/icon/${id}.png`

const glyphMap = {
  1: { x: 0, y: 0, w: 5 },
  2: { x: 5, y: 0, w: 7 },
  3: { x: 12, y: 0, w: 6 },
  4: { x: 18, y: 0, w: 6 },
  5: { x: 24, y: 0, w: 6 },
  6: { x: 30, y: 0, w: 7 },
  7: { x: 37, y: 0, w: 6 },
  8: { x: 43, y: 0, w: 7 },
  9: { x: 50, y: 0, w: 7 },
  0: { x: 57, y: 0, w: 7 },
  M: { x: 0, y: 10, w: 8 },
  K: { x: 8, y: 10, w: 7 },
  '%': { x: 15, y: 10, w: 7 },
  '-': { x: 22, y: 10, w: 5 },
  '+': { x: 27, y: 10, w: 7 },
  '/': { x: 37, y: 10, w: 5 },
  '*': { x: 39, y: 10, w: 7 },
  '=': { x: 46, y: 0, w: 6 },
  '^': { x: 52, y: 10, w: 5 },
  '(': { x: 57, y: 10, w: 4 },
  ')': { x: 60, y: 10, w: 4 }
}

const quantityNums = ['', 'K', 'M']

const numToQuantity = num => {
  let l = 0
  while (num > 9999) {
    num /= 1000
    l++
  }

  const si = quantityNums[l]
  const str = ~~num + si
  return [str, si]
}

const buildQuantity = num => {
  let [str, si] = numToQuantity(num)
  return (
    num > 1 && (
      <span class={`rs-item-quantity rs-item-quantity-${si || 'none'}`}>
        {[...str]
          .map(g => glyphMap[g])
          .filter(g => !!g)
          .map(g => (
            <span
              class="rs-item-quantity-number"
              style={{
                width: g.w,
                backgroundPositionX: -g.x,
                backgroundPositionY: -g.y
              }}
            />
          ))}
      </span>
    )
  )
}

const buildDrop = drop => (
  <div class="drop-wrapper">
    {buildQuantity(drop.qty)}
    <div class="tooltip-tag">
      <a href={wikiURLForItem(drop)}>
        <img
          class="card-img-top rs-icon"
          alt={drop.id}
          src={getRlIcon(drop.id)}
        />
      </a>
      <div class="tooltip-tag-text">
        <b>{drop.name}</b> <small>({formatPrice(drop.price)} gp)</small>
      </div>
    </div>
  </div>
)

const formatPrice = price => {
  let [str] = numToQuantity(price)
  return str
}

const buildLootRecord = record => (
  <div class="card loot-card">
    <div class="card-header">
      {record.name} <span class="small">x {record.count}</span>
      <span class="small float-right">{formatPrice(record.price)} gp</span>
    </div>
    <div class="card-body pt-0 pb-0 record-body">
      <div class="row drop-row">{record.drops.map(buildDrop)}</div>
    </div>
  </div>
)

const handleChange = (event, setLootFilter) => setLootFilter(event.target.value)

const LootTracker = ({ loot, lootFilter, setLootFilter }) => (
  <Fragment>
    <SearchBar
      value={lootFilter}
      onInput={e => handleChange(e, setLootFilter)}
    />
    <div class="card-columns">{loot.map(buildLootRecord)}</div>
  </Fragment>
)

const mapStateToProps = (state, props) => ({
  ...props,
  loot: getFilteredLoot(state),
  lootFilter: getLootFilter(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBootstrap,
      fetchPrices,
      fetchItems,
      fetchConfig,
      setLootFilter
    },
    dispatch
  )

const prepareComponentData = async ({
  fetchBootstrap,
  fetchPrices,
  fetchItems,
  fetchConfig
}) => {
  await fetchBootstrap()
  await fetchPrices()
  await fetchItems()
  await fetchConfig()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(LootTracker))
