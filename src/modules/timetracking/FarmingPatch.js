// @ts-nocheck
/* eslint-disable */
export class FarmingPatch {
  constructor(name, varbit, implementation) {
    if (this.region === undefined) {
      this.region = null
    }
    if (this.name === undefined) {
      this.name = null
    }
    if (this.varbit === undefined) {
      this.varbit = 0
    }
    if (this.implementation === undefined) {
      this.implementation = null
    }
    this.name = name
    this.varbit = varbit
    this.implementation = implementation
  }
  getName() {
    return this.name
  }
  getVarbit() {
    return this.varbit
  }
  getImplementation() {
    return this.implementation
  }
  getRegion() {
    return this.region
  }
  setRegion(region) {
    this.region = region
  }
}
FarmingPatch['__class'] = 'timetracking.FarmingPatch'
