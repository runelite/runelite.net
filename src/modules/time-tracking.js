import { FarmingWorld } from './timetracking/FarmingWorld'
import { FarmingTracker } from './timetracking/FarmingTracker'
import { CropState } from './timetracking/CropState'
import { getConfig, getSelectedAccount } from './config'
import { createSelector } from 'reselect'
import { PatchImplementation } from './timetracking/PatchImplementation'
import { Tab } from './timetracking/Tab'
import { ItemID } from './timetracking/ItemID'
import {
  BirdHouseState,
  BirdHouseState_$WRAPPER
} from './timetracking/BirdHouseState'
import { BirdHouseTracker } from './timetracking/BirdHouseTracker'
import { BirdHouse, BirdHouse_$WRAPPER } from './timetracking/BirdHouse'
import { BirdHouseSpace } from './timetracking/BirdHouseSpace'

function adjustColor(color, amount) {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, color =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  )
}

function getBirdStateColor(state) {
  switch (state) {
    case BirdHouseState.EMPTY:
    case BirdHouseState.UNKNOWN:
      return '#4D4D4D'
    case BirdHouseState.BUILT:
      return '#E6961E'
    case BirdHouseState.SEEDED:
    default:
      return '#26A831'
  }
}

function getCropStateColor(state) {
  switch (state) {
    case CropState.DEAD:
      return '#b81818'
    case CropState.DISEASED:
    case CropState.FILLING:
      return '#E6961E'
    case CropState.EMPTY:
      return '#FF4D4D4D'
    case CropState.HARVESTABLE:
    case CropState.GROWING:
    default:
      return '#26A831'
  }
}

function getFormattedEstimate(remainingSeconds) {
  let sb = 'in '
  const duration = Math.floor((remainingSeconds + 59) / 60)
  const minutes = Math.floor(duration % 60)
  const hours = Math.floor((duration / 60) % 24)
  const days = Math.floor(duration / (60 * 24))
  if (days > 0) {
    sb += days + 'd '
  }
  if (hours > 0) {
    sb += hours + 'h '
  }
  if (minutes > 0) {
    sb += minutes + 'm '
  }
  return sb
}

function preparePanel() {
  return {
    title: '',
    subtitle: '',
    icon: 0,
    estimateText: '',
    tooltipText: '',
    progress: {
      minimumValue: 0,
      maximumValue: 1,
      value: 0,
      visible: true,
      background: adjustColor('#26A831', -60),
      foreground: '#26A831'
    }
  }
}

function buildBirdhouseData(tabEntries, getConfiguration) {
  const birdhouseTracker = new BirdHouseTracker()
  const birdhouseTabs = birdhouseTracker.loadFromConfig(getConfiguration)
  const unixNow = new Date().getTime() / 1000
  const tab = Tab['_$wrappers'][Tab.BIRD_HOUSE]

  const tabEntry = {
    name: tab.getName(),
    icon: tab.getItemID(),
    panels: []
  }

  for (const [space, data] of birdhouseTabs.entries()) {
    const spaceValue = BirdHouseSpace['_$wrappers'][space]
    let value = -1
    let startTime = 0

    if (data != null) {
      value = data.getVarp()
      startTime = data.getTimestamp()
    }

    const birdHouse =
      BirdHouse['_$wrappers'][BirdHouse_$WRAPPER.fromVarpValue(value)]
    const state = BirdHouseState_$WRAPPER.fromVarpValue(value)
    const panel = preparePanel()
    panel.title = spaceValue.getName()
    panel.progress.maximumValue = 3000

    if (birdHouse == null) {
      panel.icon = ItemID.FEATHER
      panel.progress.visible = false
    } else {
      panel.icon = birdHouse.getItemID()
      panel.tooltipText = birdHouse.getName()
      panel.progress.visible = true
    }

    panel.progress.foreground = getBirdStateColor(state)
    panel.progress.background = adjustColor(getBirdStateColor(state), -60)

    switch (state) {
      case BirdHouseState.EMPTY:
        panel.tooltipText = 'Empty'
        panel.estimateText = 'Empty'
        break
      case BirdHouseState.BUILT:
        panel.progress.value = 0
        panel.estimateText = 'Built'
        break
      case BirdHouseState.SEEDED:
        const remainingTime = startTime + 3000 - unixNow
        if (remainingTime <= 0) {
          panel.progress.value = 3000
          panel.estimateText = 'Done'
        } else {
          panel.progress.value = 3000 - remainingTime
          panel.estimateText = 'Done ' + getFormattedEstimate(remainingTime)
        }
        break
      default:
        panel.tooltipText = 'Unknown state'
        panel.estimateText = 'Unknown'
        break
    }

    tabEntry.panels.push(panel)
  }

  tabEntries.push(tabEntry)
}

