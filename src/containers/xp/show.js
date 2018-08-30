import React from 'react'
import {connect} from 'react-redux'
import Chart from 'chart.js'
import Layout from '../../components/layout'
import {
  allRanksSelector, allXpSelector, nameSelector, skillRankSelector,
  skillXpSelector, ranksSelector, skillSelector
} from '../../redux/modules/runelite'
import {NavLink} from 'redux-first-router-link'

Chart.defaults.global.animation = false
Chart.defaults.global.tooltips.callbacks.label = (tooltipItem) => numberWithCommas(tooltipItem.yLabel.toString())

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

class XpShow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      skillRank: null,
      skillXp: null,
      allRanks: null,
      allXp: null
    }
  }

  componentWillReceiveProps (props) {
    this.componentWillUnmount()
    this.setState({
      skillRank: new Chart('skill-rank', {
        type: 'line',
        data: props.skillRank,
        options: reverseGraphOptions
      }),
      skillXp: new Chart('skill-xp', {
        type: 'line',
        data: props.skillXp,
        options: straightLineGraphOption
      }),
      allRanks: new Chart('all-ranks', {
        type: 'bar',
        data: props.allRanks
      }),
      allXp: new Chart('all-xp', {
        type: 'bar',
        data: props.allXp
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

  render ({children, start, end, name, skill, ranks}) {
    return (
      <div style={{height: 'inherit'}}>
        <Layout fullWidth>
          {/* <Helmet> */}
          {/* <title>Experience Tracker - {hero.title}</title> */}
          {/* </Helmet> */}
          <h1>{name} / <small className='text-muted'>
            {skill} / {safeDate(start).toDateString().toLowerCase()} / {safeDate(end).toDateString().toLowerCase()}</small>
          </h1>
          <hr />
          <div className='row'>
            <div className='col-md-3 col-sm-4 col-xs-12'>
              <ul className='list-group'>
                {ranks.map(({skill: skillName, rank, xp}) => (
                  <NavLink
                    className={'list-group-item list-group-item-action ' + (skill === skillName ? 'active' : '')}
                    key={skillName}
                    to={`/xp/show/${skillName}/${name}/${safeDate(start).getTime()}/${safeDate(end).getTime()}`}>
                    <img alt={skillName} src={`/img/skillicons/${skillName}.png`} /> {capitalizeFirstLetter(skillName)}
                    <br />
                    {createValueBadge(rank, 'ranks')} {createValueBadge(xp, 'xp')}
                  </NavLink>
                ))}
              </ul>
            </div>
            <div className='col-md-9 col-sm-8 col-xs-12'>
              <canvas id='skill-rank' />
              <canvas id='skill-xp' />
              <canvas id='all-xp' />
              <canvas id='all-ranks' />
            </div>
          </div>
          {children}
        </Layout>
      </div>
    )
  }
}

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
