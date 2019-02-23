import { Component, h } from 'preact'
import '@gouch/to-title-case'
import { toMMSS } from '../../util'
import { bindActionCreators } from 'redux'
import { fetchConfig, getBossLog, getSlayerTask } from '../../modules/config'
import { connect } from 'preact-redux'
import { fetchReleases } from '../../modules/git'

const buildSlayerTask = slayerTask => {
  if (!slayerTask.hasTask) {
    return <noscript />
  }

  return (
    <div class="card">
      <div class="card-header p-1">
        <img class="icon" alt="" src="/img/skillicons/slayer.png" /> Slayer Task
      </div>
      <div class="card-body">
        <h5 class="card-title">
          {slayerTask.name.toTitleCase()}
          <small>
            {slayerTask.location ? ' in ' + slayerTask.location : ''}
          </small>
        </h5>
        <p class="card-text">
          Start: {slayerTask.start}, Remaining: {slayerTask.remaining}
        </p>
        <p class="card-text">
          Streak: {slayerTask.streak}, Points: {slayerTask.points}
        </p>
      </div>
    </div>
  )
}

const buildBossLog = bossLog => {
  if (bossLog.length === 0) {
    return <noscript />
  }

  return (
    <div class="card">
      <div class="card-header p-1">
        <img class="icon" alt="" src="/img/skillicons/attack.png" /> Boss Log
      </div>
      <ul class="list-group">
        {bossLog.map(e => (
          <li class="list-group-item">
            {e.name.toTitleCase()}{' '}
            <div class="float-right">
              Kills: <span class="badge badge-primary badge-pill">{e.kc}</span>{' '}
              {e.pb ? (
                <span>
                  Personal best:{' '}
                  <span class="badge badge-info badge-pill">
                    {toMMSS(e.pb)}
                  </span>
                </span>
              ) : (
                <noscript />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

class Home extends Component {
  componentDidMount() {
    this.props.fetchReleases().then(() => this.props.fetchConfig())
  }

  render({ slayerTask, bossLog }) {
    return (
      <div>
        {buildSlayerTask(slayerTask)}
        <br />
        {buildBossLog(bossLog)}
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    ...props,
    slayerTask: getSlayerTask(state),
    bossLog: getBossLog(state)
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchReleases,
        fetchConfig
      },
      dispatch
    )
)(Home)
