import { h } from 'preact'
import '@gouch/to-title-case'
import { toMMSS } from '../../util'
import { bindActionCreators } from 'redux'
import { fetchConfig, getBossLog, getSlayerTask } from '../../modules/config'
import { connect } from 'preact-redux'
import { fetchReleases } from '../../modules/git'
import prepare from '../../components/prepare'

const nameToItemId = name => {
  switch (name.toLowerCase()) {
    case 'abyssal sire':
      return 13262 // abyssal orphan
    case 'alchemical hydra':
      return 22746 // ikkle hydra
    case 'barrows':
    case 'barrows chests':
      return 19629 // barrows teleport
    case 'bryophyta':
      return 22370 // bryophyta's staff
    case 'callisto':
      return 13178 // callisto cub
    case 'cerberus':
      return 13247 // hellpuppy
    case 'chambers of xeric':
    case 'chambers of xeric challenge mode':
      return 20851 // olmlet
    case 'chaos elemental':
      return 11995 // chaos elemental
    case 'chaos fanatic':
      return 4675 // ancient staff
    case 'commander zilyana':
      return 12651 // pet zilyana
    case 'corporeal beast':
      return 22318 // pet corp
    case 'crazy archaeologist':
      return 11990 // fedora
    case 'dagannoth prime':
      return 12644
    case 'dagannoth rex':
      return 12645
    case 'dagannoth supreme':
      return 12643
    case 'deranged archaeologist':
      return 21567
    case 'general graardor':
      return 12650
    case 'giant mole':
      return 12646
    case 'grotesque guardians':
      return 21748
    case 'hespori':
      return 22875 // hespori seed
    case 'kalphite queen':
      return 12647
    case 'king black dragon':
      return 12653
    case "k'ril tsutsaroth":
      return 12652
    case 'kraken':
      return 12655
    case "kree'arra":
      return 12649
    case 'obor':
      return 20756 // hill giant club
    case 'scorpia':
      return 13181
    case 'skotizo':
      return 21273
    case 'theatre of blood':
      return 22473
    case 'thermonuclear smoke devil':
      return 12648
    case 'tztok-jad':
      return 13225
    case 'tzkal-zuk':
      return 21291
    case 'venenatis':
      return 13177
    case "vet'ion":
      return 13179
    case 'vorkath':
      return 21992
    case 'wintertodt':
      return 20693
    case 'zulrah':
      return 12921
    default:
      return 4155 // Enchanted gem
  }
}

const buildSlayerTask = slayerTask => {
  if (!slayerTask.hasTask) {
    return <noscript />
  }

  return (
    <div class="card mb-3">
      <div class="card-header">
        <img class="icon-small" alt="" src="/img/skillicons/slayer.png" />{' '}
        Slayer Task
      </div>
      <div class="card-body">
        <h5 class="card-title">
          {slayerTask.name.toTitleCase()}
          <small>
            {slayerTask.location ? ' in ' + slayerTask.location : ''}
          </small>
        </h5>
        <p class="card-text">
          Start: {slayerTask.start}, Remaining: {slayerTask.remaining}
        </p>
        <p class="card-text">
          Streak: {slayerTask.streak}, Points: {slayerTask.points}
        </p>
      </div>
    </div>
  )
}

const buildBossLog = bossLog => {
  if (bossLog.length === 0) {
    return <noscript />
  }

  return (
    <div class="card border-0">
      <div class="card-header border">
        <img class="icon-small" alt="" src="/img/skillicons/attack.png" /> Boss
        Log
      </div>
      <ul class="list-group">
        {bossLog.map(e => (
          <li class="list-group-item">
            <img
              class="mr-1"
              src={`https://static.runelite.net/cache/item/icon/${nameToItemId(
                e.name
              )}.png`}
              alt=""
            />
            {e.name.toTitleCase()}{' '}
            <div class="float-right">
              Kills: <span class="badge badge-primary badge-pill">{e.kc}</span>{' '}
              {e.pb ? (
                <span>
                  Personal best:{' '}
                  <span class="badge badge-info badge-pill">
                    {toMMSS(e.pb)}
                  </span>
                </span>
              ) : (
                <noscript />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Home = ({ slayerTask, bossLog }) => (
  <div>
    {buildSlayerTask(slayerTask)}
    {buildBossLog(bossLog)}
  </div>
)

const mapStateToProps = (state, props) => ({
  ...props,
  slayerTask: getSlayerTask(state),
  bossLog: getBossLog(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchReleases,
      fetchConfig
    },
    dispatch
  )

const prepareComponentData = async ({ fetchReleases, fetchConfig }) => {
  await fetchReleases()
  await fetchConfig()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(Home))
