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
    let tickrate = state.getTickRate()
    if (autoweed && state.getProduce() === PatchImplementation.Produce.WEEDS) {
      stage = 0
      stages = 1
      tickrate = 0
    }
    if (botanist) {
      tickrate = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(tickrate / 5)
    }
    let doneEstimate = 0
    if (tickrate > 0) {
      const tickNow = FarmingTracker.getTickTime(
        tickrate,
        0,
        unixNow,
        (funcInst => {
          if (typeof funcInst == 'function') {
            return funcInst
          }
          return (arg0, arg1) =>
            (funcInst['apply'] ? funcInst['apply'] : funcInst).call(
              funcInst,
              arg0,
              arg1
            )
        })(getConfiguration)
      )
      const tickTime = FarmingTracker.getTickTime(
        tickrate,
        0,
        unixTime,
        (funcInst => {
          if (typeof funcInst == 'function') {
            return funcInst
          }
          return (arg0, arg1) =>
            (funcInst['apply'] ? funcInst['apply'] : funcInst).call(
              funcInst,
              arg0,
              arg1
            )
        })(getConfiguration)
      )
      const delta = (((tickNow - tickTime) | 0) / (tickrate * 60)) | 0
      doneEstimate = FarmingTracker.getTickTime(
        tickrate,
        stages - 1 - stage,
        tickTime,
        (funcInst => {
          if (typeof funcInst == 'function') {
            return funcInst
          }
          return (arg0, arg1) =>
            (funcInst['apply'] ? funcInst['apply'] : funcInst).call(
              funcInst,
              arg0,
              arg1
            )
        })(getConfiguration)
      )
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
  /*private*/ static getTickTime(
    tickRate,
    ticks,
    requestedTime,
    getConfiguration
  ) {
    const offsetPrecisionMinsString = (target =>
      typeof target === 'function'
        ? target(
            TimeTrackingConfig.CONFIG_GROUP,
            TimeTrackingConfig.FARM_TICK_OFFSET_PRECISION
          )
        : target.apply(
            TimeTrackingConfig.CONFIG_GROUP,
            TimeTrackingConfig.FARM_TICK_OFFSET_PRECISION
          ))(getConfiguration)
    const offsetTimeMinsString = (target =>
      typeof target === 'function'
        ? target(
            TimeTrackingConfig.CONFIG_GROUP,
            TimeTrackingConfig.FARM_TICK_OFFSET
          )
        : target.apply(
            TimeTrackingConfig.CONFIG_GROUP,
            TimeTrackingConfig.FARM_TICK_OFFSET
          ))(getConfiguration)
    const offsetPrecisionMins =
      offsetPrecisionMinsString != null &&
      !(offsetPrecisionMinsString.length === 0)
        ? /* parseInt */ parseInt(offsetPrecisionMinsString)
        : null
    const offsetTimeMins =
      offsetTimeMinsString != null && !(offsetTimeMinsString.length === 0)
        ? /* parseInt */ parseInt(offsetTimeMinsString)
        : null
    let calculatedOffsetTime = 0
    if (
      offsetPrecisionMins != null &&
      offsetTimeMins != null &&
      (offsetPrecisionMins >= tickRate || offsetPrecisionMins >= 40)
    ) {
      calculatedOffsetTime = (offsetTimeMins % tickRate) * 60
    }
    const unixNow = requestedTime + calculatedOffsetTime
    const timeOfCurrentTick = unixNow - (unixNow % (tickRate * 60))
    const timeOfGoalTick = timeOfCurrentTick + ticks * tickRate * 60
    return timeOfGoalTick - calculatedOffsetTime
  }
}
FarmingTracker['__class'] = 'timetracking.FarmingTracker'
import { PatchImplementation } from './PatchImplementation'
import { TimeTrackingConfig } from './TimeTrackingConfig'
import { Autoweed } from './Autoweed'
import { PatchPrediction } from './PatchPrediction'
