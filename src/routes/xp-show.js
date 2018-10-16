import Highcharts from 'highcharts'
import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { Link } from 'preact-router'
import { bindActionCreators } from 'redux'
import dayjs from 'dayjs'
import './xp-show.css'
import Layout from '../components/layout'
import { getReleases } from '../modules/git'
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

function isNumeric(value) {
  return !isNaN(value - parseFloat(value))
}

function parseDate(date, from) {
  if (date === 'now') {
    date = new Date()
  } else if (!isNumeric(date)) {
    const parsed = date.match(/(\d+)(\w+)/)
    date = dayjs(from)
      .subtract(parsed[1], parsed[2])
      .toDate()
  } else {
    date = new Date(parseInt(date, 10))
  }

  return date
}

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1)
const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const createValueBadge = (value, suffix) =>
  value >= 0 ? (
    <span class="badge badge-success">
      +{numberWithCommas(value)} {suffix}
    </span>
  ) : (
    <span class="badge badge-danger">
      {numberWithCommas(value)} {suffix}
    </span>
  )

const safeDate = date => date || new Date()

class XpShow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      skillRank: null,
      skillXp: null,
      allRanks: null,
      allXp: null,
      startDate: new Date(),
      endDate: new Date()
    }
  }

  componentDidMount() {
    const endDate = safeDate(parseDate(this.props.end, new Date()))
    const startDate = safeDate(parseDate(this.props.start, endDate))

    this.setState({
      startDate,
      endDate,
      skillRank: Highcharts.chart('skill-rank', {
        title: {
          text: ''
        },
        yAxis: {
          title: null,
          endOnTick: false
        },
        credits: {
          enabled: false
        },
        xAxis: {
          title: {
            text: ''
          },
          labels: false
        },

        plotOptions: {
          line: {
            tooltip: {
              pointFormat:
                '<span style="color:{point.color}">●</span> Rank: <b>{point.y}</b><br/>'
            }
          }
        },

        series: [{ showInLegend: false }]
      }),
      skillXp: Highcharts.chart('skill-xp', {
        title: {
          text: ''
        },
        yAxis: {
          title: null,
          endOnTick: false
        },
        credits: {
          enabled: false
        },
        xAxis: {
          title: {
            text: ''
          },
          labels: false
        },

        plotOptions: {
          line: {
            tooltip: {
              pointFormat:
                '<span style="color:{point.color}">●</span> XP: <b>{point.y}</b><br/>'
            }
          }
        },

        series: [{ showInLegend: false }]
      }),
      allRanks: Highcharts.chart('all-ranks', {
        chart: {
          type: 'column'
        },
        title: {
          text: null
        },
        xAxis: {
          title: {
            text: ''
          },
          labels: false
        },
        yAxis: {
          title: null,
          endOnTick: false
        },
        credits: {
          enabled: false
        },
        series: [
          {
            type: 'column',
            colorByPoint: true,
            showInLegend: false
          }
        ],
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0.01,
            clip: false,
            tooltip: {
              pointFormat:
                '<span style="color:{point.color}">●</span> Ranks: <b>{point.y}</b><br/>'
            }
          }
        }
      }),
      allXp: Highcharts.chart('all-xp', {
        chart: {
          type: 'column'
        },
        title: {
          text: null
        },
        xAxis: {
          title: {
            text: ''
          },
          labels: false
        },
        yAxis: {
          title: null,
          endOnTick: false
        },
        credits: {
          enabled: false
        },
        series: [
          {
            type: 'column',

            colorByPoint: true,
            showInLegend: false
          }
        ],
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0.01,
            clip: false,
            tooltip: {
              pointFormat:
                '<span style="color:{point.color}">●</span> XP: <b>{point.y}</b><br/>'
            }
          }
        }
      })
    })

    this.props.getReleases().then(() =>
      this.props.getXpRange({
        skill: this.props.skill,
        name: this.props.name,
        start: startDate,
        end: endDate
      })
    )
  }

  componentWillReceiveProps({ skillRank, skillXp, allRanks, allXp }) {
    // this.state.skillRank.update(skillRank)
    // this.state.skillXp.update(skillXp)
    // this.state.allRanks.update(allRanks)
    // this.state.allXp.update(allXp)

    this.state.skillXp.update({
      xAxis: [{ categories: skillXp.labels }],
      series: [{ data: skillXp.series[0].map(obj => obj.value) }]
    })

    this.state.skillRank.update({
      xAxis: [{ categories: skillRank.labels }],
      series: [{ data: skillRank.series[0].map(obj => obj.value) }]
    })

    this.state.allRanks.update({
      xAxis: [{ categories: allRanks.labels }],
      series: [{ data: allRanks.series[0].map(obj => obj.value) }]
    })

    this.state.allXp.update({
      xAxis: [{ categories: allXp.labels }],
      series: [{ data: allXp.series[0].map(obj => obj.value) }]
    })
  }

  componentWillUnmount() {
    this.state.skillRank.detach()
    this.state.skillXp.detach()
    this.state.allRanks.detach()
    this.state.allXp.detach()
  }

  render({ name, skill, ranks }) {
    return (
      <Layout>
        <Meta title={`Experience Tracker - ${hero.title}`} />
        <h1>
          {name} /{' '}
          <small class="text-muted">
            {skill} / {this.state.startDate.toDateString().toLowerCase()} /{' '}
            {this.state.endDate.toDateString().toLowerCase()}
          </small>
        </h1>
        <hr />
        <div class="row">
          <div class="col-xl-3 col-md-4 col-sm-12 col-xs-12">
            <ul class="list-group">
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
                  <span class="d-md-none d-lg-inline">
                    {capitalizeFirstLetter(playerSkill)}
                  </span>
                  <span class="float-right">
                    {createValueBadge(rank, '')} {createValueBadge(xp, 'xp')}
                  </span>
                </Link>
              ))}
            </ul>
          </div>
          <div class="col-xl-9 col-md-8 col-sm-12 col-xs-12">
            <h5>
              <small>Total experience gained</small>
            </h5>
            <div id="all-xp" class="ct-chart" style={{ height: 175 }} />
            <h5>
              <small>Total ranks gained</small>
            </h5>
            <div id="all-ranks" class="ct-chart" style={{ height: 175 }} />
            <h5>
              <small>{capitalizeFirstLetter(skill)} ranks</small>
            </h5>
            <div id="skill-rank" class="ct-chart" style={{ height: 375 }} />
            <h5>
              <small>{capitalizeFirstLetter(skill)} experience</small>
            </h5>
            <div id="skill-xp" class="ct-chart" style={{ height: 375 }} />
          </div>
        </div>
      </Layout>
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
  dispatch => bindActionCreators({ getReleases, getXpRange }, dispatch)
)(XpShow)
