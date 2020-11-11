// @ts-nocheck
/* eslint-disable */
/**
 * Contains data about the state of a particular {@link BirdHouseSpace}, at a particular point in time.
 * @param {BirdHouseSpace} space
 * @param {number} varp
 * @param {number} timestamp
 * @class
 */
export class BirdHouseData {
  constructor(space, varp, timestamp) {
    if (this.space === undefined) {
      this.space = null
    }
    if (this.varp === undefined) {
      this.varp = 0
    }
    if (this.timestamp === undefined) {
      this.timestamp = 0
    }
    this.space = space
    this.varp = varp
    this.timestamp = timestamp
  }
  getSpace() {
    return this.space
  }
  getVarp() {
    return this.varp
  }
  getTimestamp() {
    return this.timestamp
  }
}
BirdHouseData['__class'] = 'timetracking.BirdHouseData'
