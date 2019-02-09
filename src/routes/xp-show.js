import { h } from 'preact'
import { connect } from 'preact-redux'
import { Link } from 'preact-router'
import { bindActionCreators } from 'redux'
import dayjs from 'dayjs'
import {
  Cell,
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import Layout from '../components/layout'
import { fetchReleases } from '../modules/git'
import { fetchXp, getXp, getCollectedXp } from '../modules/xp'
import hero from '../_data/hero'
import skills from '../_data/skills'
import Meta from '../components/meta'
import prepare from '../components/prepare'

const isNumeric = value => !isNaN(value - parseFloat(value))

const parseDate = (date, fromDate) => {
  if (date === 'now') {
    date = new Date()
  } else if (!isNumeric(date)) {
    const parsed = date.match(/(\d+)(\w+)/)
    date = dayjs(fromDate)
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
const flattenMap = map =>
  Object.keys(map).map(key => ({
    name: key,
    ...map[key]
  }))

const createDateRange = (start, end) => {
  const endDate = safeDate(parseDate(end, new Date()))
  const startDate = safeDate(parseDate(start, endDate))

  return {
    startDate,
    endDate
  }
}

const XpShow = ({ name, skill, xp, collectedXp, start, end }) => {
  const { startDate, endDate } = createDateRange(start, end)
  return (
    <Layout>
      <Meta title={`Experience Tracker - ${hero.title}`} />
      <h1>
        {name} /{' '}
        <small class="text-muted">
          {skill} / {startDate.toDateString().toLowerCase()} /{' '}
          {endDate.toDateString().toLowerCase()}
        </small>
      </h1>
      <hr />
      <div class="row">
        <div class="col-xl-3 col-md-4 col-sm-12 col-xs-12">
          <ul class="list-group list-group-small">
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
                  href={`/xp/show/${playerSkill}/${name}/${startDate.getTime()}/${endDate.getTime()}`}
                >
                  <img
                    class="icon"
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
          <ResponsiveContainer height={300}>
            <BarChart
              data={skillNames
                .filter(skill => skill !== 'overall')
                .map(skill => ({
                  name: capitalizeFirstLetter(skill),
                  value: collectedXp[skill] ? collectedXp[skill].xp : 0
                }))}
            >
              <XAxis dataKey="name" />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="value">
                {skillNames
                  .filter(skill => skill !== 'overall')
                  .map(skill => (
                    <Cell fill={skills[skill]} />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <h5>
            <small>Total ranks gained</small>
          </h5>
          <ResponsiveContainer height={300}>
            <BarChart
              data={skillNames.map(skill => ({
                name: capitalizeFirstLetter(skill),
                value: collectedXp[skill] ? collectedXp[skill].rank : 0
              }))}
            >
              <XAxis dataKey="name" />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="value">
                {skillNames.map(skill => (
                  <Cell fill={skills[skill]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <h5>
            <small>{capitalizeFirstLetter(skill)} ranks</small>
          </h5>
          <ResponsiveContainer height={300}>
            <LineChart
              syncId="date"
              data={xp.map(xpEntry => ({
                name: xpEntry.date.toDateString(),
                value: xpEntry[skill + '_rank']
              }))}
            >
              <XAxis dataKey="name" />
              <YAxis domain={['dataMin', 'dataMax']} reversed hide />
              <Tooltip />
              <Line connectNulls dataKey="value" stroke={skills[skill]} />
            </LineChart>
          </ResponsiveContainer>

          <h5>
            <small>{capitalizeFirstLetter(skill)} experience</small>
          </h5>
          <ResponsiveContainer height={300}>
            <LineChart
              syncId="date"
              data={xp.map(xpEntry => ({
                name: xpEntry.date.toDateString(),
                value: xpEntry[skill + '_xp']
              }))}
            >
              <XAxis dataKey="name" />
              <YAxis domain={['dataMin', 'dataMax']} hide />
              <Tooltip />
              <Line connectNulls dataKey="value" stroke={skills[skill]} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state, props) => ({
  xp: getXp(state, props),
  collectedXp: getCollectedXp(state, props)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchReleases, fetchXp }, dispatch)

const prepareComponentData = async ({
  fetchReleases,
  fetchXp,
  skill,
  name,
  start,
  end
}) => {
  const { startDate, endDate } = createDateRange(start, end)
  await fetchReleases()
  await fetchXp({
    skill,
    name,
    start: startDate,
    end: endDate
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(XpShow))
