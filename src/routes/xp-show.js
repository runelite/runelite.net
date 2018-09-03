/** @jsx h */
import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import Chart from '../../node_modules/chart.js/src/chart'
import Layout from '../components/layout'
import {
  allRanksSelector,
  allXpSelector,
  skillRankSelector,
  skillXpSelector,
  ranksSelector,
  getXpRange
} from '../modules/runelite'
import hero from '../_data/hero'
import Meta from '../components/meta'
import { bindActionCreators } from 'redux'
import { Link } from 'preact-router'
import moment from 'moment'

Chart.defaults.global.animation = false
Chart.defaults.global.tooltips.callbacks.label = tooltipItem =>
  numberWithCommas(tooltipItem.yLabel.toString())

const straightLineGraphOption = {
  elements: {
    line: {
      tension: 0
    }
  }
}

const reverseGraphOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          reverse: true
        }
      }
    ]
  },
  ...straightLineGraphOption
}

function isNumeric (value) {
  return !isNaN(value - parseFloat(value))
}

function parseDate (date, from) {
  if (date === 'now') {
    date = new Date()
  } else if (!isNumeric(date)) {
    const parsed = date.match(/(\d+)(\w+)/)
    date = moment(from)
      .subtract(parsed[1], parsed[2])
      .toDate()
  } else {
    date = new Date(parseInt(date, 10))
  }

  return date
}

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1)
const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const createValueBadge = (value, suffix) =>
  value >= 0 ? (
    <span class='badge badge-success'>
      +{numberWithCommas(value)} {suffix}
    </span>
  ) : (
    <span class='badge badge-danger'>
      {numberWithCommas(value)} {suffix}
    </span>
  )

const safeDate = date => date || new Date()

class XpShow extends Component {
  constructor (props) {
    super(props)
    this.destroyCharts.bind(this)

    this.state = {
      skillRank: null,
      skillXp: null,
      allRanks: null,
      allXp: null,
      startDate: new Date(),
      endDate: new Date()
    }
  }

  destroyCharts () {
    if (this.state.skillRank) {
      this.state.skillRank.destroy()
    }

    if (this.state.skillXp) {
      this.state.skillXp.destroy()
    }

    if (this.state.allRanks) {
      this.state.allRanks.destroy()
    }

    if (this.state.allXp) {
      this.state.allXp.destroy()
    }
  }

  componentWillReceiveProps ({
    skillRank,
    skillXp,
    allRanks,
    allXp,
    start,
    end
  }) {
    this.destroyCharts()

    this.setState({
      skillRank: new Chart('skill-rank', {
        type: 'line',
        data: skillRank,
        options: reverseGraphOptions
      }),
      skillXp: new Chart('skill-xp', {
        type: 'line',
        data: skillXp,
        options: straightLineGraphOption
      }),
      allRanks: new Chart('all-ranks', {
        type: 'bar',
        data: allRanks
      }),
      allXp: new Chart('all-xp', {
        type: 'bar',
        data: allXp
      })
    })
  }

  componentDidMount () {
    const startDate = safeDate(parseDate(this.props.start, new Date()))
    const endDate = safeDate(parseDate(this.props.end, startDate))

    this.setState({
      startDate,
      endDate
    })

    this.props.getXpRange({
      skill: this.props.skill,
      name: this.props.name,
      start: startDate,
      end: endDate
    })
  }

  componentWillUnmount () {
    this.destroyCharts()
  }

  render ({ name, skill, ranks }) {
    return (
      <div style={{ height: 'inherit' }}>
        <Layout fullWidth>
          <Meta title={`Experience Tracker - ${hero.title}`} />
          <h1>
            {name} /{' '}
            <small class='text-muted'>
              {skill} / {this.state.startDate.toDateString().toLowerCase()} /{' '}
              {this.state.endDate.toDateString().toLowerCase()}
            </small>
          </h1>
          <hr />
          <div class='row'>
            <div class='col-md-3 col-sm-4 col-xs-12'>
              <ul class='list-group'>
                {ranks.map(({ skill: playerSkill, rank, xp }) => (
                  <Link
                    class={
                      'list-group-item list-group-item-action' +
                      (skill === playerSkill ? ' active' : '')
                    }
                    key={playerSkill}
                    href={`/xp/show/${playerSkill}/${name}/${this.state.startDate.getTime()}/${this.state.endDate.getTime()}`}
                  >
                    <img
                      alt={playerSkill}
                      src={`/img/skillicons/${playerSkill}.png`}
                    />{' '}
                    {capitalizeFirstLetter(playerSkill)}
                    <br />
                    {createValueBadge(rank, 'ranks')}{' '}
                    {createValueBadge(xp, 'xp')}
                  </Link>
                ))}
              </ul>
            </div>
            <div class='col-md-9 col-sm-8 col-xs-12'>
              <canvas id='skill-rank' />
              <canvas id='skill-xp' />
              <canvas id='all-xp' />
              <canvas id='all-ranks' />
            </div>
          </div>
        </Layout>
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    ranks: ranksSelector(state, props),
    skillRank: skillRankSelector(state, props),
    skillXp: skillXpSelector(state, props),
    allRanks: allRanksSelector(state, props),
    allXp: allXpSelector(state, props)
  }),
  dispatch => bindActionCreators({ getXpRange }, dispatch)
)(XpShow)
