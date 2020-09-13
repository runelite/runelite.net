// @ts-nocheck
/* eslint-disable */
import { PatchPrediction } from './PatchPrediction'
import { Autoweed } from './Autoweed'
import { Varbits } from './Varbits'
import { PatchImplementation } from './PatchImplementation'
export class FarmingTracker {
  predictPatch(
    patch,
    configGroup,
    autoweedConfigGroup,
    username,
    getConfiguration
  ) {
    let unixNow = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
      new Date().getTime() / 1000
    )
    let autoweed
    {
      let group = configGroup + '.' + username
      autoweed = /* equals */ ((o1, o2) => {
        if (o1 && o1.equals) {
          return o1.equals(o2)
        } else {
          return o1 === o2
        }
      })(
        /* toString */ '' + /* Enum.ordinal */ Autoweed[Autoweed[Autoweed.ON]],
        (target =>
          typeof target === 'function'
            ? target(group, autoweedConfigGroup)
            : target.apply(group, autoweedConfigGroup))(getConfiguration)
      )
    }
    let group =
      configGroup + '.' + username + '.' + patch.getRegion().getRegionID()
    let key = '' + Varbits['_$wrappers'][patch.getVarbit()].getId()
    let storedValue = (target =>
      typeof target === 'function'
        ? target(group, key)
        : target.apply(group, key))(getConfiguration)
    if (storedValue == null) {
      return null
    }
    let unixTime = 0
    let value = 0
    {
      let parts = storedValue.split(':')
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
    let state = PatchImplementation['_$wrappers'][
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
      let tickNow = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
        (unixNow + 5 * 60) / tickrate
      )
      let tickTime = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
        (unixTime + 5 * 60) / tickrate
      )
      let delta = (tickNow - tickTime) | 0
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
