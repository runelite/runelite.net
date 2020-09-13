// @ts-nocheck
/* eslint-disable */
/**
 * Server controlled "content-developer" integers.
 *
 * VarPlayers are stored per RuneScape player save, and synchronized
 * from the server to the client. The client can change them preemptively
 * if it thinks they will change the next tick as a lag-hiding measure.
 * The client CANNOT directly make the server change a varbit.
 * @enum
 * @property {VarPlayer} BIRD_HOUSE_MEADOW_NORTH
 * Bird house states
 * @property {VarPlayer} BIRD_HOUSE_MEADOW_SOUTH
 * @property {VarPlayer} BIRD_HOUSE_VALLEY_NORTH
 * @property {VarPlayer} BIRD_HOUSE_VALLEY_SOUTH
 * @class
 */
export var VarPlayer
;(function (VarPlayer) {
  /**
   * Bird house states
   */
  VarPlayer[(VarPlayer['BIRD_HOUSE_MEADOW_NORTH'] = 0)] =
    'BIRD_HOUSE_MEADOW_NORTH'
  VarPlayer[(VarPlayer['BIRD_HOUSE_MEADOW_SOUTH'] = 1)] =
    'BIRD_HOUSE_MEADOW_SOUTH'
  VarPlayer[(VarPlayer['BIRD_HOUSE_VALLEY_NORTH'] = 2)] =
    'BIRD_HOUSE_VALLEY_NORTH'
  VarPlayer[(VarPlayer['BIRD_HOUSE_VALLEY_SOUTH'] = 3)] =
    'BIRD_HOUSE_VALLEY_SOUTH'
})(VarPlayer || (VarPlayer = {}))
/** @ignore */
export class VarPlayer_$WRAPPER {
  constructor(_$ordinal, _$name, id) {
    this._$ordinal = _$ordinal
    this._$name = _$name
    if (this.id === undefined) this.id = 0
    this.id = id
  }
  getId() {
    return this.id
  }
  name() {
    return this._$name
  }
  ordinal() {
    return this._$ordinal
  }
}
VarPlayer['__class'] = 'timetracking.VarPlayer'
VarPlayer['__interfaces'] = ['java.lang.Comparable', 'java.io.Serializable']
VarPlayer['_$wrappers'] = [
  new VarPlayer_$WRAPPER(0, 'BIRD_HOUSE_MEADOW_NORTH', 1626),
  new VarPlayer_$WRAPPER(1, 'BIRD_HOUSE_MEADOW_SOUTH', 1627),
  new VarPlayer_$WRAPPER(2, 'BIRD_HOUSE_VALLEY_NORTH', 1628),
  new VarPlayer_$WRAPPER(3, 'BIRD_HOUSE_VALLEY_SOUTH', 1629)
]