function buildFarmingData(tabEntries, getConfiguration) {
  const farmingTracker = new FarmingTracker()
  const farmingWorld = new FarmingWorld()
  const farmingTabs = farmingWorld.getTabs()

  for (const [tabsKey, tabList] of farmingTabs.entries()) {
    const tab = Tab['_$wrappers'][tabsKey]
    tabList.sort((a, b) => a.getName().localeCompare(b.getName()))
    tabList.sort((a, b) =>
      a.getRegion().getName().localeCompare(b.getRegion().getName())
    )

    const tabEntry = {
      name: tab.getName(),
      icon: tab.getItemID(),
      panels: []
    }

    const unixNow = new Date().getTime() / 1000

    for (let patch of tabList) {
      const panel = preparePanel()
      panel.icon = ItemID.WEEDS

      panel.title =
        patch.getRegion().getName() +
        (patch.getName() == null || patch.getName() === ''
          ? ''
          : ' (' + patch.getName() + ')')

      const implementation =
        PatchImplementation['_$wrappers'][patch.getImplementation()]

      panel.subtitle =
        implementation.getName() != null && implementation.getName() !== ''
          ? implementation.getName()
          : ''

      const prediction = farmingTracker.predictPatch(patch, getConfiguration)

      if (prediction == null) {
        panel.tooltipText = 'Unknown state'
        panel.estimateText = 'Unknown'
        panel.progress.visible = false
        tabEntry.panels.push(panel)
        continue
      }

      const produce =
        PatchImplementation.Produce['_$wrappers'][prediction.getProduce()]

      if (produce.getItemID() < 0) {
        panel.icon = ItemID.WEEDS
        panel.tooltipText = 'Unknown state'
      } else {
        panel.icon = produce.getItemID()
        panel.tooltipText = produce.getName()
      }

      switch (prediction.getCropState()) {
        case CropState.HARVESTABLE:
          panel.estimateText = 'Done'
          break
        case CropState.GROWING:
          if (prediction.getDoneEstimate() < unixNow) {
            panel.estimateText = 'Done'
          } else {
            panel.estimateText =
              'Done ' +
              getFormattedEstimate(prediction.getDoneEstimate() - unixNow)
            panel.estimateText =
              'Done ' +
              getFormattedEstimate(prediction.getDoneEstimate() - unixNow)
          }
          break
        case CropState.DISEASED:
          panel.estimateText = 'Diseased'
          break
        case CropState.DEAD:
          panel.estimateText = 'Dead'
          break
        case CropState.EMPTY:
          panel.estimateText = 'Empty'
          break
        case CropState.FILLING:
          panel.estimateText = 'Filling'
          break
        default:
          console.warn('Unknown crop state!')
      }

      /* Hide any fully grown weeds' progress bar. */
      if (
        prediction.getProduce() !== PatchImplementation.Produce.WEEDS ||
        prediction.getStage() < prediction.getStages() - 1
      ) {
        panel.progress.visible = true
        panel.progress.foreground = getCropStateColor(prediction.getCropState())
        panel.progress.background = adjustColor(
          getCropStateColor(prediction.getCropState()),
          -60
        )
        panel.progress.maximumValue = prediction.getStages() - 1
        panel.progress.value = prediction.getStage()
      } else {
        panel.progress.visible = false
      }

      tabEntry.panels.push(panel)
    }

    tabEntry.panels.sort((a, b) => a.title.localeCompare(b.title))
    tabEntry.panels.sort((a, b) => a.subtitle.localeCompare(b.subtitle))
    tabEntries.push(tabEntry)
  }
}

function buildData(account, configuration) {
  function getConfiguration(group, key) {
    if (!account) {
      return null
    }

    let value =
      configuration[group + '.rsprofile.' + account.accountId + '.' + key]

    if (!value) {
      value = null
    }

    return value
  }

  const tabEntries = []
  buildFarmingData(tabEntries, getConfiguration)
  buildBirdhouseData(tabEntries, getConfiguration)
  tabEntries.sort((a, b) => a.name.localeCompare(b.name))
  return tabEntries
}

export const getTimeTracking = createSelector(
  getConfig,
  getSelectedAccount,
  (config, account) => {
    return buildData(account, config)
  }
)
