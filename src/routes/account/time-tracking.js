import { h, Fragment } from 'preact'
import '@gouch/to-title-case'
import { bindActionCreators } from 'redux'
import { fetchConfig } from '../../modules/config'
import { connect } from 'react-redux'
import prepare from '../../components/prepare'
import { fetchBootstrap } from '../../modules/bootstrap'
import '../../components/tooltip.css'
import '../tag.css'
import { getTimeTracking } from '../../modules/time-tracking'
import { formatIcon } from '../../util'
import '../../components/tooltip.css'
import './time-tracking.css'

const buildProgress = ({
  minimumValue,
  maximumValue,
  value,
  visible,
  foreground,
  background
}) => {
  if (!visible) {
    return <noscript />
  }

  const span = maximumValue - minimumValue
  const currentValue = value - minimumValue
  const pc = currentValue / span
  const width = 100
  const progressFill = width * Math.min(1, pc)
  return (
    <div
      class="progress w-100"
      style={{
        backgroundColor: background
      }}
    >
      <div
        class="progress-bar"
        role="progressbar"
        style={{
          width: progressFill + '%',
          backgroundColor: foreground
        }}
      ></div>
    </div>
  )
}

const buildTracker = panel => (
  <li class="list-group-item w-100">
    <div class="d-flex align-self-stretch tooltip-tag">
      <div class="tooltip-tag-text">
        <b>{panel.tooltipText}</b>
      </div>
      <div class="m-2">
        <img alt="" src={formatIcon(panel.icon)} />
      </div>
      <div class="w-100">
        <h5 class="card-title">
          {panel.title + ' '}
          {panel.subtitle && <small class="text-muted">{panel.subtitle}</small>}
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">{panel.estimateText}</h6>
        {buildProgress(panel.progress)}
      </div>
    </div>
  </li>
)

const buildTab = tab => (
  <div class="card mb-3" id={tab.name}>
    <div class="card-header">
      <img alt="" src={formatIcon(tab.icon)} />
      <a href={'#' + tab.name}>{tab.name}</a>
    </div>
    <ul class="list-group w-100">{tab.panels.map(buildTracker)}</ul>
  </div>
)

const buildTopTab = tab => (
  <div class="card tooltip-tag">
    <a href={'#' + tab.name}>
      <img alt="" class="card-img-top" src={formatIcon(tab.icon)} />
    </a>
    <div class="tooltip-tag-text">
      <b>{tab.name}</b>
    </div>
  </div>
)

const TimeTracking = ({ timeTracking }) => (
  <Fragment>
    <div class="row pl-2 pb-1 tracking-container">
      {timeTracking.map(buildTopTab)}
    </div>
    {timeTracking.map(buildTab)}
  </Fragment>
)

const mapStateToProps = (state, props) => ({
  ...props,
  timeTracking: getTimeTracking(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBootstrap,
      fetchConfig
    },
    dispatch
  )

const prepareComponentData = async ({ fetchBootstrap, fetchConfig }) => {
  await fetchBootstrap()
  await fetchConfig()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(TimeTracking))
