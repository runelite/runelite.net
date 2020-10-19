import { h, Fragment } from 'preact'
import ago from 's-ago'
import { numberWithCommas } from '../../util'
import { connect } from 'react-redux'
import {
  fetchGe,
  getGeFilter,
  getGePagination,
  getPageCount,
  getPaginatedGe,
  setGeFilter,
  setGePagination
} from '../../modules/ge'
import { bindActionCreators } from 'redux'
import prepare from '../../components/prepare'
import SearchBar from '../../components/search-bar'
import './grand-exchange.css'
import { fetchBootstrap } from '../../modules/bootstrap'
import Pagination from '../../components/pagination'

const formatGeIcon = id =>
  `https://services.runescape.com/m=itemdb_oldschool/obj_big.gif?id=${id}`
const formatGePage = id =>
  `http://services.runescape.com/m=itemdb_oldschool/viewitem?obj=${id}`

const buildRecord = record => (
  <a
    href={formatGePage(record.itemId)}
    class="list-group-item list-group-item-action flex-column align-items-start"
  >
    <div class="d-flex w-100">
      <img
        alt={record.name}
        class="ge-item-img img-fluid"
        style={{ height: 60, width: 60 }}
        src={formatGeIcon(record.itemId)}
      />
      <div class="ge-record-info">
        <h5>
          {record.name} x {record.quantity}
        </h5>
        <p class="mb-0">
          <img src={`/img/ge_${record.buy ? 'bought' : 'sold'}.png`} alt="" />
          <span>{record.buy ? 'Bought' : 'Sold'}</span> for{' '}
          <span>{numberWithCommas(record.price * record.quantity)}</span> gp (
          <span>{numberWithCommas(record.price)}</span> gp/ea)
        </p>
      </div>
      <div class="ge-record-timestamp ml-auto">
        <small title={record.date} class="d-block">
          {ago(record.date)}
        </small>
      </div>
    </div>
  </a>
)

const handleChange = (event, setGeFilter) =>
  setGeFilter({
    name: event.target.value
  })

const GrandExchange = ({
  ge,
  geFilter,
  gePagination,
  pageCount,
  setGeFilter,
  setGePagination
}) => (
  <Fragment>
    <SearchBar
      value={geFilter.name}
      onInput={e => handleChange(e, setGeFilter)}
    />
    <ul class="ge-records list-group list-group-small">
      {ge.sort((a, b) => b.date - a.date).map(buildRecord)}
    </ul>
    <Pagination
      currentPage={gePagination.page}
      totalPages={pageCount}
      pageNeighbours={6}
      onClick={page =>
        setGePagination({
          page,
          perPage: 100
        })
      }
    />
  </Fragment>
)

const mapStateToProps = (state, props) => ({
  ...props,
  ge: getPaginatedGe(state),
  geFilter: getGeFilter(state),
  gePagination: getGePagination(state),
  pageCount: getPageCount(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBootstrap,
      fetchGe,
      setGeFilter,
      setGePagination
    },
    dispatch
  )

const prepareComponentData = async ({ fetchBootstrap, fetchGe }) => {
  await fetchBootstrap()
  await fetchGe()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(GrandExchange))
