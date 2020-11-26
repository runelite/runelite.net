// @ts-nocheck
/* eslint-disable */
import { Varbits } from './Varbits'
export class FarmingTracker {
  predictPatch(patch, getConfiguration) {
    const unixNow = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
      new Date().getTime() / 1000
    )
    const autoweed =
      '' + /* Enum.ordinal */ Autoweed[Autoweed[Autoweed.ON]] ===
      (target =>
        typeof target === 'function'
          ? target(TimeTrackingConfig.CONFIG_GROUP, TimeTrackingConfig.AUTOWEED)
          : target.apply(
              TimeTrackingConfig.CONFIG_GROUP,
              TimeTrackingConfig.AUTOWEED
            ))(getConfiguration)
    const botanist =
      true.toString() ===
      (target =>
        typeof target === 'function'
          ? target(TimeTrackingConfig.CONFIG_GROUP, TimeTrackingConfig.BOTANIST)
          : target.apply(
              TimeTrackingConfig.CONFIG_GROUP,
              TimeTrackingConfig.BOTANIST
            ))(getConfiguration)
    const key =
      patch.getRegion().getRegionID() +
      '.' +
      Varbits['_$wrappers'][patch.getVarbit()].getId()
    const storedValue = (target =>
      typeof target === 'function'
        ? target(TimeTrackingConfig.CONFIG_GROUP, key)
        : target.apply(TimeTrackingConfig.CONFIG_GROUP, key))(getConfiguration)
    if (storedValue == null) {
      return null
    }
    let unixTime = 0
    let value = 0
    {
      const parts = storedValue.split(':')
      if (parts.length === 2) {
        try {
          value = parseInt(parts[0])
          unixTime = parseInt(parts[1])
        } catch (e) {}
      }
    }
    if (unixTime <= 0) {
      return null
    }
    const state = PatchImplementation['_$wrappers'][
      patch.getImplementation()
    ].forVarbitValue(value)
    if (state == null) {
      return null
    }
    let stage = state.getStage()
    let stages = state.getStages()
    let tickrate = state.getTickRate() * 60
    let farmingTickLength = 5 * 60
    if (autoweed && state.getProduce() === PatchImplementation.Produce.WEEDS) {
      stage = 0
      stages = 1
      tickrate = 0
    }
    if (botanist) {
      tickrate = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(tickrate / 5)
      farmingTickLength = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
        farmingTickLength / 5
      )
    }
    let doneEstimate = 0
    if (tickrate > 0) {
      const tickNow = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
        (unixNow + farmingTickLength) / tickrate
      )
      const tickTime = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
        (unixTime + farmingTickLength) / tickrate
      )
      const delta = (tickNow - tickTime) | 0
      doneEstimate =
        (stages - 1 - stage + tickTime) * tickrate + farmingTickLength
      stage += delta
      if (stage >= stages) {
        stage = stages - 1
      }
    }
    return new PatchPrediction(
      state.getProduce(),
      state.getCropState(),
      doneEstimate,
      stage,
      stages
    )
  }
}
FarmingTracker['__class'] = 'timetracking.FarmingTracker'
import { PatchImplementation } from './PatchImplementation'
import { TimeTrackingConfig } from './TimeTrackingConfig'
import { Autoweed } from './Autoweed'
import { PatchPrediction } from './PatchPrediction'
