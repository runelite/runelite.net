import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import Chart from 'chart.js'
import {Bar, Line} from 'react-chartjs-2'
import Layout from '../../components/layout'
import hero from '../../_data/hero'
import {
  allRanksSelector, allXpSelector, nameSelector, skillRankSelector,
  skillXpSelector, ranksSelector, skillSelector
} from '../../redux/modules/runelite'

Chart.defaults.options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 300
  },
  tooltips: {
    callbacks: {
      label: (tooltipItem) => numberWithCommas(tooltipItem.yLabel.toString())
    }
  }
}

const straightLineGraphOption = {
  elements: {
    line: {
      tension: 0
    }
  }
}

const reverseGraphOptions = {
  scales: {
    yAxes: [{
      ticks: {
        reverse: true
      }
    }]
  },
  ...straightLineGraphOption
}

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const createValueBadge = (value, suffix) => value >= 0
  ? (<span className='badge badge-success'>+{numberWithCommas(value)} {suffix}</span>)
  : (<span className='badge badge-danger'>{numberWithCommas(value)} {suffix}</span>)

const safeDate = (date) => date || new Date()

const XpShow = ({ children, start, end, name, skill, ranks, skillRank, skillXp, allRanks, allXp }) => (
  <div style={{height: 'inherit'}}>
    <Layout fullWidth>
      <Helmet>
        <title>Experience Tracker - {hero.title}</title>
      </Helmet>
      <h1>{name} / <small className='text-muted'>
        {skill} / {safeDate(start).toDateString().toLowerCase()} / {safeDate(end).toDateString().toLowerCase()}</small>
      </h1>
      <hr />
      <div className='row'>
        <div className='col-md-3 col-sm-4 col-xs-12'>
          <ul className='list-group'>
            {ranks.map(({skill: skillName, rank, xp}) => (
              <a
                className={'list-group-item list-group-item-action ' + (skill === skillName ? 'active' : '')}
                key={skillName}
                href={`/xp/show/${skillName}/${name}/${safeDate(start).getTime()}/${safeDate(end).getTime()}`}>
                <img alt={skillName} src={`/img/skillicons/${skillName}.png`} /> {capitalizeFirstLetter(skillName)} <br />
                {createValueBadge(rank, 'ranks')} {createValueBadge(xp, 'xp')}
              </a>
            ))}
          </ul>
        </div>
        <div className='col-md-9 col-sm-8 col-xs-12'>
          <Line data={skillRank} options={reverseGraphOptions} />
          <Line data={skillXp} options={straightLineGraphOption} />
          <Bar data={allXp} />
          <Bar data={allRanks} />
        </div>
      </div>
      {children}
    </Layout>
  </div>
)

export default connect(
  (state, props) => ({
    start: state.runelite.start,
    end: state.runelite.end,
    name: nameSelector(state, props),
    skill: skillSelector(state, props),
    ranks: ranksSelector(state, props),
    skillRank: skillRankSelector(state, props),
    skillXp: skillXpSelector(state, props),
    allRanks: allRanksSelector(state, props),
    allXp: allXpSelector(state, props),
    xpRange: state.runelite
  })
)(XpShow)
