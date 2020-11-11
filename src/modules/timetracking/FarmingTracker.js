// @ts-nocheck
/* eslint-disable */
import { Varbits } from './Varbits'
export class FarmingTracker {
  predictPatch(
    patch,
    configGroup,
    autoweedConfigGroup,
    username,
    getConfiguration
  ) {
    const unixNow = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
      new Date().getTime() / 1000
    )
    let autoweed
    {
      const group = configGroup + '.' + username
      autoweed =
        /* toString */ '' +
          /* Enum.ordinal */ Autoweed[Autoweed[Autoweed.ON]] ===
        (target =>
          typeof target === 'function'
            ? target(group, autoweedConfigGroup)
            : target.apply(group, autoweedConfigGroup))(getConfiguration)
    }
    const group =
      configGroup + '.' + username + '.' + patch.getRegion().getRegionID()
    const key = '' + Varbits['_$wrappers'][patch.getVarbit()].getId()
    const storedValue = (target =>
      typeof target === 'function'
        ? target(group, key)
        : target.apply(group, key))(getConfiguration)
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
    if (autoweed && state.getProduce() === PatchImplementation.Produce.WEEDS) {
      stage = 0
      stages = 1
      tickrate = 0
    }
    let doneEstimate = 0
    if (tickrate > 0) {
      const tickNow = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
        (unixNow + 5 * 60) / tickrate
      )
      const tickTime = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
        (unixTime + 5 * 60) / tickrate
      )
      const delta = (tickNow - tickTime) | 0
      doneEstimate = (stages - 1 - stage + tickTime) * tickrate + 5 * 60
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
import { Autoweed } from './Autoweed'
import { PatchPrediction } from './PatchPrediction'
