import { Component, h } from 'preact'
import '../tooltip.css'

const getRlIcon = id =>
  `https://static.runelite.net/cache/item/icon/${parseInt(id, 10)}.png`

const formatIcon = (type, id) => {
  switch (type) {
    case 'NPC':
      return getRlIcon(526) // Bones
    case 'PLAYER':
      return '/img/skillicons/slayer.png'
    case 'EVENT':
      switch (id) {
        case 'Barrows':
          return getRlIcon(19630) // Barrows teleport
        case 'Chambers of Xeric':
          return getRlIcon(20851) // Olmlet
        case 'Theatre of Blood':
          return getRlIcon(22473) // Lil'Zik
        default:
          if (id.startsWith('Clue Scroll')) {
            return getRlIcon(2677) // Easy Clue image
          }
      }
      break
    default:
      return ''
  }
}

const buildDrop = drop => (
  <div class="card" style={{ border: 'none' }}>
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
        <img class="card-img-top p-1" alt={drop.id} src={getRlIcon(drop.id)} />
      </a>
      <div class="tooltip-tag-text">
        <b>{drop.name || 'Loading...'}</b>
      </div>
    </div>
  </div>
)

const buildLootRecord = record => (
  <div class="col-lg-4 mb-4">
    <div class="card">
      <div class="card-header p-1">
        <img
          class="icon"
          alt=""
          src={formatIcon(record.type, record.eventId)}
        />{' '}
        {record.eventId}
      </div>
      <div
        class="card-body pt-0 pb-0"
        style={{ paddingLeft: '15px', border: 'none' }}
      >
        <div class="row">{record.drops.map(buildDrop)}</div>
      </div>
    </div>
  </div>
)

class LootTracker extends Component {
  componentDidMount() {
    this.props.fetchReleases().then(() => this.props.fetchLoot())
  }

  render({ loot }) {
    return <div class="row">{loot.map(buildLootRecord)}</div>
  }
}

export default LootTracker
