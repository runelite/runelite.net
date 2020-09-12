// @ts-nocheck
/* eslint-disable */
import { BirdHouse } from './BirdHouse'
export var BirdHouseState
;(function (BirdHouseState) {
  BirdHouseState[(BirdHouseState['SEEDED'] = 0)] = 'SEEDED'
  BirdHouseState[(BirdHouseState['BUILT'] = 1)] = 'BUILT'
  BirdHouseState[(BirdHouseState['EMPTY'] = 2)] = 'EMPTY'
  BirdHouseState[(BirdHouseState['UNKNOWN'] = 3)] = 'UNKNOWN'
})(BirdHouseState || (BirdHouseState = {}))
/** @ignore */
export class BirdHouseState_$WRAPPER {
  constructor(_$ordinal, _$name) {
    this._$ordinal = _$ordinal
    this._$name = _$name
  }
  /**
   * Gets the {@code BirdHouseState} corresponding to the given {@code VarPlayer} value.
   * @param {number} varp
   * @return {BirdHouseState}
   */
  static fromVarpValue(varp) {
    if (
      varp < 0 ||
      varp >
        /* Enum.values */ (function () {
          let result = []
          for (let val in BirdHouse) {
            if (!isNaN(val)) {
              result.push(parseInt(val, 10))
            }
          }
          return result
        })().length *
          3
    ) {
      return BirdHouseState.UNKNOWN
    } else if (varp === 0) {
      return BirdHouseState.EMPTY
    } else if (varp % 3 === 0) {
      return BirdHouseState.SEEDED
    } else {
      return BirdHouseState.BUILT
    }
  }
  name() {
    return this._$name
  }
  ordinal() {
    return this._$ordinal
  }
}
BirdHouseState['__class'] = 'timetracking.BirdHouseState'
BirdHouseState['__interfaces'] = [
  'java.lang.Comparable',
  'java.io.Serializable'
]
BirdHouseState['_$wrappers'] = [
  new BirdHouseState_$WRAPPER(0, 'SEEDED'),
  new BirdHouseState_$WRAPPER(1, 'BUILT'),
  new BirdHouseState_$WRAPPER(2, 'EMPTY'),
  new BirdHouseState_$WRAPPER(3, 'UNKNOWN')
]
