import { Component, h } from 'preact'

const buildDrop = drop => (
  <div class="col">
    {drop.id} - {drop.qty}
  </div>
)

const buildLootRecord = record => (
  <li class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{record.eventId}</h5>
      <small>{record.type}</small>
    </div>
    <div class="mb-1 row">{record.drops.map(buildDrop)}</div>
  </li>
)

class LootTracker extends Component {
  componentDidMount() {
    this.props.fetchReleases().then(() => this.props.fetchLoot())
  }

  render({ loot }) {
    return <ul class="list-group">{loot.map(buildLootRecord)}</ul>
  }
}

export default LootTracker
