// @ts-nocheck
/* eslint-disable */
import { VarPlayer } from './VarPlayer'
export var BirdHouseSpace
;(function (BirdHouseSpace) {
  BirdHouseSpace[(BirdHouseSpace['MEADOW_NORTH'] = 0)] = 'MEADOW_NORTH'
  BirdHouseSpace[(BirdHouseSpace['MEADOW_SOUTH'] = 1)] = 'MEADOW_SOUTH'
  BirdHouseSpace[(BirdHouseSpace['VALLEY_NORTH'] = 2)] = 'VALLEY_NORTH'
  BirdHouseSpace[(BirdHouseSpace['VALLEY_SOUTH'] = 3)] = 'VALLEY_SOUTH'
})(BirdHouseSpace || (BirdHouseSpace = {}))
/** @ignore */
export class BirdHouseSpace_$WRAPPER {
  constructor(_$ordinal, _$name, name, varp) {
    this._$ordinal = _$ordinal
    this._$name = _$name
    if (this.__name === undefined) {
      this.__name = null
    }
    if (this.varp === undefined) {
      this.varp = 0
    }
    this.__name = name
    this.varp = varp
  }
  getName() {
    return this.__name
  }
  getVarp() {
    return this.varp
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
BirdHouseSpace['__class'] = 'timetracking.BirdHouseSpace'
BirdHouseSpace['_$wrappers'] = {
  0: new BirdHouseSpace_$WRAPPER(
    0,
    'MEADOW_NORTH',
    'Mushroom Meadow (North)',
    VarPlayer.BIRD_HOUSE_MEADOW_NORTH
  ),
  1: new BirdHouseSpace_$WRAPPER(
    1,
    'MEADOW_SOUTH',
    'Mushroom Meadow (South)',
    VarPlayer.BIRD_HOUSE_MEADOW_SOUTH
  ),
  2: new BirdHouseSpace_$WRAPPER(
    2,
    'VALLEY_NORTH',
    'Verdant Valley (Northeast)',
    VarPlayer.BIRD_HOUSE_VALLEY_NORTH
  ),
  3: new BirdHouseSpace_$WRAPPER(
    3,
    'VALLEY_SOUTH',
    'Verdant Valley (Southwest)',
    VarPlayer.BIRD_HOUSE_VALLEY_SOUTH
  )
}
