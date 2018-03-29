import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import Chart from 'chart.js'
import {Bar, Line} from 'react-chartjs-2'
import Layout from '../../components/layout'
import hero from '../../_data/hero'
import {Badge, Col, ListGroup, ListGroupItem, Row} from 'reactstrap'
import {NavLink} from 'redux-first-router-link'
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

const reverseGraphOptions = {
  scales: {
    yAxes: [{
      ticks: {
        reverse: true
      }
    }]
  }
}

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const createValueBadge = (value, suffix) => value >= 0
  ? (<Badge color='success'>+{numberWithCommas(value)} {suffix}</Badge>)
  : (<Badge color='danger'>{numberWithCommas(value)} {suffix}</Badge>)

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
      <Row>
        <Col md='3' sm='4' xs='12'>
          <ListGroup>
            {ranks.map(({skill: skillName, rank, xp}) => (
              <ListGroupItem
                key={skillName}
                active={skill === skillName}
                tag={NavLink}
                to={`/xp/show/${skillName}/${name}/${safeDate(start).toISOString()}/${safeDate(end).toISOString()}`}>
                <img alt={skillName} src={`/img/skillicons/${skillName}.png`} /> {capitalizeFirstLetter(skillName)} <br />
                {createValueBadge(rank, 'ranks')} {createValueBadge(xp, 'xp')}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col md='9' sm='8' xs='12'>
          <Line data={skillRank} options={reverseGraphOptions} />
          <Line data={skillXp} />
          <Bar data={allXp} />
          <Bar data={allRanks} />
        </Col>
      </Row>
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
