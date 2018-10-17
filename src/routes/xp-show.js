import 'chartist/dist/chartist.min.css'
import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { Link } from 'preact-router'
import { bindActionCreators } from 'redux'
import dayjs from 'dayjs'
import Chartist from 'chartist'
import 'chartist-plugin-tooltips'
import './xp-show.css'
import Layout from '../components/layout'
import { getReleases } from '../modules/git'
import {
  getXpRange,
  xpSelector,
  collectedXpSelector
} from '../modules/runelite'
import hero from '../_data/hero'
import skills from '../_data/skills'
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
const skillNames = Object.keys(skills)
const capitalizedSkills = skillNames.map(skill => capitalizeFirstLetter(skill))
const flattenMap = map =>
  Object.keys(map).map(key => ({
    name: key,
    ...map[key]
  }))

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
        series.map(s => ({ ...s, value: -s.value }))
      )
    }

    const skillColor = context => {
      if (
        context.type === 'line' ||
        context.type === 'bar' ||
        context.type === 'point'
      ) {
        context.element.attr({
          style: `stroke: ${skills[context.meta] ||
            skills[this.props.skill.toLowerCase()]}`
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

    this.props.getReleases().then(() =>
      this.props.getXpRange({
        skill: this.props.skill,
        name: this.props.name,
        start: startDate,
        end: endDate
      })
    )
  }

  componentWillUnmount() {
    this.state.skillRank.detach()
    this.state.skillXp.detach()
    this.state.allRanks.detach()
    this.state.allXp.detach()
  }

  render({ name, skill, xp, collectedXp }) {
    if (this.state.skillXp) {
      this.state.skillRank.update({
        labels: xp.map(xpEntry => xpEntry.date.toDateString()),
        series: [
          xp.map(xpEntry => ({
            meta: xpEntry.date.toDateString(),
            value: xpEntry[this.props.skill + '_rank']
          }))
        ]
      })

      this.state.skillXp.update({
        labels: xp.map(xpEntry => xpEntry.date.toDateString()),
        series: [
          xp.map(xpEntry => ({
            meta: xpEntry.date.toDateString(),
            value: xpEntry[this.props.skill + '_xp']
          }))
        ]
      })

      this.state.allRanks.update({
        labels: capitalizedSkills,
        series: [
          skillNames.map(skill => ({
            meta: skill,
            value: collectedXp[skill] ? collectedXp[skill].rank : 0
          }))
        ]
      })

      this.state.allXp.update({
        labels: capitalizedSkills,
        series: [
          skillNames.filter(skill => skill !== 'overall').map(skill => ({
            meta: skill,
            value: collectedXp[skill] ? collectedXp[skill].xp : 0
          }))
        ]
      })
    }

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
              {flattenMap(collectedXp)
                .sort(
                  (a, b) =>
                    skillNames.indexOf(a.name) - skillNames.indexOf(b.name)
                )
                .map(({ name: playerSkill, rank, xp }) => (
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
    xp: xpSelector(state, props),
    collectedXp: collectedXpSelector(state, props)
  }),
  dispatch => bindActionCreators({ getReleases, getXpRange }, dispatch)
)(XpShow)
