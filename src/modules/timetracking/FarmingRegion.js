// @ts-nocheck
/* eslint-disable */
export class FarmingRegion {
  constructor(name, regionID, ...patches) {
    if (this.name === undefined) this.name = null
    if (this.regionID === undefined) this.regionID = 0
    if (this.patches === undefined) this.patches = null
    if (this.varbits === undefined) this.varbits = null
    this.name = name
    this.regionID = regionID
    this.patches = patches
    this.varbits = (s => {
      let a = []
      while (s-- > 0) a.push(null)
      return a
    })(patches.length)
    for (let i = 0; i < patches.length; i++) {
      {
        let p = patches[i]
        p.setRegion(this)
        this.varbits[i] = p.getVarbit()
      }
    }
  }
  getName() {
    return this.name
  }
  getRegionID() {
    return this.regionID
  }
  getPatches() {
    return this.patches
  }
  getVarbits() {
    return this.varbits
  }
}
FarmingRegion['__class'] = 'timetracking.FarmingRegion'
