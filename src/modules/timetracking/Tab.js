// @ts-nocheck
/* eslint-disable */
import { ItemID } from './ItemID'
export var Tab
;(function (Tab) {
  Tab[(Tab['OVERVIEW'] = 0)] = 'OVERVIEW'
  Tab[(Tab['CLOCK'] = 1)] = 'CLOCK'
  Tab[(Tab['BIRD_HOUSE'] = 2)] = 'BIRD_HOUSE'
  Tab[(Tab['ALLOTMENT'] = 3)] = 'ALLOTMENT'
  Tab[(Tab['FLOWER'] = 4)] = 'FLOWER'
  Tab[(Tab['HERB'] = 5)] = 'HERB'
  Tab[(Tab['TREE'] = 6)] = 'TREE'
  Tab[(Tab['FRUIT_TREE'] = 7)] = 'FRUIT_TREE'
  Tab[(Tab['HOPS'] = 8)] = 'HOPS'
  Tab[(Tab['BUSH'] = 9)] = 'BUSH'
  Tab[(Tab['GRAPE'] = 10)] = 'GRAPE'
  Tab[(Tab['SPECIAL'] = 11)] = 'SPECIAL'
})(Tab || (Tab = {}))
/** @ignore */
export class Tab_$WRAPPER {
  constructor(_$ordinal, _$name, name, itemID) {
    this._$ordinal = _$ordinal
    this._$name = _$name
    if (this.__name === undefined) this.__name = null
    if (this.itemID === undefined) this.itemID = 0
    this.__name = name
    this.itemID = itemID
  }
  static FARMING_TABS_$LI$() {
    if (Tab_$WRAPPER.FARMING_TABS == null)
      Tab_$WRAPPER.FARMING_TABS = [
        Tab.HERB,
        Tab.TREE,
        Tab.FRUIT_TREE,
        Tab.SPECIAL,
        Tab.FLOWER,
        Tab.ALLOTMENT,
        Tab.BUSH,
        Tab.GRAPE,
        Tab.HOPS
      ]
    return Tab_$WRAPPER.FARMING_TABS
  }
  getName() {
    return this.__name
  }
  getItemID() {
    return this.itemID
  }
  name() {
    return this._$name
  }
  ordinal() {
    return this._$ordinal
  }
}
Tab['__class'] = 'timetracking.Tab'
Tab['__interfaces'] = ['java.lang.Comparable', 'java.io.Serializable']
Tab['_$wrappers'] = [
  new Tab_$WRAPPER(0, 'OVERVIEW', 'Overview', ItemID.OLD_NOTES),
  new Tab_$WRAPPER(1, 'CLOCK', 'Timers & Stopwatches', ItemID.WATCH),
  new Tab_$WRAPPER(2, 'BIRD_HOUSE', 'Bird Houses', ItemID.OAK_BIRD_HOUSE),
  new Tab_$WRAPPER(3, 'ALLOTMENT', 'Allotment Patches', ItemID.CABBAGE),
  new Tab_$WRAPPER(4, 'FLOWER', 'Flower Patches', ItemID.RED_FLOWERS),
  new Tab_$WRAPPER(5, 'HERB', 'Herb Patches', ItemID.GRIMY_RANARR_WEED),
  new Tab_$WRAPPER(6, 'TREE', 'Tree Patches', ItemID.YEW_LOGS),
  new Tab_$WRAPPER(7, 'FRUIT_TREE', 'Fruit Tree Patches', ItemID.PINEAPPLE),
  new Tab_$WRAPPER(8, 'HOPS', 'Hops Patches', ItemID.BARLEY),
  new Tab_$WRAPPER(9, 'BUSH', 'Bush Patches', ItemID.POISON_IVY_BERRIES),
  new Tab_$WRAPPER(10, 'GRAPE', 'Grape Patches', ItemID.GRAPES),
  new Tab_$WRAPPER(11, 'SPECIAL', 'Special Patches', ItemID.MUSHROOM)
]
Tab_$WRAPPER.FARMING_TABS_$LI$()
