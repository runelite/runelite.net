/** @jsx h */
import 'chartist/dist/chartist.min.css'
import 'chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css'
import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { Link } from 'preact-router'
import { bindActionCreators } from 'redux'
import dayjs from 'dayjs'
import Chartist from 'chartist'
import 'chartist-plugin-tooltips'
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
import skills from '../_data/skills'
import Meta from '../components/meta'

function isNumeric (value) {
  return !isNaN(value - parseFloat(value))
}

function parseDate (date, from) {
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
      allXp: null,
      startDate: new Date(),
      endDate: new Date()
    }
  }

  componentDidMount () {
    const startDate = safeDate(parseDate(this.props.start, new Date()))
    const endDate = safeDate(parseDate(this.props.end, startDate))

    const options = {
      lineSmooth: Chartist.Interpolation.none(),
      axisX: {
        showLabel: false
      },
      chartPadding: {
        top: 30,
        right: 50,
        left: 50
      },
      plugins: [
        Chartist.plugins.tooltip({
          anchorToPoint: true,
          appendToBody: true
        })
      ]
    }

    const invertAxis = {
      axisY: {
        labelInterpolationFnc: value => -value
      },
      plugins: [
        Chartist.plugins.tooltip({
          anchorToPoint: true,
          appendToBody: true,
          transformTooltipTextFnc: value => -value
        })
      ]
    }

    const invertValue = context => {
      context.data.series = context.data.series.map(series =>
        series.map(value => -value)
      )
    }

    const skillColor = context => {
      if (
        context.type === 'line' ||
        context.type === 'bar' ||
        context.type === 'point'
      ) {
        context.element.attr({
          style: `stroke: ${
            skills[context.meta || this.props.skill.toLowerCase()]
          }`
        })
      }
    }

    this.setState({
      startDate,
      endDate,
      skillRank: new Chartist.Line(
        '#skill-rank',
        {},
        { ...options, ...invertAxis }
      )
        .on('data', invertValue)
        .on('draw', skillColor),
      skillXp: new Chartist.Line('#skill-xp', {}, options).on(
        'draw',
        skillColor
      ),
      allRanks: new Chartist.Bar('#all-ranks', {}, options).on(
        'draw',
        skillColor
      ),
      allXp: new Chartist.Bar('#all-xp', {}, options).on('draw', skillColor)
    })

    this.props.getXpRange({
      skill: this.props.skill,
      name: this.props.name,
      start: startDate,
      end: endDate
    })
  }

  componentWillReceiveProps ({ skillRank, skillXp, allRanks, allXp }) {
    const skillRankChart = this.state.skillRank
    if (skillRankChart) {
      skillRankChart.update(skillRank)
    }

    const skillXpChart = this.state.skillXp
    if (skillXpChart) {
      skillXpChart.update(skillXp)
    }

    const allRanksChart = this.state.allRanks
    if (allRanksChart) {
      allRanksChart.update(allRanks)
    }

    const allXpChart = this.state.allXp
    if (allXpChart) {
      allXpChart.update(allXp)
    }
  }

  componentWillUnmount () {
    if (this.state.skillRank) {
      this.state.skillRank.detach()
    }

    if (this.state.skillXp) {
      this.state.skillXp.detach()
    }

    if (this.state.allRanks) {
      this.state.allRanks.detach()
    }

    if (this.state.allXp) {
      this.state.allXp.detach()
    }
  }

  render ({ name, skill, ranks }) {
    return (
      <div style={{ height: 'inherit' }}>
        <Layout fullWidth>
          <Meta title={`Experience Tracker - ${hero.title}`} />
          <h1>
            {name} /{' '}
            <small class='text-muted'>
              {skill} / {this.state.startDate.toDateString().toLowerCase()}{' '}
              / {this.state.endDate.toDateString().toLowerCase()}
            </small>
          </h1>
          <hr />
          <div class='row'>
            <div class='col-xl-3 col-md-4 col-sm-12 col-xs-12'>
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
                    <span class='d-md-none d-lg-inline'>{capitalizeFirstLetter(playerSkill)}</span>
                    <span class='float-right'>
                      {createValueBadge(rank, '')}{' '}
                      {createValueBadge(xp, 'xp')}
                    </span>
                  </Link>
                ))}
              </ul>
            </div>
            <div class='col-xl-9 col-md-8 col-sm-12 col-xs-12'>
              <h5>Experience gained</h5>
              <div id='all-xp' class='ct-chart' style={{ height: 200 }} />
              <h5>Ranks gained</h5>
              <div id='all-ranks' class='ct-chart' style={{ height: 200 }} />
              <div class='row'>
                <div class='col-md-6'>
                  <h5>{capitalizeFirstLetter(skill)} ranks</h5>
                  <div id='skill-rank' class='ct-chart ct-square' />
                </div>
                <div class='col-md-6'>
                  <h5>{capitalizeFirstLetter(skill)} experience</h5>
                  <div id='skill-xp' class='ct-chart ct-square' />
                </div>
              </div>
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
