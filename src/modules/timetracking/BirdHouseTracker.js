// @ts-nocheck
/* eslint-disable */
import { BirdHouseSpace } from './BirdHouseSpace'
import { BirdHouseData } from './BirdHouseData'
import { VarPlayer } from './VarPlayer'
export class BirdHouseTracker {
  loadFromConfig(
    configGroup,
    birdHouseConfigGroup,
    username,
    getConfiguration
  ) {
    let birdHouseData = new Map()
    let group = configGroup + '.' + username + '.' + birdHouseConfigGroup
    for (
      let i = 0;
      i <
      /* Enum.values */ (function () {
        let result = []
        for (let val in BirdHouseSpace) {
          if (!isNaN(val)) {
            result.push(parseInt(val, 10))
          }
        }
        return result
      })().length;
      i++
    ) {
      {
        let space = (function () {
          let result = []
          for (let val in BirdHouseSpace) {
            if (!isNaN(val)) {
              result.push(parseInt(val, 10))
            }
          }
          return result
        })()[i]
        let key =
          '' +
          VarPlayer['_$wrappers'][
            BirdHouseSpace['_$wrappers'][space].getVarp()
          ].getId()
        let storedValue = (target =>
          typeof target === 'function'
            ? target(group, key)
            : target.apply(group, key))(getConfiguration)
        let updated = false
        if (storedValue != null) {
          let parts = storedValue.split(':')
          if (parts.length === 2) {
            try {
              let varp = parseInt(parts[0])
              let timestamp = parseInt(parts[1])
              birdHouseData.set(
                space,
                new BirdHouseData(space, varp, timestamp)
              )
              updated = true
            } catch (e) {}
          }
        }
        if (!updated) {
          birdHouseData.set(space, null)
        }
      }
    }
    return birdHouseData
  }
}
BirdHouseTracker['__class'] = 'timetracking.BirdHouseTracker'
