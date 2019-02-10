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
          <li class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{e.name}</h5>
              <small>{e.count}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

class Home extends Component {
  componentDidMount() {
    this.props.getReleases().then(() => this.props.fetchConfig())
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
