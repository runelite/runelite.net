// @ts-nocheck
/* eslint-disable */
export class PatchPrediction {
  constructor(produce, cropState, doneEstimate, stage, stages) {
    if (this.produce === undefined) {
      this.produce = null
    }
    if (this.cropState === undefined) {
      this.cropState = null
    }
    if (this.doneEstimate === undefined) {
      this.doneEstimate = 0
    }
    if (this.stage === undefined) {
      this.stage = 0
    }
    if (this.stages === undefined) {
      this.stages = 0
    }
    this.produce = produce
    this.cropState = cropState
    this.doneEstimate = doneEstimate
    this.stage = stage
    this.stages = stages
  }
  getProduce() {
    return this.produce
  }
  getCropState() {
    return this.cropState
  }
  getDoneEstimate() {
    return this.doneEstimate
  }
  getStage() {
    return this.stage
  }
  getStages() {
    return this.stages
  }
}
PatchPrediction['__class'] = 'timetracking.PatchPrediction'
