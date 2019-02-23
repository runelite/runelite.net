import { Component, h } from 'preact'
import '../tooltip.css'

const getRlIcon = id =>
  `https://static.runelite.net/cache/item/icon/${parseInt(id, 10)}.png`

const buildDrop = drop => (
  <div style={{ border: 'none', position: 'relative' }}>
    <span
      style={{
        position: 'absolute',
        left: 4,
        top: -2,
        color: 'yellow',
        textShadow: 'black 1px 1px',
        fontSize: 'small'
      }}
    >
      {drop.qty}
    </span>
    <div class="tooltip-tag">
      <a href={`https://oldschool.runescape.wiki/w/${drop.name}`}>
        <img
          class="card-img-top"
          style={{ padding: 2 }}
          alt={drop.id}
          src={getRlIcon(drop.id)}
        />
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
    <div class="card-body pt-0 pb-0" style={{ border: 'none' }}>
      <div
        class="row"
        style={{ marginLeft: -10, paddingTop: 5, paddingBottom: 5 }}
      >
        {record.drops.map(buildDrop)}
      </div>
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
