// @ts-nocheck
/* eslint-disable */
import { ItemID } from './ItemID'
export var BirdHouse
;(function (BirdHouse) {
  BirdHouse[(BirdHouse['NORMAL'] = 0)] = 'NORMAL'
  BirdHouse[(BirdHouse['OAK'] = 1)] = 'OAK'
  BirdHouse[(BirdHouse['WILLOW'] = 2)] = 'WILLOW'
  BirdHouse[(BirdHouse['TEAK'] = 3)] = 'TEAK'
  BirdHouse[(BirdHouse['MAPLE'] = 4)] = 'MAPLE'
  BirdHouse[(BirdHouse['MAHOGANY'] = 5)] = 'MAHOGANY'
  BirdHouse[(BirdHouse['YEW'] = 6)] = 'YEW'
  BirdHouse[(BirdHouse['MAGIC'] = 7)] = 'MAGIC'
  BirdHouse[(BirdHouse['REDWOOD'] = 8)] = 'REDWOOD'
})(BirdHouse || (BirdHouse = {}))
/** @ignore */
export class BirdHouse_$WRAPPER {
  constructor(_$ordinal, _$name, name, itemID) {
    this._$ordinal = _$ordinal
    this._$name = _$name
    if (this.__name === undefined) {
      this.__name = null
    }
    if (this.itemID === undefined) {
      this.itemID = 0
    }
    this.__name = name
    this.itemID = itemID
  }
  getName() {
    return this.__name
  }
  getItemID() {
    return this.itemID
  }
  /**
   * Gets the {@code BirdHouse} corresponding to the given {@code VarPlayer} value.
   * @param {number} varp
   * @return {BirdHouse}
   */
  static fromVarpValue(varp) {
    const index = ((varp - 1) / 3) | 0
    if (
      varp <= 0 ||
      index >=
        /* Enum.values */ (function () {
          let result = []
          for (let val in BirdHouse) {
            if (!isNaN(val)) {
              result.push(parseInt(val, 10))
            }
          }
          return result
        })().length
    ) {
      return null
    }
    return /* Enum.values */ (function () {
      let result = []
      for (let val in BirdHouse) {
        if (!isNaN(val)) {
          result.push(parseInt(val, 10))
        }
      }
      return result
    })()[index]
  }
  name() {
    return this._$name
  }
  ordinal() {
    return this._$ordinal
  }
  compareTo(other) {
    return this._$ordinal - (isNaN(other) ? other._$ordinal : other)
  }
}
BirdHouse['__class'] = 'timetracking.BirdHouse'
BirdHouse['_$wrappers'] = {
  0: new BirdHouse_$WRAPPER(0, 'NORMAL', 'Bird House', ItemID.BIRD_HOUSE),
  1: new BirdHouse_$WRAPPER(1, 'OAK', 'Oak Bird House', ItemID.OAK_BIRD_HOUSE),
  2: new BirdHouse_$WRAPPER(
    2,
    'WILLOW',
    'Willow Bird House',
    ItemID.WILLOW_BIRD_HOUSE
  ),
  3: new BirdHouse_$WRAPPER(
    3,
    'TEAK',
    'Teak Bird House',
    ItemID.TEAK_BIRD_HOUSE
  ),
  4: new BirdHouse_$WRAPPER(
    4,
    'MAPLE',
    'Maple Bird House',
    ItemID.MAPLE_BIRD_HOUSE
  ),
  5: new BirdHouse_$WRAPPER(
    5,
    'MAHOGANY',
    'Mahogany Bird House',
    ItemID.MAHOGANY_BIRD_HOUSE
  ),
  6: new BirdHouse_$WRAPPER(6, 'YEW', 'Yew Bird House', ItemID.YEW_BIRD_HOUSE),
  7: new BirdHouse_$WRAPPER(
    7,
    'MAGIC',
    'Magic Bird House',
    ItemID.MAGIC_BIRD_HOUSE
  ),
  8: new BirdHouse_$WRAPPER(
    8,
    'REDWOOD',
    'Redwood Bird House',
    ItemID.REDWOOD_BIRD_HOUSE
  )
}
