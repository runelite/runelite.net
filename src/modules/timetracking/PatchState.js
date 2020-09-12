// @ts-nocheck
/* eslint-disable */
import { PatchImplementation } from './PatchImplementation'
import { CropState } from './CropState'
export class PatchState {
  constructor(produce, cropState, stage) {
    if (this.produce === undefined) this.produce = null
    if (this.cropState === undefined) this.cropState = null
    if (this.stage === undefined) this.stage = 0
    this.produce = produce
    this.cropState = cropState
    this.stage = stage
  }
  getStages() {
    return this.cropState === CropState.HARVESTABLE
      ? PatchImplementation.Produce['_$wrappers'][
          this.produce
        ].getHarvestStages()
      : PatchImplementation.Produce['_$wrappers'][this.produce].getStages()
  }
  getTickRate() {
    switch (this.cropState) {
      case CropState.HARVESTABLE:
        return PatchImplementation.Produce['_$wrappers'][
          this.produce
        ].getRegrowTickrate()
      case CropState.GROWING:
        return PatchImplementation.Produce['_$wrappers'][
          this.produce
        ].getTickrate()
      default:
        return 0
    }
  }
  getStage() {
    return this.stage
  }
  getProduce() {
    return this.produce
  }
  getCropState() {
    return this.cropState
  }
}
PatchState['__class'] = 'timetracking.PatchState'
