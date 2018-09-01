/** @jsx h */
import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import Chart from '../../node_modules/chart.js/src/chart'
import Layout from '../components/layout'
import {
  allRanksSelector,
  allXpSelector,
  nameSelector,
  skillRankSelector,
  skillXpSelector,
  ranksSelector,
  skillSelector
} from '../modules/runelite'
import hero from '../_data/hero'
import Meta from '../components/meta'
import Link from '../components/link'

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

    this.state = {
      skillRank: null,
      skillXp: null,
      allRanks: null,
      allXp: null
    }
  }

  componentWillReceiveProps ({ skillRank, skillXp, allRanks, allXp }) {
    this.componentWillUnmount()
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

  componentWillUnmount () {
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

  render ({ startDate, endDate, playerName, playerSkill, ranks }) {
    return (
      <div style={{ height: 'inherit' }}>
        <Layout fullWidth>
          <Meta title={`Experience Tracker - ${hero.title}`} />
          <h1>
            {playerName} /{' '}
            <small class='text-muted'>
              {playerSkill} /{' '}
              {safeDate(startDate)
                .toDateString()
                .toLowerCase()}{' '}
              /{' '}
              {safeDate(endDate)
                .toDateString()
                .toLowerCase()}
            </small>
          </h1>
          <hr />
          <div class='row'>
            <div class='col-md-3 col-sm-4 col-xs-12'>
              <ul class='list-group'>
                {ranks.map(({ skill, rank, xp }) => (
                  <Link
                    class={
                      'list-group-item list-group-item-action' +
                      (skill === playerSkill ? ' active' : '')
                    }
                    key={skill}
                    routeName='xp-show'
                    routeParams={{
                      skill,
                      name: playerName,
                      start: safeDate(startDate).getTime(),
                      end: safeDate(endDate).getTime()
                    }}
                  >
                    <img alt={skill} src={`/img/skillicons/${skill}.png`} />{' '}
                    {capitalizeFirstLetter(skill)}
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

export default connect((state, props) => ({
  startDate: state.runelite.start,
  endDate: state.runelite.end,
  playerName: nameSelector(state, props) || props.name,
  playerSkill: skillSelector(state, props) || props.skill,
  ranks: ranksSelector(state, props),
  skillRank: skillRankSelector(state, props),
  skillXp: skillXpSelector(state, props),
  allRanks: allRanksSelector(state, props),
  allXp: allXpSelector(state, props),
  xpRange: state.runelite
}))(XpShow)
