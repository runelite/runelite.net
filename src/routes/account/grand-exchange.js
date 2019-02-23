import { h } from 'preact'
import ago from 's-ago'
import { numberWithCommas } from '../../util'
import { connect } from 'preact-redux'
import {
  fetchGe,
  getFilteredGe,
  getGeFilter,
  setGeFilter
} from '../../modules/ge'
import { bindActionCreators } from 'redux'
import { fetchReleases } from '../../modules/git'
import prepare from '../../components/prepare'

const formatGeIcon = id =>
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
          src={formatGeIcon(record.itemId)}
        />
      </div>
      <div>
        <h5>
          <b>{record.quantity}</b>x {record.name}
        </h5>
        <p class="mb-0">
          <b>{record.buy ? 'Bought' : 'Sold'}</b> for{' '}
          <b>{numberWithCommas(record.price * record.quantity)}</b> gp (
          <b>{numberWithCommas(record.price)}</b> gp/ea)
        </p>
      </div>
      <div class="ml-auto">
        <small class="d-block">{ago(record.date)}</small>
      </div>
    </div>
  </a>
)

const handleChange = (event, setGeFilter) =>
  setGeFilter({
    name: event.target.value
  })

const GrandExchange = ({ ge, geFilter, setGeFilter }) => (
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <i class="fas fa-search" />
        </span>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="Search..."
        value={geFilter.name}
        onInput={e => handleChange(e, setGeFilter)}
      />
    </div>
    <ul class="list-group list-group-small">
      {ge.sort((a, b) => b.date - a.date).map(buildRecord)}
    </ul>
  </div>
)

const mapStateToProps = (state, props) => ({
  ...props,
  ge: getFilteredGe(state),
  geFilter: getGeFilter(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchReleases,
      fetchGe,
      setGeFilter
    },
    dispatch
  )

const prepareComponentData = async ({ fetchReleases, fetchGe }) => {
  await fetchReleases()
  await fetchGe()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(GrandExchange))
