import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Line } from 'react-chartjs-2'
import Layout from '../components/layout'
import hero from '../_data/hero'
import {Col, ListGroup, ListGroupItem, Row} from 'reactstrap'
import * as R from 'ramda'

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
const highlightChangeValue = (value) => value >= 0
  ? (<span style={{color: 'green'}}>+{numberWithCommas(value)}</span>)
  : (<span style={{color: 'red'}}>{numberWithCommas(value)}</span>)

const calculateOverallXp = (xpEntry) => xpEntry.agility_xp +
  xpEntry.attack_xp +
  xpEntry.construction_xp +
  xpEntry.cooking_xp +
  xpEntry.crafting_xp +
  xpEntry.defence_xp +
  xpEntry.farming_xp +
  xpEntry.firemaking_xp +
  xpEntry.fishing_xp +
  xpEntry.fletching_xp +
  xpEntry.herblore_xp +
  xpEntry.hitpoints_xp +
  xpEntry.hunter_xp +
  xpEntry.magic_xp +
  xpEntry.mining_xp +
  xpEntry.prayer_xp +
  xpEntry.ranged_xp +
  xpEntry.runecraft_xp +
  xpEntry.slayer_xp +
  xpEntry.smithing_xp +
  xpEntry.strength_xp +
  xpEntry.thieving_xp +
  xpEntry.woodcutting_xp

const calculateRanksAndExp = (collector) => (value, key) => {
  let curKey = key
  let isRank = true

  if (key.indexOf('_rank') !== -1) {
    curKey = key.replace('_rank', '')
    isRank = true
  } else if (key.indexOf('_xp') !== -1) {
    curKey = key.replace('_xp', '')
    isRank = false
  } else {
    return
  }

  const curObj = collector[curKey]

  if (isRank) {
    collector[curKey] = curObj ? {
      ...curObj,
      rank: value - curObj.rank
    } : {
      xp: 0,
      rank: value
    }
  } else {
    collector[curKey] = curObj ? {
      ...curObj,
      xp: value - curObj.xp
    } : {
      xp: value,
      rank: 0
    }
  }
}

const Xp = ({ children, xpRange: { name, start, end, xp } }) => {
  const labels = xp.map(xpEntry => moment(xpEntry.date).fromNow())

  const overallData = {
    labels: labels,
    datasets: [
      {
        label: 'Overall rank',
        fill: false,
        data: xp.map(xpEntry => xpEntry.overall_rank)
      }
    ]
  }

  const overallXp = {
    labels: labels,
    datasets: [
      {
        label: 'Total experience',
        fill: false,
        data: xp.map(calculateOverallXp)
      }
    ]
  }

  const startEntry = xp[0]
  const endEntry = xp[xp.length - 1]
  const collector = {}
  R.forEachObjIndexed(calculateRanksAndExp(collector), startEntry)
  R.forEachObjIndexed(calculateRanksAndExp(collector), endEntry)

  if (collector.overall) {
    collector.overall = {
      rank: collector.overall.rank,
      xp: calculateOverallXp(endEntry) - calculateOverallXp(startEntry)
    }
  }

  const ranks = []
  R.forEachObjIndexed((value, key) => ranks.push({ ...value, img: key }), collector)
  ranks.sort((a, b) => {
    if (b.img === 'overall') return 1
    if (a.img < b.img) return -1
    if (a.img > b.img) return 1
    return 0
  })

  return (
    <div style={{height: 'inherit'}}>
      <Layout fullWidth>
        <Helmet>
          <title>Experience Tracker - {hero.title}</title>
        </Helmet>
        <h1>{name}</h1>
        <p className='text-muted'>{start ? start.toDateString() : ''} - {end ? end.toDateString() : ''}</p>
        <hr />
        <Row>
          <Col md='3' sm='4' xs='5'>
            <ListGroup>
              {ranks.map(({img, rank, xp}) => (
                <ListGroupItem key={img}>
                  <img alt={img} src={`/img/skillicons/${img}.png`} /> {capitalizeFirstLetter(img)}<br />
                  {highlightChangeValue(-rank)} ranks, {highlightChangeValue(xp)} xp
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col md='9' sm='8' xs='7'>
            <Line data={overallData} options={{
              scales: {
                yAxes: [{
                  ticks: {
                    reverse: true
                  }
                }]
              }
            }} />
            <Line data={overallXp} />
          </Col>
        </Row>
        {children}
      </Layout>
    </div>
  )
}

export default connect(
  (state) => ({
    xpRange: state.runelite
  })
)(Xp)
