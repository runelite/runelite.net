import { Component, h } from 'preact'

const buildSlayerTask = config => {
  if (!config['slayer.taskName']) {
    return <noscript />
  }

  return (
    <div class="card">
      <div class="card-header">
        <img class="icon" alt="" src="/img/skillicons/slayer.png" /> Slayer Task
      </div>
      <div class="card-body">
        <h5 class="card-title">
          {config['slayer.taskName']}
          <small>
            {!!config['slayer.taskLocation']
              ? ' in ' + config['slayer.taskLocation']
              : ''}
          </small>
        </h5>
        <p class="card-text">
          Start: {config['slayer.initialAmount']}, Remaining:{' '}
          {config['slayer.amount']}
        </p>
        <p class="card-text">
          Streak: {config['slayer.streak']}, Points: {config['slayer.points']}
        </p>
      </div>
    </div>
  )
}

class Home extends Component {
  componentDidMount() {
    this.props.getReleases().then(() => this.props.getConfig())
  }

  render({ config }) {
    return <div>{buildSlayerTask(config)}</div>
  }
}

export default Home
