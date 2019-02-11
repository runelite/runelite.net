import { Component, h } from 'preact'
import ago from 's-ago'

const formatIcon = id =>
  `https://services.runescape.com/m=itemdb_oldschool/obj_big.gif?id=${id}`
const formatGePage = id =>
  `http://services.runescape.com/m=itemdb_oldschool/viewitem?obj=${id}`
const formatBadge = buy =>
  buy ? (
    <span class="badge badge-danger badge-pill">Bought</span>
  ) : (
    <span class="badge badge-success badge-pill">Sold</span>
  )

const buildRecord = record => (
  <a
    href={formatGePage(record.itemId)}
    class="list-group-item list-group-item-action flex-column align-items-start"
  >
    <div class="d-flex w-100">
      <div style={{ position: 'absolute', bottom: 5, right: 5 }}>
        {formatBadge(record.buy)}
      </div>
      <div class="d-block">
        <img
          alt={record.name}
          class="img-fluid"
          style={{ height: 60, width: 60 }}
          src={formatIcon(record.itemId)}
        />
      </div>
      <div>
        <h5>
          <b>{record.quantity}</b>x {record.name}
        </h5>
        <p class="mb-0">
          <b>{record.buy ? 'Bought' : 'Sold'}</b> for{' '}
          <b>{record.price * record.quantity}</b> gp (<b>{record.price}</b>{' '}
          gp/ea)
        </p>
      </div>
      <div class="ml-auto">
        <small class="d-block">{ago(record.date)}</small>
      </div>
    </div>
  </a>
)

class GrandExchange extends Component {
  componentDidMount() {
    this.props.getReleases().then(() => this.props.fetchGe())
  }

  render({ ge }) {
    return <ul class="list-group list-group-small">{ge.map(buildRecord)}</ul>
  }
}

export default GrandExchange
