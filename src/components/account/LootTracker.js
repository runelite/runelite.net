import { Component, h } from 'preact'
import '../tooltip.css'
import './loot-tracker.css'

const getRlIcon = id => `https://static.runelite.net/cache/item/icon/${id}.png`

const buildDrop = drop => (
  <div class="drop-wrapper">
    <span class="drop-quantity">{drop.qty}</span>
    <div class="tooltip-tag">
      <a href={`https://oldschool.runescape.wiki/w/${drop.name}`}>
        <img class="card-img-top" alt={drop.id} src={getRlIcon(drop.id)} />
      </a>
      <div class="tooltip-tag-text">
        <b>{drop.name || 'Loading...'}</b>
      </div>
    </div>
  </div>
)

const buildLootRecord = record => (
  <div class="card">
    <div class="card-header">
      {record.name}
      <span class="small float-right">x{record.count}</span>
    </div>
    <div class="card-body pt-0 pb-0 record-body">
      <div class="row drop-row">{record.drops.map(buildDrop)}</div>
    </div>
  </div>
)

class LootTracker extends Component {
  componentDidMount() {
    this.props.fetchReleases().then(() => this.props.fetchLoot())
  }

  render({ loot }) {
    return <div class="card-columns">{loot.map(buildLootRecord)}</div>
  }
}

export default LootTracker
