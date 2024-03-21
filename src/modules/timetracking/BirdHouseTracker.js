// @ts-nocheck
/* eslint-disable */
export class BirdHouseTracker {
  loadFromConfig(getConfiguration) {
    const birdHouseData = new Map()
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
        const space = (function () {
          let result = []
          for (let val in BirdHouseSpace) {
            if (!isNaN(val)) {
              result.push(parseInt(val, 10))
            }
          }
          return result
        })()[i]
        const key =
          TimeTrackingConfig.BIRD_HOUSE +
          '.' +
          BirdHouseSpace['_$wrappers'][space].getVarp()
        const storedValue = (target =>
          typeof target === 'function'
            ? target(TimeTrackingConfig.CONFIG_GROUP, key)
            : target.apply(TimeTrackingConfig.CONFIG_GROUP, key))(
          getConfiguration
        )
        let updated = false
        if (storedValue != null) {
          const parts = storedValue.split(':')
          if (parts.length === 2) {
            try {
              const varp = parseInt(parts[0])
              const timestamp = parseInt(parts[1])
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
import { TimeTrackingConfig } from './TimeTrackingConfig'
import { BirdHouseData } from './BirdHouseData'
import { BirdHouseSpace } from './BirdHouseSpace'
