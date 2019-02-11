import { Component, h } from 'preact'

const buildSlayerTask = slayerTask => {
  if (!slayerTask.hasTask) {
    return <noscript />
  }

  return (
    <div class="card">
      <div class="card-header">
        <img class="icon" alt="" src="/img/skillicons/slayer.png" /> Slayer Task
      </div>
      <div class="card-body">
        <h5 class="card-title">
          {slayerTask.name}
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

const buildKillCounters = killCounts => {
  if (killCounts.length === 0) {
    return <noscript />
  }

  return (
    <div class="card">
      <div class="card-header">
        <img class="icon" alt="" src="/img/skillicons/attack.png" /> Kill
        Counters
      </div>
      <ul class="list-group">
        {killCounts.map(e => (
          <li class="list-group-item d-flex justify-content-between align-items-center">
            {e.name}
            <span class="badge badge-primary badge-pill">{e.count}</span>
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

  render({ slayerTask, killCounts }) {
    return (
      <div>
        {buildSlayerTask(slayerTask)}
        <br />
        {buildKillCounters(killCounts)}
      </div>
    )
  }
}

export default Home
