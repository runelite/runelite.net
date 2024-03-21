// @ts-nocheck
/* eslint-disable */
import { Tab } from './Tab'
import { PatchState } from './PatchState'
import { CropState } from './CropState'
import { ItemID } from './ItemID'
import { NullItemID } from './NullItemID'
export var PatchImplementation
;(function (PatchImplementation) {
  PatchImplementation[(PatchImplementation['BELLADONNA'] = 0)] = 'BELLADONNA'
  PatchImplementation[(PatchImplementation['MUSHROOM'] = 1)] = 'MUSHROOM'
  PatchImplementation[(PatchImplementation['HESPORI'] = 2)] = 'HESPORI'
  PatchImplementation[(PatchImplementation['ALLOTMENT'] = 3)] = 'ALLOTMENT'
  PatchImplementation[(PatchImplementation['HERB'] = 4)] = 'HERB'
  PatchImplementation[(PatchImplementation['FLOWER'] = 5)] = 'FLOWER'
  PatchImplementation[(PatchImplementation['BUSH'] = 6)] = 'BUSH'
  PatchImplementation[(PatchImplementation['FRUIT_TREE'] = 7)] = 'FRUIT_TREE'
  PatchImplementation[(PatchImplementation['HOPS'] = 8)] = 'HOPS'
  PatchImplementation[(PatchImplementation['TREE'] = 9)] = 'TREE'
  PatchImplementation[(PatchImplementation['HARDWOOD_TREE'] = 10)] =
    'HARDWOOD_TREE'
  PatchImplementation[(PatchImplementation['REDWOOD'] = 11)] = 'REDWOOD'
  PatchImplementation[(PatchImplementation['SPIRIT_TREE'] = 12)] = 'SPIRIT_TREE'
  PatchImplementation[(PatchImplementation['ANIMA'] = 13)] = 'ANIMA'
  PatchImplementation[(PatchImplementation['CACTUS'] = 14)] = 'CACTUS'
  PatchImplementation[(PatchImplementation['SEAWEED'] = 15)] = 'SEAWEED'
  PatchImplementation[(PatchImplementation['CALQUAT'] = 16)] = 'CALQUAT'
  PatchImplementation[(PatchImplementation['CELASTRUS'] = 17)] = 'CELASTRUS'
  PatchImplementation[(PatchImplementation['GRAPES'] = 18)] = 'GRAPES'
  PatchImplementation[(PatchImplementation['CRYSTAL_TREE'] = 19)] =
    'CRYSTAL_TREE'
  PatchImplementation[(PatchImplementation['COMPOST'] = 20)] = 'COMPOST'
  PatchImplementation[(PatchImplementation['BIG_COMPOST'] = 21)] = 'BIG_COMPOST'
})(PatchImplementation || (PatchImplementation = {}))
/** @ignore */
export class PatchImplementation_$WRAPPER {
  constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
    this._$ordinal = _$ordinal
    this._$name = _$name
    if (this.tab === undefined) {
      this.tab = null
    }
    if (this.__name === undefined) {
      this.__name = null
    }
    this.tab = tab
    this.__name = name
  }
  getTab() {
    return this.tab
  }
  getName() {
    return this.__name
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
PatchImplementation['__class'] = 'timetracking.PatchImplementation'
;(function (PatchImplementation) {
  let Produce
  ;(function (Produce) {
    Produce[(Produce['WEEDS'] = 0)] = 'WEEDS'
    Produce[(Produce['SCARECROW'] = 1)] = 'SCARECROW'
    Produce[(Produce['POTATO'] = 2)] = 'POTATO'
    Produce[(Produce['ONION'] = 3)] = 'ONION'
    Produce[(Produce['CABBAGE'] = 4)] = 'CABBAGE'
    Produce[(Produce['TOMATO'] = 5)] = 'TOMATO'
    Produce[(Produce['SWEETCORN'] = 6)] = 'SWEETCORN'
    Produce[(Produce['STRAWBERRY'] = 7)] = 'STRAWBERRY'
    Produce[(Produce['WATERMELON'] = 8)] = 'WATERMELON'
    Produce[(Produce['SNAPE_GRASS'] = 9)] = 'SNAPE_GRASS'
    Produce[(Produce['MARIGOLD'] = 10)] = 'MARIGOLD'
    Produce[(Produce['ROSEMARY'] = 11)] = 'ROSEMARY'
    Produce[(Produce['NASTURTIUM'] = 12)] = 'NASTURTIUM'
    Produce[(Produce['WOAD'] = 13)] = 'WOAD'
    Produce[(Produce['LIMPWURT'] = 14)] = 'LIMPWURT'
    Produce[(Produce['WHITE_LILY'] = 15)] = 'WHITE_LILY'
    Produce[(Produce['REDBERRIES'] = 16)] = 'REDBERRIES'
    Produce[(Produce['CADAVABERRIES'] = 17)] = 'CADAVABERRIES'
    Produce[(Produce['DWELLBERRIES'] = 18)] = 'DWELLBERRIES'
    Produce[(Produce['JANGERBERRIES'] = 19)] = 'JANGERBERRIES'
    Produce[(Produce['WHITEBERRIES'] = 20)] = 'WHITEBERRIES'
    Produce[(Produce['POISON_IVY'] = 21)] = 'POISON_IVY'
    Produce[(Produce['BARLEY'] = 22)] = 'BARLEY'
    Produce[(Produce['HAMMERSTONE'] = 23)] = 'HAMMERSTONE'
    Produce[(Produce['ASGARNIAN'] = 24)] = 'ASGARNIAN'
    Produce[(Produce['JUTE'] = 25)] = 'JUTE'
    Produce[(Produce['YANILLIAN'] = 26)] = 'YANILLIAN'
    Produce[(Produce['KRANDORIAN'] = 27)] = 'KRANDORIAN'
    Produce[(Produce['WILDBLOOD'] = 28)] = 'WILDBLOOD'
    Produce[(Produce['GUAM'] = 29)] = 'GUAM'
    Produce[(Produce['MARRENTILL'] = 30)] = 'MARRENTILL'
    Produce[(Produce['TARROMIN'] = 31)] = 'TARROMIN'
    Produce[(Produce['HARRALANDER'] = 32)] = 'HARRALANDER'
    Produce[(Produce['RANARR'] = 33)] = 'RANARR'
    Produce[(Produce['TOADFLAX'] = 34)] = 'TOADFLAX'
    Produce[(Produce['IRIT'] = 35)] = 'IRIT'
    Produce[(Produce['AVANTOE'] = 36)] = 'AVANTOE'
    Produce[(Produce['KWUARM'] = 37)] = 'KWUARM'
    Produce[(Produce['SNAPDRAGON'] = 38)] = 'SNAPDRAGON'
    Produce[(Produce['CADANTINE'] = 39)] = 'CADANTINE'
    Produce[(Produce['LANTADYME'] = 40)] = 'LANTADYME'
    Produce[(Produce['DWARF_WEED'] = 41)] = 'DWARF_WEED'
    Produce[(Produce['TORSTOL'] = 42)] = 'TORSTOL'
    Produce[(Produce['GOUTWEED'] = 43)] = 'GOUTWEED'
    Produce[(Produce['ANYHERB'] = 44)] = 'ANYHERB'
    Produce[(Produce['OAK'] = 45)] = 'OAK'
    Produce[(Produce['WILLOW'] = 46)] = 'WILLOW'
    Produce[(Produce['MAPLE'] = 47)] = 'MAPLE'
    Produce[(Produce['YEW'] = 48)] = 'YEW'
    Produce[(Produce['MAGIC'] = 49)] = 'MAGIC'
    Produce[(Produce['APPLE'] = 50)] = 'APPLE'
    Produce[(Produce['BANANA'] = 51)] = 'BANANA'
    Produce[(Produce['ORANGE'] = 52)] = 'ORANGE'
    Produce[(Produce['CURRY'] = 53)] = 'CURRY'
    Produce[(Produce['PINEAPPLE'] = 54)] = 'PINEAPPLE'
    Produce[(Produce['PAPAYA'] = 55)] = 'PAPAYA'
    Produce[(Produce['PALM'] = 56)] = 'PALM'
    Produce[(Produce['DRAGONFRUIT'] = 57)] = 'DRAGONFRUIT'
    Produce[(Produce['CACTUS'] = 58)] = 'CACTUS'
    Produce[(Produce['POTATO_CACTUS'] = 59)] = 'POTATO_CACTUS'
    Produce[(Produce['TEAK'] = 60)] = 'TEAK'
    Produce[(Produce['MAHOGANY'] = 61)] = 'MAHOGANY'
    Produce[(Produce['ATTAS'] = 62)] = 'ATTAS'
    Produce[(Produce['IASOR'] = 63)] = 'IASOR'
    Produce[(Produce['KRONOS'] = 64)] = 'KRONOS'
    Produce[(Produce['SEAWEED'] = 65)] = 'SEAWEED'
    Produce[(Produce['GRAPE'] = 66)] = 'GRAPE'
    Produce[(Produce['MUSHROOM'] = 67)] = 'MUSHROOM'
    Produce[(Produce['BELLADONNA'] = 68)] = 'BELLADONNA'
    Produce[(Produce['CALQUAT'] = 69)] = 'CALQUAT'
    Produce[(Produce['SPIRIT_TREE'] = 70)] = 'SPIRIT_TREE'
    Produce[(Produce['CELASTRUS'] = 71)] = 'CELASTRUS'
    Produce[(Produce['REDWOOD'] = 72)] = 'REDWOOD'
    Produce[(Produce['HESPORI'] = 73)] = 'HESPORI'
    Produce[(Produce['CRYSTAL_TREE'] = 74)] = 'CRYSTAL_TREE'
    Produce[(Produce['EMPTY_COMPOST_BIN'] = 75)] = 'EMPTY_COMPOST_BIN'
    Produce[(Produce['COMPOST'] = 76)] = 'COMPOST'
    Produce[(Produce['SUPERCOMPOST'] = 77)] = 'SUPERCOMPOST'
    Produce[(Produce['ULTRACOMPOST'] = 78)] = 'ULTRACOMPOST'
    Produce[(Produce['ROTTEN_TOMATO'] = 79)] = 'ROTTEN_TOMATO'
    Produce[(Produce['EMPTY_BIG_COMPOST_BIN'] = 80)] = 'EMPTY_BIG_COMPOST_BIN'
    Produce[(Produce['BIG_COMPOST'] = 81)] = 'BIG_COMPOST'
    Produce[(Produce['BIG_SUPERCOMPOST'] = 82)] = 'BIG_SUPERCOMPOST'
    Produce[(Produce['BIG_ULTRACOMPOST'] = 83)] = 'BIG_ULTRACOMPOST'
    Produce[(Produce['BIG_ROTTEN_TOMATO'] = 84)] = 'BIG_ROTTEN_TOMATO'
  })(
    (Produce =
      PatchImplementation.Produce || (PatchImplementation.Produce = {}))
  )
  /** @ignore */
  class Produce_$WRAPPER {
    constructor(
      _$ordinal,
      _$name,
      name,
      patchImplementation,
      itemID,
      tickrate,
      stages,
      regrowTickrate,
      harvestStages
    ) {
      this._$ordinal = _$ordinal
      this._$name = _$name
      if (
        (typeof name === 'string' || name === null) &&
        (typeof patchImplementation === 'number' ||
          patchImplementation === null) &&
        (typeof itemID === 'number' || itemID === null) &&
        (typeof tickrate === 'number' || tickrate === null) &&
        (typeof stages === 'number' || stages === null) &&
        (typeof regrowTickrate === 'number' || regrowTickrate === null) &&
        (typeof harvestStages === 'number' || harvestStages === null)
      ) {
        let __args = arguments
        if (this.__name === undefined) {
          this.__name = null
        }
        if (this.patchImplementation === undefined) {
          this.patchImplementation = null
        }
        if (this.itemID === undefined) {
          this.itemID = 0
        }
        if (this.tickrate === undefined) {
          this.tickrate = 0
        }
        if (this.stages === undefined) {
          this.stages = 0
        }
        if (this.regrowTickrate === undefined) {
          this.regrowTickrate = 0
        }
        if (this.harvestStages === undefined) {
          this.harvestStages = 0
        }
        this.__name = name
        this.patchImplementation = patchImplementation
        this.itemID = itemID
        this.tickrate = tickrate
        this.stages = stages
        this.regrowTickrate = regrowTickrate
        this.harvestStages = harvestStages
      } else if (
        (typeof name === 'string' || name === null) &&
        (typeof patchImplementation === 'number' ||
          patchImplementation === null) &&
        (typeof itemID === 'number' || itemID === null) &&
        (typeof tickrate === 'number' || tickrate === null) &&
        (typeof stages === 'number' || stages === null) &&
        regrowTickrate === undefined &&
        harvestStages === undefined
      ) {
        let __args = arguments
        {
          let __args = arguments
          let regrowTickrate = 0
          let harvestStages = 1
          if (this.__name === undefined) {
            this.__name = null
          }
          if (this.patchImplementation === undefined) {
            this.patchImplementation = null
          }
          if (this.itemID === undefined) {
            this.itemID = 0
          }
          if (this.tickrate === undefined) {
            this.tickrate = 0
          }
          if (this.stages === undefined) {
            this.stages = 0
          }
          if (this.regrowTickrate === undefined) {
            this.regrowTickrate = 0
          }
          if (this.harvestStages === undefined) {
            this.harvestStages = 0
          }
          this.__name = name
          this.patchImplementation = patchImplementation
          this.itemID = itemID
          this.tickrate = tickrate
          this.stages = stages
          this.regrowTickrate = regrowTickrate
          this.harvestStages = harvestStages
        }
        if (this.__name === undefined) {
          this.__name = null
        }
        if (this.patchImplementation === undefined) {
          this.patchImplementation = null
        }
        if (this.itemID === undefined) {
          this.itemID = 0
        }
        if (this.tickrate === undefined) {
          this.tickrate = 0
        }
        if (this.stages === undefined) {
          this.stages = 0
        }
        if (this.regrowTickrate === undefined) {
          this.regrowTickrate = 0
        }
        if (this.harvestStages === undefined) {
          this.harvestStages = 0
        }
      } else throw new Error('invalid overload')
    }
    getName() {
      return this.__name
    }
    getItemID() {
      return this.itemID
    }
    getTickrate() {
      return this.tickrate
    }
    getStages() {
      return this.stages
    }
    getRegrowTickrate() {
      return this.regrowTickrate
    }
    getHarvestStages() {
      return this.harvestStages
    }
    getPatchImplementation() {
      return this.patchImplementation
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
  PatchImplementation.Produce_$WRAPPER = Produce_$WRAPPER
  Produce['__class'] = 'timetracking.PatchImplementation.Produce'
  Produce['_$wrappers'] = {
    0: new Produce_$WRAPPER(0, 'WEEDS', 'Weeds', null, ItemID.WEEDS, 5, 4),
    1: new Produce_$WRAPPER(
      1,
      'SCARECROW',
      'Scarecrow',
      null,
      ItemID.SCARECROW,
      5,
      4
    ),
    2: new Produce_$WRAPPER(
      2,
      'POTATO',
      'Potato',
      PatchImplementation.ALLOTMENT,
      ItemID.POTATO,
      10,
      5,
      0,
      3
    ),
    3: new Produce_$WRAPPER(
      3,
      'ONION',
      'Onion',
      PatchImplementation.ALLOTMENT,
      ItemID.ONION,
      10,
      5,
      0,
      3
    ),
    4: new Produce_$WRAPPER(
      4,
      'CABBAGE',
      'Cabbage',
      PatchImplementation.ALLOTMENT,
      ItemID.CABBAGE,
      10,
      5,
      0,
      3
    ),
    5: new Produce_$WRAPPER(
      5,
      'TOMATO',
      'Tomato',
      PatchImplementation.ALLOTMENT,
      ItemID.TOMATO,
      10,
      5,
      0,
      3
    ),
    6: new Produce_$WRAPPER(
      6,
      'SWEETCORN',
      'Sweetcorn',
      PatchImplementation.ALLOTMENT,
      ItemID.SWEETCORN,
      10,
      7,
      0,
      3
    ),
    7: new Produce_$WRAPPER(
      7,
      'STRAWBERRY',
      'Strawberry',
      PatchImplementation.ALLOTMENT,
      ItemID.STRAWBERRY,
      10,
      7,
      0,
      3
    ),
    8: new Produce_$WRAPPER(
      8,
      'WATERMELON',
      'Watermelon',
      PatchImplementation.ALLOTMENT,
      ItemID.WATERMELON,
      10,
      9,
      0,
      3
    ),
    9: new Produce_$WRAPPER(
      9,
      'SNAPE_GRASS',
      'Snape grass',
      PatchImplementation.ALLOTMENT,
      ItemID.SNAPE_GRASS,
      10,
      8,
      0,
      3
    ),
    10: new Produce_$WRAPPER(
      10,
      'MARIGOLD',
      'Marigold',
      PatchImplementation.FLOWER,
      ItemID.MARIGOLDS,
      5,
      5
    ),
    11: new Produce_$WRAPPER(
      11,
      'ROSEMARY',
      'Rosemary',
      PatchImplementation.FLOWER,
      ItemID.ROSEMARY,
      5,
      5
    ),
    12: new Produce_$WRAPPER(
      12,
      'NASTURTIUM',
      'Nasturtium',
      PatchImplementation.FLOWER,
      ItemID.NASTURTIUMS,
      5,
      5
    ),
    13: new Produce_$WRAPPER(
      13,
      'WOAD',
      'Woad',
      PatchImplementation.FLOWER,
      ItemID.WOAD_LEAF,
      5,
      5
    ),
    14: new Produce_$WRAPPER(
      14,
      'LIMPWURT',
      'Limpwurt',
      PatchImplementation.FLOWER,
      ItemID.LIMPWURT_ROOT,
      5,
      5
    ),
    15: new Produce_$WRAPPER(
      15,
      'WHITE_LILY',
      'White lily',
      PatchImplementation.FLOWER,
      ItemID.WHITE_LILY,
      5,
      5
    ),
    16: new Produce_$WRAPPER(
      16,
      'REDBERRIES',
      'Redberry',
      PatchImplementation.BUSH,
      ItemID.REDBERRIES,
      20,
      6,
      20,
      5
    ),
    17: new Produce_$WRAPPER(
      17,
      'CADAVABERRIES',
      'Cadavaberry',
      PatchImplementation.BUSH,
      ItemID.CADAVA_BERRIES,
      20,
      7,
      20,
      5
    ),
    18: new Produce_$WRAPPER(
      18,
      'DWELLBERRIES',
      'Dwellberry',
      PatchImplementation.BUSH,
      ItemID.DWELLBERRIES,
      20,
      8,
      20,
      5
    ),
    19: new Produce_$WRAPPER(
      19,
      'JANGERBERRIES',
      'Jangerberry',
      PatchImplementation.BUSH,
      ItemID.JANGERBERRIES,
      20,
      9,
      20,
      5
    ),
    20: new Produce_$WRAPPER(
      20,
      'WHITEBERRIES',
      'Whiteberry',
      PatchImplementation.BUSH,
      ItemID.WHITE_BERRIES,
      20,
      9,
      20,
      5
    ),
    21: new Produce_$WRAPPER(
      21,
      'POISON_IVY',
      'Poison ivy',
      PatchImplementation.BUSH,
      ItemID.POISON_IVY_BERRIES,
      20,
      9,
      20,
      5
    ),
    22: new Produce_$WRAPPER(
      22,
      'BARLEY',
      'Barley',
      PatchImplementation.HOPS,
      ItemID.BARLEY,
      10,
      5,
      0,
      3
    ),
    23: new Produce_$WRAPPER(
      23,
      'HAMMERSTONE',
      'Hammerstone',
      PatchImplementation.HOPS,
      ItemID.HAMMERSTONE_HOPS,
      10,
      5,
      0,
      3
    ),
    24: new Produce_$WRAPPER(
      24,
      'ASGARNIAN',
      'Asgarnian',
      PatchImplementation.HOPS,
      ItemID.ASGARNIAN_HOPS,
      10,
      6,
      0,
      3
    ),
    25: new Produce_$WRAPPER(
      25,
      'JUTE',
      'Jute',
      PatchImplementation.HOPS,
      ItemID.JUTE_FIBRE,
      10,
      6,
      0,
      3
    ),
    26: new Produce_$WRAPPER(
      26,
      'YANILLIAN',
      'Yanillian',
      PatchImplementation.HOPS,
      ItemID.YANILLIAN_HOPS,
      10,
      7,
      0,
      3
    ),
    27: new Produce_$WRAPPER(
      27,
      'KRANDORIAN',
      'Krandorian',
      PatchImplementation.HOPS,
      ItemID.KRANDORIAN_HOPS,
      10,
      8,
      0,
      3
    ),
    28: new Produce_$WRAPPER(
      28,
      'WILDBLOOD',
      'Wildblood',
      PatchImplementation.HOPS,
      ItemID.WILDBLOOD_HOPS,
      10,
      9,
      0,
      3
    ),
    29: new Produce_$WRAPPER(
      29,
      'GUAM',
      'Guam',
      PatchImplementation.HERB,
      ItemID.GUAM_LEAF,
      20,
      5,
      0,
      3
    ),
    30: new Produce_$WRAPPER(
      30,
      'MARRENTILL',
      'Marrentill',
      PatchImplementation.HERB,
      ItemID.MARRENTILL,
      20,
      5,
      0,
      3
    ),
    31: new Produce_$WRAPPER(
      31,
      'TARROMIN',
      'Tarromin',
      PatchImplementation.HERB,
      ItemID.TARROMIN,
      20,
      5,
      0,
      3
    ),
    32: new Produce_$WRAPPER(
      32,
      'HARRALANDER',
      'Harralander',
      PatchImplementation.HERB,
      ItemID.HARRALANDER,
      20,
      5,
      0,
      3
    ),
    33: new Produce_$WRAPPER(
      33,
      'RANARR',
      'Ranarr',
      PatchImplementation.HERB,
      ItemID.RANARR_WEED,
      20,
      5,
      0,
      3
    ),
    34: new Produce_$WRAPPER(
      34,
      'TOADFLAX',
      'Toadflax',
      PatchImplementation.HERB,
      ItemID.TOADFLAX,
      20,
      5,
      0,
      3
    ),
    35: new Produce_$WRAPPER(
      35,
      'IRIT',
      'Irit',
      PatchImplementation.HERB,
      ItemID.IRIT_LEAF,
      20,
      5,
      0,
      3
    ),
    36: new Produce_$WRAPPER(
      36,
      'AVANTOE',
      'Avantoe',
      PatchImplementation.HERB,
      ItemID.AVANTOE,
      20,
      5,
      0,
      3
    ),
    37: new Produce_$WRAPPER(
      37,
      'KWUARM',
      'Kwuarm',
      PatchImplementation.HERB,
      ItemID.KWUARM,
      20,
      5,
      0,
      3
    ),
    38: new Produce_$WRAPPER(
      38,
      'SNAPDRAGON',
      'Snapdragon',
      PatchImplementation.HERB,
      ItemID.SNAPDRAGON,
      20,
      5,
      0,
      3
    ),
    39: new Produce_$WRAPPER(
      39,
      'CADANTINE',
      'Cadantine',
      PatchImplementation.HERB,
      ItemID.CADANTINE,
      20,
      5,
      0,
      3
    ),
    40: new Produce_$WRAPPER(
      40,
      'LANTADYME',
      'Lantadyme',
      PatchImplementation.HERB,
      ItemID.LANTADYME,
      20,
      5,
      0,
      3
    ),
    41: new Produce_$WRAPPER(
      41,
      'DWARF_WEED',
      'Dwarf weed',
      PatchImplementation.HERB,
      ItemID.DWARF_WEED,
      20,
      5,
      0,
      3
    ),
    42: new Produce_$WRAPPER(
      42,
      'TORSTOL',
      'Torstol',
      PatchImplementation.HERB,
      ItemID.TORSTOL,
      20,
      5,
      0,
      3
    ),
    43: new Produce_$WRAPPER(
      43,
      'GOUTWEED',
      'Goutweed',
      PatchImplementation.HERB,
      ItemID.GOUTWEED,
      20,
      5,
      0,
      2
    ),
    44: new Produce_$WRAPPER(
      44,
      'ANYHERB',
      'Any herb',
      PatchImplementation.HERB,
      ItemID.GUAM_LEAF,
      20,
      5,
      0,
      3
    ),
    45: new Produce_$WRAPPER(
      45,
      'OAK',
      'Oak',
      PatchImplementation.TREE,
      ItemID.OAK_LOGS,
      40,
      5
    ),
    46: new Produce_$WRAPPER(
      46,
      'WILLOW',
      'Willow',
      PatchImplementation.TREE,
      ItemID.WILLOW_LOGS,
      40,
      7
    ),
    47: new Produce_$WRAPPER(
      47,
      'MAPLE',
      'Maple',
      PatchImplementation.TREE,
      ItemID.MAPLE_LOGS,
      40,
      9
    ),
    48: new Produce_$WRAPPER(
      48,
      'YEW',
      'Yew',
      PatchImplementation.TREE,
      ItemID.YEW_LOGS,
      40,
      11
    ),
    49: new Produce_$WRAPPER(
      49,
      'MAGIC',
      'Magic',
      PatchImplementation.TREE,
      ItemID.MAGIC_LOGS,
      40,
      13
    ),
    50: new Produce_$WRAPPER(
      50,
      'APPLE',
      'Apple',
      PatchImplementation.FRUIT_TREE,
      ItemID.COOKING_APPLE,
      160,
      7,
      45,
      7
    ),
    51: new Produce_$WRAPPER(
      51,
      'BANANA',
      'Banana',
      PatchImplementation.FRUIT_TREE,
      ItemID.BANANA,
      160,
      7,
      45,
      7
    ),
    52: new Produce_$WRAPPER(
      52,
      'ORANGE',
      'Orange',
      PatchImplementation.FRUIT_TREE,
      ItemID.ORANGE,
      160,
      7,
      45,
      7
    ),
    53: new Produce_$WRAPPER(
      53,
      'CURRY',
      'Curry',
      PatchImplementation.FRUIT_TREE,
      ItemID.CURRY_LEAF,
      160,
      7,
      45,
      7
    ),
    54: new Produce_$WRAPPER(
      54,
      'PINEAPPLE',
      'Pineapple',
      PatchImplementation.FRUIT_TREE,
      ItemID.PINEAPPLE,
      160,
      7,
      45,
      7
    ),
    55: new Produce_$WRAPPER(
      55,
      'PAPAYA',
      'Papaya',
      PatchImplementation.FRUIT_TREE,
      ItemID.PAPAYA_FRUIT,
      160,
      7,
      45,
      7
    ),
    56: new Produce_$WRAPPER(
      56,
      'PALM',
      'Palm',
      PatchImplementation.FRUIT_TREE,
      ItemID.COCONUT,
      160,
      7,
      45,
      7
    ),
    57: new Produce_$WRAPPER(
      57,
      'DRAGONFRUIT',
      'Dragonfruit',
      PatchImplementation.FRUIT_TREE,
      ItemID.DRAGONFRUIT,
      160,
      7,
      45,
      7
    ),
    58: new Produce_$WRAPPER(
      58,
      'CACTUS',
      'Cactus',
      PatchImplementation.CACTUS,
      ItemID.CACTUS_SPINE,
      80,
      8,
      20,
      4
    ),
    59: new Produce_$WRAPPER(
      59,
      'POTATO_CACTUS',
      'Potato cactus',
      PatchImplementation.CACTUS,
      ItemID.POTATO_CACTUS,
      10,
      8,
      5,
      7
    ),
    60: new Produce_$WRAPPER(
      60,
      'TEAK',
      'Teak',
      PatchImplementation.HARDWOOD_TREE,
      ItemID.TEAK_LOGS,
      640,
      8
    ),
    61: new Produce_$WRAPPER(
      61,
      'MAHOGANY',
      'Mahogany',
      PatchImplementation.HARDWOOD_TREE,
      ItemID.MAHOGANY_LOGS,
      640,
      9
    ),
    62: new Produce_$WRAPPER(
      62,
      'ATTAS',
      'Attas',
      PatchImplementation.ANIMA,
      NullItemID.NULL_22940,
      640,
      9
    ),
    63: new Produce_$WRAPPER(
      63,
      'IASOR',
      'Iasor',
      PatchImplementation.ANIMA,
      NullItemID.NULL_22939,
      640,
      9
    ),
    64: new Produce_$WRAPPER(
      64,
      'KRONOS',
      'Kronos',
      PatchImplementation.ANIMA,
      NullItemID.NULL_22938,
      640,
      9
    ),
    65: new Produce_$WRAPPER(
      65,
      'SEAWEED',
      'Seaweed',
      PatchImplementation.SEAWEED,
      ItemID.GIANT_SEAWEED,
      10,
      5,
      0,
      4
    ),
    66: new Produce_$WRAPPER(
      66,
      'GRAPE',
      'Grape',
      PatchImplementation.GRAPES,
      ItemID.GRAPES,
      5,
      8,
      0,
      5
    ),
    67: new Produce_$WRAPPER(
      67,
      'MUSHROOM',
      'Mushroom',
      PatchImplementation.MUSHROOM,
      ItemID.MUSHROOM,
      40,
      7,
      0,
      7
    ),
    68: new Produce_$WRAPPER(
      68,
      'BELLADONNA',
      'Belladonna',
      PatchImplementation.BELLADONNA,
      ItemID.CAVE_NIGHTSHADE,
      80,
      5
    ),
    69: new Produce_$WRAPPER(
      69,
      'CALQUAT',
      'Calquat',
      PatchImplementation.CALQUAT,
      ItemID.CALQUAT_FRUIT,
      160,
      9,
      0,
      7
    ),
    70: new Produce_$WRAPPER(
      70,
      'SPIRIT_TREE',
      'Spirit tree',
      PatchImplementation.SPIRIT_TREE,
      ItemID.SPIRIT_TREE,
      320,
      13
    ),
    71: new Produce_$WRAPPER(
      71,
      'CELASTRUS',
      'Celastrus',
      PatchImplementation.CELASTRUS,
      ItemID.BATTLESTAFF,
      160,
      6,
      0,
      4
    ),
    72: new Produce_$WRAPPER(
      72,
      'REDWOOD',
      'Redwood',
      PatchImplementation.REDWOOD,
      ItemID.REDWOOD_LOGS,
      640,
      11
    ),
    73: new Produce_$WRAPPER(
      73,
      'HESPORI',
      'Hespori',
      PatchImplementation.HESPORI,
      NullItemID.NULL_23044,
      640,
      4,
      0,
      2
    ),
    74: new Produce_$WRAPPER(
      74,
      'CRYSTAL_TREE',
      'Crystal tree',
      PatchImplementation.CRYSTAL_TREE,
      ItemID.CRYSTAL_SHARDS,
      80,
      7
    ),
    75: new Produce_$WRAPPER(
      75,
      'EMPTY_COMPOST_BIN',
      'Compost Bin',
      PatchImplementation.COMPOST,
      ItemID.COMPOST_BIN,
      0,
      1,
      0,
      0
    ),
    76: new Produce_$WRAPPER(
      76,
      'COMPOST',
      'Compost',
      PatchImplementation.COMPOST,
      ItemID.COMPOST,
      40,
      3,
      0,
      15
    ),
    77: new Produce_$WRAPPER(
      77,
      'SUPERCOMPOST',
      'Supercompost',
      PatchImplementation.COMPOST,
      ItemID.SUPERCOMPOST,
      40,
      3,
      0,
      15
    ),
    78: new Produce_$WRAPPER(
      78,
      'ULTRACOMPOST',
      'Ultracompost',
      PatchImplementation.COMPOST,
      ItemID.ULTRACOMPOST,
      0,
      3,
      0,
      15
    ),
    79: new Produce_$WRAPPER(
      79,
      'ROTTEN_TOMATO',
      'Rotten Tomato',
      PatchImplementation.COMPOST,
      ItemID.ROTTEN_TOMATO,
      40,
      3,
      0,
      15
    ),
    80: new Produce_$WRAPPER(
      80,
      'EMPTY_BIG_COMPOST_BIN',
      'Big Compost Bin',
      PatchImplementation.COMPOST,
      ItemID.COMPOST_BIN,
      0,
      1,
      0,
      0
    ),
    81: new Produce_$WRAPPER(
      81,
      'BIG_COMPOST',
      'Compost',
      PatchImplementation.BIG_COMPOST,
      ItemID.COMPOST,
      40,
      3,
      0,
      30
    ),
    82: new Produce_$WRAPPER(
      82,
      'BIG_SUPERCOMPOST',
      'Supercompost',
      PatchImplementation.BIG_COMPOST,
      ItemID.SUPERCOMPOST,
      40,
      3,
      0,
      30
    ),
    83: new Produce_$WRAPPER(
      83,
      'BIG_ULTRACOMPOST',
      'Ultracompost',
      PatchImplementation.BIG_COMPOST,
      ItemID.ULTRACOMPOST,
      0,
      3,
      0,
      30
    ),
    84: new Produce_$WRAPPER(
      84,
      'BIG_ROTTEN_TOMATO',
      'Rotten Tomato',
      PatchImplementation.BIG_COMPOST,
      ItemID.ROTTEN_TOMATO,
      40,
      3,
      0,
      30
    )
  }
})(PatchImplementation || (PatchImplementation = {}))
;(function (PatchImplementation) {
  /** @ignore */
  class Produce_$WRAPPER {
    constructor(
      _$ordinal,
      _$name,
      name,
      patchImplementation,
      itemID,
      tickrate,
      stages,
      regrowTickrate,
      harvestStages
    ) {
      this._$ordinal = _$ordinal
      this._$name = _$name
      if (
        (typeof name === 'string' || name === null) &&
        (typeof patchImplementation === 'number' ||
          patchImplementation === null) &&
        (typeof itemID === 'number' || itemID === null) &&
        (typeof tickrate === 'number' || tickrate === null) &&
        (typeof stages === 'number' || stages === null) &&
        (typeof regrowTickrate === 'number' || regrowTickrate === null) &&
        (typeof harvestStages === 'number' || harvestStages === null)
      ) {
        let __args = arguments
        if (this.__name === undefined) {
          this.__name = null
        }
        if (this.patchImplementation === undefined) {
          this.patchImplementation = null
        }
        if (this.itemID === undefined) {
          this.itemID = 0
        }
        if (this.tickrate === undefined) {
          this.tickrate = 0
        }
        if (this.stages === undefined) {
          this.stages = 0
        }
        if (this.regrowTickrate === undefined) {
          this.regrowTickrate = 0
        }
        if (this.harvestStages === undefined) {
          this.harvestStages = 0
        }
        this.__name = name
        this.patchImplementation = patchImplementation
        this.itemID = itemID
        this.tickrate = tickrate
        this.stages = stages
        this.regrowTickrate = regrowTickrate
        this.harvestStages = harvestStages
      } else if (
        (typeof name === 'string' || name === null) &&
        (typeof patchImplementation === 'number' ||
          patchImplementation === null) &&
        (typeof itemID === 'number' || itemID === null) &&
        (typeof tickrate === 'number' || tickrate === null) &&
        (typeof stages === 'number' || stages === null) &&
        regrowTickrate === undefined &&
        harvestStages === undefined
      ) {
        let __args = arguments
        {
          let __args = arguments
          let regrowTickrate = 0
          let harvestStages = 1
          if (this.__name === undefined) {
            this.__name = null
          }
          if (this.patchImplementation === undefined) {
            this.patchImplementation = null
          }
          if (this.itemID === undefined) {
            this.itemID = 0
          }
          if (this.tickrate === undefined) {
            this.tickrate = 0
          }
          if (this.stages === undefined) {
            this.stages = 0
          }
          if (this.regrowTickrate === undefined) {
            this.regrowTickrate = 0
          }
          if (this.harvestStages === undefined) {
            this.harvestStages = 0
          }
          this.__name = name
          this.patchImplementation = patchImplementation
          this.itemID = itemID
          this.tickrate = tickrate
          this.stages = stages
          this.regrowTickrate = regrowTickrate
          this.harvestStages = harvestStages
        }
        if (this.__name === undefined) {
          this.__name = null
        }
        if (this.patchImplementation === undefined) {
          this.patchImplementation = null
        }
        if (this.itemID === undefined) {
          this.itemID = 0
        }
        if (this.tickrate === undefined) {
          this.tickrate = 0
        }
        if (this.stages === undefined) {
          this.stages = 0
        }
        if (this.regrowTickrate === undefined) {
          this.regrowTickrate = 0
        }
        if (this.harvestStages === undefined) {
          this.harvestStages = 0
        }
      } else throw new Error('invalid overload')
    }
    getName() {
      return this.__name
    }
    getItemID() {
      return this.itemID
    }
    getTickrate() {
      return this.tickrate
    }
    getStages() {
      return this.stages
    }
    getRegrowTickrate() {
      return this.regrowTickrate
    }
    getHarvestStages() {
      return this.harvestStages
    }
    getPatchImplementation() {
      return this.patchImplementation
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
  PatchImplementation.Produce_$WRAPPER = Produce_$WRAPPER
  PatchImplementation.Produce['__class'] =
    'timetracking.PatchImplementation.Produce'
  /** @ignore */
  class PatchImplementation$0_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 7) {
        return new PatchState(
          PatchImplementation.Produce.BELLADONNA,
          CropState.GROWING,
          value - 4
        )
      }
      if (value === 8) {
        return new PatchState(
          PatchImplementation.Produce.BELLADONNA,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 9 && value <= 11) {
        return new PatchState(
          PatchImplementation.Produce.BELLADONNA,
          CropState.DISEASED,
          value - 8
        )
      }
      if (value >= 12 && value <= 14) {
        return new PatchState(
          PatchImplementation.Produce.BELLADONNA,
          CropState.DEAD,
          value - 11
        )
      }
      if (value >= 15 && value <= 255) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$0_$WRAPPER = PatchImplementation$0_$WRAPPER
  /** @ignore */
  class PatchImplementation$1_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 9) {
        return new PatchState(
          PatchImplementation.Produce.MUSHROOM,
          CropState.GROWING,
          value - 4
        )
      }
      if (value >= 10 && value <= 15) {
        return new PatchState(
          PatchImplementation.Produce.MUSHROOM,
          CropState.HARVESTABLE,
          value - 10
        )
      }
      if (value >= 16 && value <= 20) {
        return new PatchState(
          PatchImplementation.Produce.MUSHROOM,
          CropState.DISEASED,
          value - 15
        )
      }
      if (value >= 21 && value <= 25) {
        return new PatchState(
          PatchImplementation.Produce.MUSHROOM,
          CropState.DEAD,
          value - 20
        )
      }
      if (value >= 26 && value <= 255) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$1_$WRAPPER = PatchImplementation$1_$WRAPPER
  /** @ignore */
  class PatchImplementation$2_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 6) {
        return new PatchState(
          PatchImplementation.Produce.HESPORI,
          CropState.GROWING,
          value - 4
        )
      }
      if (value >= 7 && value <= 8) {
        return new PatchState(
          PatchImplementation.Produce.HESPORI,
          CropState.HARVESTABLE,
          value - 7
        )
      }
      if (value === 9) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$2_$WRAPPER = PatchImplementation$2_$WRAPPER
  /** @ignore */
  class PatchImplementation$3_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 5) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 6 && value <= 9) {
        return new PatchState(
          PatchImplementation.Produce.POTATO,
          CropState.GROWING,
          value - 6
        )
      }
      if (value >= 10 && value <= 12) {
        return new PatchState(
          PatchImplementation.Produce.POTATO,
          CropState.HARVESTABLE,
          value - 10
        )
      }
      if (value >= 13 && value <= 16) {
        return new PatchState(
          PatchImplementation.Produce.ONION,
          CropState.GROWING,
          value - 13
        )
      }
      if (value >= 17 && value <= 19) {
        return new PatchState(
          PatchImplementation.Produce.ONION,
          CropState.HARVESTABLE,
          value - 17
        )
      }
      if (value >= 20 && value <= 23) {
        return new PatchState(
          PatchImplementation.Produce.CABBAGE,
          CropState.GROWING,
          value - 20
        )
      }
      if (value >= 24 && value <= 26) {
        return new PatchState(
          PatchImplementation.Produce.CABBAGE,
          CropState.HARVESTABLE,
          value - 24
        )
      }
      if (value >= 27 && value <= 30) {
        return new PatchState(
          PatchImplementation.Produce.TOMATO,
          CropState.GROWING,
          value - 27
        )
      }
      if (value >= 31 && value <= 33) {
        return new PatchState(
          PatchImplementation.Produce.TOMATO,
          CropState.HARVESTABLE,
          value - 31
        )
      }
      if (value >= 34 && value <= 39) {
        return new PatchState(
          PatchImplementation.Produce.SWEETCORN,
          CropState.GROWING,
          value - 34
        )
      }
      if (value >= 40 && value <= 42) {
        return new PatchState(
          PatchImplementation.Produce.SWEETCORN,
          CropState.HARVESTABLE,
          value - 40
        )
      }
      if (value >= 43 && value <= 48) {
        return new PatchState(
          PatchImplementation.Produce.STRAWBERRY,
          CropState.GROWING,
          value - 43
        )
      }
      if (value >= 49 && value <= 51) {
        return new PatchState(
          PatchImplementation.Produce.STRAWBERRY,
          CropState.HARVESTABLE,
          value - 49
        )
      }
      if (value >= 52 && value <= 59) {
        return new PatchState(
          PatchImplementation.Produce.WATERMELON,
          CropState.GROWING,
          value - 52
        )
      }
      if (value >= 60 && value <= 62) {
        return new PatchState(
          PatchImplementation.Produce.WATERMELON,
          CropState.HARVESTABLE,
          value - 60
        )
      }
      if (value >= 63 && value <= 69) {
        return new PatchState(
          PatchImplementation.Produce.SNAPE_GRASS,
          CropState.GROWING,
          value - 63
        )
      }
      if (value >= 70 && value <= 73) {
        return new PatchState(
          PatchImplementation.Produce.POTATO,
          CropState.GROWING,
          value - 70
        )
      }
      if (value >= 74 && value <= 76) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 77 && value <= 80) {
        return new PatchState(
          PatchImplementation.Produce.ONION,
          CropState.GROWING,
          value - 77
        )
      }
      if (value >= 81 && value <= 83) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 84 && value <= 87) {
        return new PatchState(
          PatchImplementation.Produce.CABBAGE,
          CropState.GROWING,
          value - 84
        )
      }
      if (value >= 88 && value <= 90) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 91 && value <= 94) {
        return new PatchState(
          PatchImplementation.Produce.TOMATO,
          CropState.GROWING,
          value - 91
        )
      }
      if (value >= 95 && value <= 97) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 98 && value <= 103) {
        return new PatchState(
          PatchImplementation.Produce.SWEETCORN,
          CropState.GROWING,
          value - 98
        )
      }
      if (value >= 104 && value <= 106) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 107 && value <= 112) {
        return new PatchState(
          PatchImplementation.Produce.STRAWBERRY,
          CropState.GROWING,
          value - 107
        )
      }
      if (value >= 113 && value <= 115) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 116 && value <= 123) {
        return new PatchState(
          PatchImplementation.Produce.WATERMELON,
          CropState.GROWING,
          value - 116
        )
      }
      if (value >= 124 && value <= 127) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 128 && value <= 134) {
        return new PatchState(
          PatchImplementation.Produce.SNAPE_GRASS,
          CropState.GROWING,
          value - 128
        )
      }
      if (value >= 135 && value <= 137) {
        return new PatchState(
          PatchImplementation.Produce.POTATO,
          CropState.DISEASED,
          value - 134
        )
      }
      if (value >= 138 && value <= 140) {
        return new PatchState(
          PatchImplementation.Produce.SNAPE_GRASS,
          CropState.HARVESTABLE,
          value - 138
        )
      }
      if (value === 141) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 142 && value <= 144) {
        return new PatchState(
          PatchImplementation.Produce.ONION,
          CropState.DISEASED,
          value - 141
        )
      }
      if (value >= 145 && value <= 148) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 149 && value <= 151) {
        return new PatchState(
          PatchImplementation.Produce.CABBAGE,
          CropState.DISEASED,
          value - 148
        )
      }
      if (value >= 152 && value <= 155) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 156 && value <= 158) {
        return new PatchState(
          PatchImplementation.Produce.TOMATO,
          CropState.DISEASED,
          value - 155
        )
      }
      if (value >= 159 && value <= 162) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 163 && value <= 167) {
        return new PatchState(
          PatchImplementation.Produce.SWEETCORN,
          CropState.DISEASED,
          value - 162
        )
      }
      if (value >= 168 && value <= 171) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 172 && value <= 176) {
        return new PatchState(
          PatchImplementation.Produce.STRAWBERRY,
          CropState.DISEASED,
          value - 171
        )
      }
      if (value >= 177 && value <= 180) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 181 && value <= 187) {
        return new PatchState(
          PatchImplementation.Produce.WATERMELON,
          CropState.DISEASED,
          value - 180
        )
      }
      if (value >= 188 && value <= 192) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 193 && value <= 195) {
        return new PatchState(
          PatchImplementation.Produce.SNAPE_GRASS,
          CropState.DEAD,
          value - 192
        )
      }
      if (value >= 196 && value <= 198) {
        return new PatchState(
          PatchImplementation.Produce.SNAPE_GRASS,
          CropState.DISEASED,
          value - 195
        )
      }
      if (value >= 199 && value <= 201) {
        return new PatchState(
          PatchImplementation.Produce.POTATO,
          CropState.DEAD,
          value - 198
        )
      }
      if (value >= 202 && value <= 204) {
        return new PatchState(
          PatchImplementation.Produce.SNAPE_GRASS,
          CropState.DISEASED,
          3 + value - 201
        )
      }
      if (value === 205) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 206 && value <= 208) {
        return new PatchState(
          PatchImplementation.Produce.ONION,
          CropState.DEAD,
          value - 205
        )
      }
      if (value >= 209 && value <= 211) {
        return new PatchState(
          PatchImplementation.Produce.SNAPE_GRASS,
          CropState.DEAD,
          3 + value - 208
        )
      }
      if (value === 212) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 213 && value <= 215) {
        return new PatchState(
          PatchImplementation.Produce.CABBAGE,
          CropState.DEAD,
          value - 212
        )
      }
      if (value >= 216 && value <= 219) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 220 && value <= 222) {
        return new PatchState(
          PatchImplementation.Produce.TOMATO,
          CropState.DEAD,
          value - 219
        )
      }
      if (value >= 223 && value <= 226) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 227 && value <= 231) {
        return new PatchState(
          PatchImplementation.Produce.SWEETCORN,
          CropState.DEAD,
          value - 226
        )
      }
      if (value >= 232 && value <= 235) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 236 && value <= 240) {
        return new PatchState(
          PatchImplementation.Produce.STRAWBERRY,
          CropState.DEAD,
          value - 235
        )
      }
      if (value >= 241 && value <= 244) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 245 && value <= 251) {
        return new PatchState(
          PatchImplementation.Produce.WATERMELON,
          CropState.DEAD,
          value - 244
        )
      }
      if (value >= 252 && value <= 255) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$3_$WRAPPER = PatchImplementation$3_$WRAPPER
  /** @ignore */
  class PatchImplementation$4_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 7) {
        return new PatchState(
          PatchImplementation.Produce.GUAM,
          CropState.GROWING,
          value - 4
        )
      }
      if (value >= 8 && value <= 10) {
        return new PatchState(
          PatchImplementation.Produce.GUAM,
          CropState.HARVESTABLE,
          10 - value
        )
      }
      if (value >= 11 && value <= 14) {
        return new PatchState(
          PatchImplementation.Produce.MARRENTILL,
          CropState.GROWING,
          value - 11
        )
      }
      if (value >= 15 && value <= 17) {
        return new PatchState(
          PatchImplementation.Produce.MARRENTILL,
          CropState.HARVESTABLE,
          17 - value
        )
      }
      if (value >= 18 && value <= 21) {
        return new PatchState(
          PatchImplementation.Produce.TARROMIN,
          CropState.GROWING,
          value - 18
        )
      }
      if (value >= 22 && value <= 24) {
        return new PatchState(
          PatchImplementation.Produce.TARROMIN,
          CropState.HARVESTABLE,
          24 - value
        )
      }
      if (value >= 25 && value <= 28) {
        return new PatchState(
          PatchImplementation.Produce.HARRALANDER,
          CropState.GROWING,
          value - 25
        )
      }
      if (value >= 29 && value <= 31) {
        return new PatchState(
          PatchImplementation.Produce.HARRALANDER,
          CropState.HARVESTABLE,
          31 - value
        )
      }
      if (value >= 32 && value <= 35) {
        return new PatchState(
          PatchImplementation.Produce.RANARR,
          CropState.GROWING,
          value - 32
        )
      }
      if (value >= 36 && value <= 38) {
        return new PatchState(
          PatchImplementation.Produce.RANARR,
          CropState.HARVESTABLE,
          38 - value
        )
      }
      if (value >= 39 && value <= 42) {
        return new PatchState(
          PatchImplementation.Produce.TOADFLAX,
          CropState.GROWING,
          value - 39
        )
      }
      if (value >= 43 && value <= 45) {
        return new PatchState(
          PatchImplementation.Produce.TOADFLAX,
          CropState.HARVESTABLE,
          45 - value
        )
      }
      if (value >= 46 && value <= 49) {
        return new PatchState(
          PatchImplementation.Produce.IRIT,
          CropState.GROWING,
          value - 46
        )
      }
      if (value >= 50 && value <= 52) {
        return new PatchState(
          PatchImplementation.Produce.IRIT,
          CropState.HARVESTABLE,
          52 - value
        )
      }
      if (value >= 53 && value <= 56) {
        return new PatchState(
          PatchImplementation.Produce.AVANTOE,
          CropState.GROWING,
          value - 53
        )
      }
      if (value >= 57 && value <= 59) {
        return new PatchState(
          PatchImplementation.Produce.AVANTOE,
          CropState.HARVESTABLE,
          59 - value
        )
      }
      if (value >= 60 && value <= 67) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 68 && value <= 71) {
        return new PatchState(
          PatchImplementation.Produce.KWUARM,
          CropState.GROWING,
          value - 68
        )
      }
      if (value >= 72 && value <= 74) {
        return new PatchState(
          PatchImplementation.Produce.KWUARM,
          CropState.HARVESTABLE,
          74 - value
        )
      }
      if (value >= 75 && value <= 78) {
        return new PatchState(
          PatchImplementation.Produce.SNAPDRAGON,
          CropState.GROWING,
          value - 75
        )
      }
      if (value >= 79 && value <= 81) {
        return new PatchState(
          PatchImplementation.Produce.SNAPDRAGON,
          CropState.HARVESTABLE,
          81 - value
        )
      }
      if (value >= 82 && value <= 85) {
        return new PatchState(
          PatchImplementation.Produce.CADANTINE,
          CropState.GROWING,
          value - 82
        )
      }
      if (value >= 86 && value <= 88) {
        return new PatchState(
          PatchImplementation.Produce.CADANTINE,
          CropState.HARVESTABLE,
          88 - value
        )
      }
      if (value >= 89 && value <= 92) {
        return new PatchState(
          PatchImplementation.Produce.LANTADYME,
          CropState.GROWING,
          value - 89
        )
      }
      if (value >= 93 && value <= 95) {
        return new PatchState(
          PatchImplementation.Produce.LANTADYME,
          CropState.HARVESTABLE,
          95 - value
        )
      }
      if (value >= 96 && value <= 99) {
        return new PatchState(
          PatchImplementation.Produce.DWARF_WEED,
          CropState.GROWING,
          value - 96
        )
      }
      if (value >= 100 && value <= 102) {
        return new PatchState(
          PatchImplementation.Produce.DWARF_WEED,
          CropState.HARVESTABLE,
          102 - value
        )
      }
      if (value >= 103 && value <= 106) {
        return new PatchState(
          PatchImplementation.Produce.TORSTOL,
          CropState.GROWING,
          value - 103
        )
      }
      if (value >= 107 && value <= 109) {
        return new PatchState(
          PatchImplementation.Produce.TORSTOL,
          CropState.HARVESTABLE,
          109 - value
        )
      }
      if (value >= 128 && value <= 130) {
        return new PatchState(
          PatchImplementation.Produce.GUAM,
          CropState.DISEASED,
          value - 127
        )
      }
      if (value >= 131 && value <= 133) {
        return new PatchState(
          PatchImplementation.Produce.MARRENTILL,
          CropState.DISEASED,
          value - 130
        )
      }
      if (value >= 134 && value <= 136) {
        return new PatchState(
          PatchImplementation.Produce.TARROMIN,
          CropState.DISEASED,
          value - 133
        )
      }
      if (value >= 137 && value <= 139) {
        return new PatchState(
          PatchImplementation.Produce.HARRALANDER,
          CropState.DISEASED,
          value - 136
        )
      }
      if (value >= 140 && value <= 142) {
        return new PatchState(
          PatchImplementation.Produce.RANARR,
          CropState.DISEASED,
          value - 139
        )
      }
      if (value >= 143 && value <= 145) {
        return new PatchState(
          PatchImplementation.Produce.TOADFLAX,
          CropState.DISEASED,
          value - 142
        )
      }
      if (value >= 146 && value <= 148) {
        return new PatchState(
          PatchImplementation.Produce.IRIT,
          CropState.DISEASED,
          value - 145
        )
      }
      if (value >= 149 && value <= 151) {
        return new PatchState(
          PatchImplementation.Produce.AVANTOE,
          CropState.DISEASED,
          value - 148
        )
      }
      if (value >= 152 && value <= 154) {
        return new PatchState(
          PatchImplementation.Produce.KWUARM,
          CropState.DISEASED,
          value - 151
        )
      }
      if (value >= 155 && value <= 157) {
        return new PatchState(
          PatchImplementation.Produce.SNAPDRAGON,
          CropState.DISEASED,
          value - 154
        )
      }
      if (value >= 158 && value <= 160) {
        return new PatchState(
          PatchImplementation.Produce.CADANTINE,
          CropState.DISEASED,
          value - 157
        )
      }
      if (value >= 161 && value <= 163) {
        return new PatchState(
          PatchImplementation.Produce.LANTADYME,
          CropState.DISEASED,
          value - 160
        )
      }
      if (value >= 164 && value <= 166) {
        return new PatchState(
          PatchImplementation.Produce.DWARF_WEED,
          CropState.DISEASED,
          value - 163
        )
      }
      if (value >= 167 && value <= 169) {
        return new PatchState(
          PatchImplementation.Produce.TORSTOL,
          CropState.DISEASED,
          value - 166
        )
      }
      if (value >= 170 && value <= 172) {
        return new PatchState(
          PatchImplementation.Produce.ANYHERB,
          CropState.DEAD,
          value - 169
        )
      }
      if (value >= 173 && value <= 191) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 192 && value <= 195) {
        return new PatchState(
          PatchImplementation.Produce.GOUTWEED,
          CropState.GROWING,
          value - 192
        )
      }
      if (value >= 196 && value <= 197) {
        return new PatchState(
          PatchImplementation.Produce.GOUTWEED,
          CropState.HARVESTABLE,
          197 - value
        )
      }
      if (value >= 198 && value <= 200) {
        return new PatchState(
          PatchImplementation.Produce.GOUTWEED,
          CropState.DISEASED,
          value - 197
        )
      }
      if (value >= 201 && value <= 203) {
        return new PatchState(
          PatchImplementation.Produce.GOUTWEED,
          CropState.DEAD,
          value - 200
        )
      }
      if (value >= 204 && value <= 219) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 221 && value <= 255) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$4_$WRAPPER = PatchImplementation$4_$WRAPPER
  /** @ignore */
  class PatchImplementation$5_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 7) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 8 && value <= 11) {
        return new PatchState(
          PatchImplementation.Produce.MARIGOLD,
          CropState.GROWING,
          value - 8
        )
      }
      if (value === 12) {
        return new PatchState(
          PatchImplementation.Produce.MARIGOLD,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 13 && value <= 16) {
        return new PatchState(
          PatchImplementation.Produce.ROSEMARY,
          CropState.GROWING,
          value - 13
        )
      }
      if (value === 17) {
        return new PatchState(
          PatchImplementation.Produce.ROSEMARY,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 18 && value <= 21) {
        return new PatchState(
          PatchImplementation.Produce.NASTURTIUM,
          CropState.GROWING,
          value - 18
        )
      }
      if (value === 22) {
        return new PatchState(
          PatchImplementation.Produce.NASTURTIUM,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 23 && value <= 26) {
        return new PatchState(
          PatchImplementation.Produce.WOAD,
          CropState.GROWING,
          value - 23
        )
      }
      if (value === 27) {
        return new PatchState(
          PatchImplementation.Produce.WOAD,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 28 && value <= 31) {
        return new PatchState(
          PatchImplementation.Produce.LIMPWURT,
          CropState.GROWING,
          value - 28
        )
      }
      if (value === 32) {
        return new PatchState(
          PatchImplementation.Produce.LIMPWURT,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 33 && value <= 35) {
        return new PatchState(
          PatchImplementation.Produce.SCARECROW,
          CropState.GROWING,
          35 - value
        )
      }
      if (value === 36) {
        return new PatchState(
          PatchImplementation.Produce.SCARECROW,
          CropState.GROWING,
          0
        )
      }
      if (value >= 37 && value <= 40) {
        return new PatchState(
          PatchImplementation.Produce.WHITE_LILY,
          CropState.GROWING,
          value - 37
        )
      }
      if (value === 41) {
        return new PatchState(
          PatchImplementation.Produce.WHITE_LILY,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 42 && value <= 71) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 72 && value <= 75) {
        return new PatchState(
          PatchImplementation.Produce.MARIGOLD,
          CropState.GROWING,
          value - 72
        )
      }
      if (value === 76) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 77 && value <= 80) {
        return new PatchState(
          PatchImplementation.Produce.ROSEMARY,
          CropState.GROWING,
          value - 77
        )
      }
      if (value === 81) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 82 && value <= 85) {
        return new PatchState(
          PatchImplementation.Produce.NASTURTIUM,
          CropState.GROWING,
          value - 82
        )
      }
      if (value === 86) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 87 && value <= 90) {
        return new PatchState(
          PatchImplementation.Produce.WOAD,
          CropState.GROWING,
          value - 87
        )
      }
      if (value === 91) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 92 && value <= 95) {
        return new PatchState(
          PatchImplementation.Produce.LIMPWURT,
          CropState.GROWING,
          value - 92
        )
      }
      if (value >= 96 && value <= 100) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 101 && value <= 104) {
        return new PatchState(
          PatchImplementation.Produce.WHITE_LILY,
          CropState.GROWING,
          value - 101
        )
      }
      if (value >= 105 && value <= 136) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 137 && value <= 139) {
        return new PatchState(
          PatchImplementation.Produce.MARIGOLD,
          CropState.DISEASED,
          value - 136
        )
      }
      if (value >= 140 && value <= 141) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 142 && value <= 144) {
        return new PatchState(
          PatchImplementation.Produce.ROSEMARY,
          CropState.DISEASED,
          value - 141
        )
      }
      if (value >= 145 && value <= 146) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 147 && value <= 149) {
        return new PatchState(
          PatchImplementation.Produce.NASTURTIUM,
          CropState.DISEASED,
          value - 146
        )
      }
      if (value >= 150 && value <= 151) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 152 && value <= 154) {
        return new PatchState(
          PatchImplementation.Produce.WOAD,
          CropState.DISEASED,
          value - 151
        )
      }
      if (value >= 155 && value <= 156) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 157 && value <= 159) {
        return new PatchState(
          PatchImplementation.Produce.LIMPWURT,
          CropState.DISEASED,
          value - 156
        )
      }
      if (value >= 160 && value <= 165) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 166 && value <= 168) {
        return new PatchState(
          PatchImplementation.Produce.WHITE_LILY,
          CropState.DISEASED,
          value - 165
        )
      }
      if (value >= 169 && value <= 200) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 201 && value <= 204) {
        return new PatchState(
          PatchImplementation.Produce.MARIGOLD,
          CropState.DEAD,
          value - 200
        )
      }
      if (value === 205) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 206 && value <= 209) {
        return new PatchState(
          PatchImplementation.Produce.ROSEMARY,
          CropState.DEAD,
          value - 205
        )
      }
      if (value === 210) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 211 && value <= 214) {
        return new PatchState(
          PatchImplementation.Produce.NASTURTIUM,
          CropState.DEAD,
          value - 210
        )
      }
      if (value === 215) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 216 && value <= 219) {
        return new PatchState(
          PatchImplementation.Produce.WOAD,
          CropState.DEAD,
          value - 215
        )
      }
      if (value === 220) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 221 && value <= 224) {
        return new PatchState(
          PatchImplementation.Produce.LIMPWURT,
          CropState.DEAD,
          value - 220
        )
      }
      if (value >= 225 && value <= 229) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 230 && value <= 233) {
        return new PatchState(
          PatchImplementation.Produce.WHITE_LILY,
          CropState.DEAD,
          value - 229
        )
      }
      if (value >= 234 && value <= 255) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$5_$WRAPPER = PatchImplementation$5_$WRAPPER
  /** @ignore */
  class PatchImplementation$6_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value === 4) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 5 && value <= 9) {
        return new PatchState(
          PatchImplementation.Produce.REDBERRIES,
          CropState.GROWING,
          value - 5
        )
      }
      if (value >= 10 && value <= 14) {
        return new PatchState(
          PatchImplementation.Produce.REDBERRIES,
          CropState.HARVESTABLE,
          value - 10
        )
      }
      if (value >= 15 && value <= 20) {
        return new PatchState(
          PatchImplementation.Produce.CADAVABERRIES,
          CropState.GROWING,
          value - 15
        )
      }
      if (value >= 21 && value <= 25) {
        return new PatchState(
          PatchImplementation.Produce.CADAVABERRIES,
          CropState.HARVESTABLE,
          value - 21
        )
      }
      if (value >= 26 && value <= 32) {
        return new PatchState(
          PatchImplementation.Produce.DWELLBERRIES,
          CropState.GROWING,
          value - 26
        )
      }
      if (value >= 33 && value <= 37) {
        return new PatchState(
          PatchImplementation.Produce.DWELLBERRIES,
          CropState.HARVESTABLE,
          value - 33
        )
      }
      if (value >= 38 && value <= 45) {
        return new PatchState(
          PatchImplementation.Produce.JANGERBERRIES,
          CropState.GROWING,
          value - 38
        )
      }
      if (value >= 46 && value <= 50) {
        return new PatchState(
          PatchImplementation.Produce.JANGERBERRIES,
          CropState.HARVESTABLE,
          value - 46
        )
      }
      if (value >= 51 && value <= 58) {
        return new PatchState(
          PatchImplementation.Produce.WHITEBERRIES,
          CropState.GROWING,
          value - 51
        )
      }
      if (value >= 59 && value <= 63) {
        return new PatchState(
          PatchImplementation.Produce.WHITEBERRIES,
          CropState.HARVESTABLE,
          value - 59
        )
      }
      if (value >= 64 && value <= 69) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 70 && value <= 74) {
        return new PatchState(
          PatchImplementation.Produce.REDBERRIES,
          CropState.DISEASED,
          value - 69
        )
      }
      if (value >= 75 && value <= 79) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 80 && value <= 85) {
        return new PatchState(
          PatchImplementation.Produce.CADAVABERRIES,
          CropState.DISEASED,
          value - 79
        )
      }
      if (value >= 86 && value <= 90) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 91 && value <= 97) {
        return new PatchState(
          PatchImplementation.Produce.DWELLBERRIES,
          CropState.DISEASED,
          value - 90
        )
      }
      if (value >= 98 && value <= 102) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 103 && value <= 110) {
        return new PatchState(
          PatchImplementation.Produce.JANGERBERRIES,
          CropState.DISEASED,
          value - 102
        )
      }
      if (value >= 111 && value <= 115) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 116 && value <= 123) {
        return new PatchState(
          PatchImplementation.Produce.WHITEBERRIES,
          CropState.DISEASED,
          value - 115
        )
      }
      if (value >= 124 && value <= 133) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 134 && value <= 138) {
        return new PatchState(
          PatchImplementation.Produce.REDBERRIES,
          CropState.DEAD,
          value - 133
        )
      }
      if (value >= 139 && value <= 143) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 144 && value <= 149) {
        return new PatchState(
          PatchImplementation.Produce.CADAVABERRIES,
          CropState.DEAD,
          value - 143
        )
      }
      if (value >= 150 && value <= 154) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 155 && value <= 161) {
        return new PatchState(
          PatchImplementation.Produce.DWELLBERRIES,
          CropState.DEAD,
          value - 154
        )
      }
      if (value >= 162 && value <= 166) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 167 && value <= 174) {
        return new PatchState(
          PatchImplementation.Produce.JANGERBERRIES,
          CropState.DEAD,
          value - 166
        )
      }
      if (value >= 175 && value <= 179) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 180 && value <= 187) {
        return new PatchState(
          PatchImplementation.Produce.WHITEBERRIES,
          CropState.DEAD,
          value - 179
        )
      }
      if (value >= 188 && value <= 196) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 197 && value <= 204) {
        return new PatchState(
          PatchImplementation.Produce.POISON_IVY,
          CropState.GROWING,
          value - 197
        )
      }
      if (value >= 205 && value <= 209) {
        return new PatchState(
          PatchImplementation.Produce.POISON_IVY,
          CropState.HARVESTABLE,
          value - 205
        )
      }
      if (value >= 210 && value <= 216) {
        return new PatchState(
          PatchImplementation.Produce.POISON_IVY,
          CropState.DISEASED,
          value - 209
        )
      }
      if (value >= 217 && value <= 224) {
        return new PatchState(
          PatchImplementation.Produce.POISON_IVY,
          CropState.DEAD,
          value - 216
        )
      }
      if (value === 225) {
        return new PatchState(
          PatchImplementation.Produce.POISON_IVY,
          CropState.DISEASED,
          8
        )
      }
      if (value >= 226 && value <= 249) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value === 250) {
        return new PatchState(
          PatchImplementation.Produce.REDBERRIES,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.REDBERRIES
          ].getStages() - 1
        )
      }
      if (value === 251) {
        return new PatchState(
          PatchImplementation.Produce.CADAVABERRIES,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.CADAVABERRIES
          ].getStages() - 1
        )
      }
      if (value === 252) {
        return new PatchState(
          PatchImplementation.Produce.DWELLBERRIES,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.DWELLBERRIES
          ].getStages() - 1
        )
      }
      if (value === 253) {
        return new PatchState(
          PatchImplementation.Produce.JANGERBERRIES,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.JANGERBERRIES
          ].getStages() - 1
        )
      }
      if (value === 254) {
        return new PatchState(
          PatchImplementation.Produce.WHITEBERRIES,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.WHITEBERRIES
          ].getStages() - 1
        )
      }
      if (value === 255) {
        return new PatchState(
          PatchImplementation.Produce.POISON_IVY,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.POISON_IVY
          ].getStages() - 1
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$6_$WRAPPER = PatchImplementation$6_$WRAPPER
  /** @ignore */
  class PatchImplementation$7_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 7) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 8 && value <= 13) {
        return new PatchState(
          PatchImplementation.Produce.APPLE,
          CropState.GROWING,
          value - 8
        )
      }
      if (value >= 14 && value <= 20) {
        return new PatchState(
          PatchImplementation.Produce.APPLE,
          CropState.HARVESTABLE,
          value - 14
        )
      }
      if (value >= 21 && value <= 26) {
        return new PatchState(
          PatchImplementation.Produce.APPLE,
          CropState.DISEASED,
          value - 20
        )
      }
      if (value >= 27 && value <= 32) {
        return new PatchState(
          PatchImplementation.Produce.APPLE,
          CropState.DEAD,
          value - 26
        )
      }
      if (value === 33) {
        return new PatchState(
          PatchImplementation.Produce.APPLE,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 34) {
        return new PatchState(
          PatchImplementation.Produce.APPLE,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.APPLE
          ].getStages() - 1
        )
      }
      if (value >= 35 && value <= 40) {
        return new PatchState(
          PatchImplementation.Produce.BANANA,
          CropState.GROWING,
          value - 35
        )
      }
      if (value >= 41 && value <= 47) {
        return new PatchState(
          PatchImplementation.Produce.BANANA,
          CropState.HARVESTABLE,
          value - 41
        )
      }
      if (value >= 48 && value <= 53) {
        return new PatchState(
          PatchImplementation.Produce.BANANA,
          CropState.DISEASED,
          value - 47
        )
      }
      if (value >= 54 && value <= 59) {
        return new PatchState(
          PatchImplementation.Produce.BANANA,
          CropState.DEAD,
          value - 53
        )
      }
      if (value === 60) {
        return new PatchState(
          PatchImplementation.Produce.BANANA,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 61) {
        return new PatchState(
          PatchImplementation.Produce.BANANA,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.BANANA
          ].getStages() - 1
        )
      }
      if (value >= 62 && value <= 71) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 72 && value <= 77) {
        return new PatchState(
          PatchImplementation.Produce.ORANGE,
          CropState.GROWING,
          value - 72
        )
      }
      if (value >= 78 && value <= 84) {
        return new PatchState(
          PatchImplementation.Produce.ORANGE,
          CropState.HARVESTABLE,
          value - 78
        )
      }
      if (value >= 85 && value <= 89) {
        return new PatchState(
          PatchImplementation.Produce.ORANGE,
          CropState.DISEASED,
          value - 84
        )
      }
      if (value === 90) {
        return new PatchState(
          PatchImplementation.Produce.ORANGE,
          CropState.DISEASED,
          6
        )
      }
      if (value >= 91 && value <= 96) {
        return new PatchState(
          PatchImplementation.Produce.ORANGE,
          CropState.DEAD,
          value - 90
        )
      }
      if (value === 97) {
        return new PatchState(
          PatchImplementation.Produce.ORANGE,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 98) {
        return new PatchState(
          PatchImplementation.Produce.ORANGE,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.ORANGE
          ].getStages() - 1
        )
      }
      if (value >= 99 && value <= 104) {
        return new PatchState(
          PatchImplementation.Produce.CURRY,
          CropState.GROWING,
          value - 99
        )
      }
      if (value >= 105 && value <= 111) {
        return new PatchState(
          PatchImplementation.Produce.CURRY,
          CropState.HARVESTABLE,
          value - 105
        )
      }
      if (value >= 112 && value <= 117) {
        return new PatchState(
          PatchImplementation.Produce.CURRY,
          CropState.DISEASED,
          value - 111
        )
      }
      if (value >= 118 && value <= 123) {
        return new PatchState(
          PatchImplementation.Produce.CURRY,
          CropState.DEAD,
          value - 117
        )
      }
      if (value === 124) {
        return new PatchState(
          PatchImplementation.Produce.CURRY,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 125) {
        return new PatchState(
          PatchImplementation.Produce.CURRY,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.CURRY
          ].getStages() - 1
        )
      }
      if (value >= 126 && value <= 135) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 136 && value <= 141) {
        return new PatchState(
          PatchImplementation.Produce.PINEAPPLE,
          CropState.GROWING,
          value - 136
        )
      }
      if (value >= 142 && value <= 148) {
        return new PatchState(
          PatchImplementation.Produce.PINEAPPLE,
          CropState.HARVESTABLE,
          value - 142
        )
      }
      if (value >= 149 && value <= 154) {
        return new PatchState(
          PatchImplementation.Produce.PINEAPPLE,
          CropState.DISEASED,
          value - 148
        )
      }
      if (value >= 155 && value <= 160) {
        return new PatchState(
          PatchImplementation.Produce.PINEAPPLE,
          CropState.DEAD,
          value - 154
        )
      }
      if (value === 161) {
        return new PatchState(
          PatchImplementation.Produce.PINEAPPLE,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 162) {
        return new PatchState(
          PatchImplementation.Produce.PINEAPPLE,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.PINEAPPLE
          ].getStages() - 1
        )
      }
      if (value >= 163 && value <= 168) {
        return new PatchState(
          PatchImplementation.Produce.PAPAYA,
          CropState.GROWING,
          value - 163
        )
      }
      if (value >= 169 && value <= 175) {
        return new PatchState(
          PatchImplementation.Produce.PAPAYA,
          CropState.HARVESTABLE,
          value - 169
        )
      }
      if (value >= 176 && value <= 181) {
        return new PatchState(
          PatchImplementation.Produce.PAPAYA,
          CropState.DISEASED,
          value - 175
        )
      }
      if (value >= 182 && value <= 187) {
        return new PatchState(
          PatchImplementation.Produce.PAPAYA,
          CropState.DEAD,
          value - 181
        )
      }
      if (value === 188) {
        return new PatchState(
          PatchImplementation.Produce.PAPAYA,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 189) {
        return new PatchState(
          PatchImplementation.Produce.PAPAYA,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.PAPAYA
          ].getStages() - 1
        )
      }
      if (value >= 190 && value <= 199) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 200 && value <= 205) {
        return new PatchState(
          PatchImplementation.Produce.PALM,
          CropState.GROWING,
          value - 200
        )
      }
      if (value >= 206 && value <= 212) {
        return new PatchState(
          PatchImplementation.Produce.PALM,
          CropState.HARVESTABLE,
          value - 206
        )
      }
      if (value >= 213 && value <= 218) {
        return new PatchState(
          PatchImplementation.Produce.PALM,
          CropState.DISEASED,
          value - 212
        )
      }
      if (value >= 219 && value <= 224) {
        return new PatchState(
          PatchImplementation.Produce.PALM,
          CropState.DEAD,
          value - 218
        )
      }
      if (value === 225) {
        return new PatchState(
          PatchImplementation.Produce.PALM,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 226) {
        return new PatchState(
          PatchImplementation.Produce.PALM,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.PALM
          ].getStages() - 1
        )
      }
      if (value >= 227 && value <= 232) {
        return new PatchState(
          PatchImplementation.Produce.DRAGONFRUIT,
          CropState.GROWING,
          value - 227
        )
      }
      if (value >= 233 && value <= 239) {
        return new PatchState(
          PatchImplementation.Produce.DRAGONFRUIT,
          CropState.HARVESTABLE,
          value - 233
        )
      }
      if (value >= 240 && value <= 245) {
        return new PatchState(
          PatchImplementation.Produce.DRAGONFRUIT,
          CropState.DISEASED,
          value - 239
        )
      }
      if (value >= 246 && value <= 251) {
        return new PatchState(
          PatchImplementation.Produce.DRAGONFRUIT,
          CropState.DEAD,
          value - 245
        )
      }
      if (value === 252) {
        return new PatchState(
          PatchImplementation.Produce.DRAGONFRUIT,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 253) {
        return new PatchState(
          PatchImplementation.Produce.DRAGONFRUIT,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.DRAGONFRUIT
          ].getStages() - 1
        )
      }
      if (value >= 254 && value <= 255) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$7_$WRAPPER = PatchImplementation$7_$WRAPPER
  /** @ignore */
  class PatchImplementation$8_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 7) {
        return new PatchState(
          PatchImplementation.Produce.HAMMERSTONE,
          CropState.GROWING,
          value - 4
        )
      }
      if (value >= 8 && value <= 10) {
        return new PatchState(
          PatchImplementation.Produce.HAMMERSTONE,
          CropState.HARVESTABLE,
          value - 8
        )
      }
      if (value >= 11 && value <= 15) {
        return new PatchState(
          PatchImplementation.Produce.ASGARNIAN,
          CropState.GROWING,
          value - 11
        )
      }
      if (value >= 16 && value <= 18) {
        return new PatchState(
          PatchImplementation.Produce.ASGARNIAN,
          CropState.HARVESTABLE,
          value - 16
        )
      }
      if (value >= 19 && value <= 24) {
        return new PatchState(
          PatchImplementation.Produce.YANILLIAN,
          CropState.GROWING,
          value - 19
        )
      }
      if (value >= 25 && value <= 27) {
        return new PatchState(
          PatchImplementation.Produce.YANILLIAN,
          CropState.HARVESTABLE,
          value - 25
        )
      }
      if (value >= 28 && value <= 34) {
        return new PatchState(
          PatchImplementation.Produce.KRANDORIAN,
          CropState.GROWING,
          value - 28
        )
      }
      if (value >= 35 && value <= 37) {
        return new PatchState(
          PatchImplementation.Produce.KRANDORIAN,
          CropState.HARVESTABLE,
          value - 35
        )
      }
      if (value >= 38 && value <= 45) {
        return new PatchState(
          PatchImplementation.Produce.WILDBLOOD,
          CropState.GROWING,
          value - 38
        )
      }
      if (value >= 46 && value <= 48) {
        return new PatchState(
          PatchImplementation.Produce.WILDBLOOD,
          CropState.HARVESTABLE,
          value - 46
        )
      }
      if (value >= 49 && value <= 52) {
        return new PatchState(
          PatchImplementation.Produce.BARLEY,
          CropState.GROWING,
          value - 49
        )
      }
      if (value >= 53 && value <= 55) {
        return new PatchState(
          PatchImplementation.Produce.BARLEY,
          CropState.HARVESTABLE,
          value - 53
        )
      }
      if (value >= 56 && value <= 60) {
        return new PatchState(
          PatchImplementation.Produce.JUTE,
          CropState.GROWING,
          value - 56
        )
      }
      if (value >= 61 && value <= 63) {
        return new PatchState(
          PatchImplementation.Produce.JUTE,
          CropState.HARVESTABLE,
          value - 61
        )
      }
      if (value >= 64 && value <= 67) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 68 && value <= 71) {
        return new PatchState(
          PatchImplementation.Produce.HAMMERSTONE,
          CropState.GROWING,
          value - 68
        )
      }
      if (value >= 72 && value <= 74) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 75 && value <= 79) {
        return new PatchState(
          PatchImplementation.Produce.ASGARNIAN,
          CropState.GROWING,
          value - 75
        )
      }
      if (value >= 80 && value <= 82) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 83 && value <= 88) {
        return new PatchState(
          PatchImplementation.Produce.YANILLIAN,
          CropState.GROWING,
          value - 83
        )
      }
      if (value >= 89 && value <= 91) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 92 && value <= 98) {
        return new PatchState(
          PatchImplementation.Produce.KRANDORIAN,
          CropState.GROWING,
          value - 92
        )
      }
      if (value >= 99 && value <= 101) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 102 && value <= 109) {
        return new PatchState(
          PatchImplementation.Produce.WILDBLOOD,
          CropState.GROWING,
          value - 102
        )
      }
      if (value >= 110 && value <= 112) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 113 && value <= 116) {
        return new PatchState(
          PatchImplementation.Produce.BARLEY,
          CropState.GROWING,
          value - 113
        )
      }
      if (value >= 117 && value <= 119) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 120 && value <= 124) {
        return new PatchState(
          PatchImplementation.Produce.JUTE,
          CropState.GROWING,
          value - 120
        )
      }
      if (value >= 125 && value <= 132) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 133 && value <= 135) {
        return new PatchState(
          PatchImplementation.Produce.HAMMERSTONE,
          CropState.DISEASED,
          value - 132
        )
      }
      if (value >= 136 && value <= 139) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 140 && value <= 143) {
        return new PatchState(
          PatchImplementation.Produce.ASGARNIAN,
          CropState.DISEASED,
          value - 139
        )
      }
      if (value >= 144 && value <= 147) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 148 && value <= 152) {
        return new PatchState(
          PatchImplementation.Produce.YANILLIAN,
          CropState.DISEASED,
          value - 147
        )
      }
      if (value >= 153 && value <= 156) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 157 && value <= 162) {
        return new PatchState(
          PatchImplementation.Produce.KRANDORIAN,
          CropState.DISEASED,
          value - 156
        )
      }
      if (value >= 163 && value <= 166) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 167 && value <= 173) {
        return new PatchState(
          PatchImplementation.Produce.WILDBLOOD,
          CropState.DISEASED,
          value - 166
        )
      }
      if (value >= 174 && value <= 177) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 178 && value <= 180) {
        return new PatchState(
          PatchImplementation.Produce.BARLEY,
          CropState.DISEASED,
          value - 177
        )
      }
      if (value === 181) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 183 && value <= 184) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 185 && value <= 188) {
        return new PatchState(
          PatchImplementation.Produce.JUTE,
          CropState.DISEASED,
          value - 184
        )
      }
      if (value >= 189 && value <= 196) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 197 && value <= 199) {
        return new PatchState(
          PatchImplementation.Produce.HAMMERSTONE,
          CropState.DEAD,
          value - 196
        )
      }
      if (value >= 200 && value <= 203) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 204 && value <= 207) {
        return new PatchState(
          PatchImplementation.Produce.ASGARNIAN,
          CropState.DEAD,
          value - 203
        )
      }
      if (value >= 208 && value <= 211) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 212 && value <= 216) {
        return new PatchState(
          PatchImplementation.Produce.YANILLIAN,
          CropState.DEAD,
          value - 211
        )
      }
      if (value >= 217 && value <= 220) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 221 && value <= 226) {
        return new PatchState(
          PatchImplementation.Produce.KRANDORIAN,
          CropState.DEAD,
          value - 220
        )
      }
      if (value >= 227 && value <= 230) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 231 && value <= 237) {
        return new PatchState(
          PatchImplementation.Produce.WILDBLOOD,
          CropState.DEAD,
          value - 230
        )
      }
      if (value >= 238 && value <= 241) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 242 && value <= 244) {
        return new PatchState(
          PatchImplementation.Produce.BARLEY,
          CropState.DEAD,
          value - 241
        )
      }
      if (value >= 245 && value <= 248) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 249 && value <= 252) {
        return new PatchState(
          PatchImplementation.Produce.JUTE,
          CropState.DEAD,
          value - 248
        )
      }
      if (value >= 253 && value <= 255) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$8_$WRAPPER = PatchImplementation$8_$WRAPPER
  /** @ignore */
  class PatchImplementation$9_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 7) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 8 && value <= 11) {
        return new PatchState(
          PatchImplementation.Produce.OAK,
          CropState.GROWING,
          value - 8
        )
      }
      if (value === 12) {
        return new PatchState(
          PatchImplementation.Produce.OAK,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.OAK
          ].getStages() - 1
        )
      }
      if (value === 13) {
        return new PatchState(
          PatchImplementation.Produce.OAK,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 14) {
        return new PatchState(
          PatchImplementation.Produce.OAK,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 15 && value <= 20) {
        return new PatchState(
          PatchImplementation.Produce.WILLOW,
          CropState.GROWING,
          value - 15
        )
      }
      if (value === 21) {
        return new PatchState(
          PatchImplementation.Produce.WILLOW,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.WILLOW
          ].getStages() - 1
        )
      }
      if (value === 22) {
        return new PatchState(
          PatchImplementation.Produce.WILLOW,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 23) {
        return new PatchState(
          PatchImplementation.Produce.WILLOW,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 24 && value <= 31) {
        return new PatchState(
          PatchImplementation.Produce.MAPLE,
          CropState.GROWING,
          value - 24
        )
      }
      if (value === 32) {
        return new PatchState(
          PatchImplementation.Produce.MAPLE,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.MAPLE
          ].getStages() - 1
        )
      }
      if (value === 33) {
        return new PatchState(
          PatchImplementation.Produce.MAPLE,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 34) {
        return new PatchState(
          PatchImplementation.Produce.MAPLE,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 35 && value <= 44) {
        return new PatchState(
          PatchImplementation.Produce.YEW,
          CropState.GROWING,
          value - 35
        )
      }
      if (value === 45) {
        return new PatchState(
          PatchImplementation.Produce.YEW,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.YEW
          ].getStages() - 1
        )
      }
      if (value === 46) {
        return new PatchState(
          PatchImplementation.Produce.YEW,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 47) {
        return new PatchState(
          PatchImplementation.Produce.YEW,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 48 && value <= 59) {
        return new PatchState(
          PatchImplementation.Produce.MAGIC,
          CropState.GROWING,
          value - 48
        )
      }
      if (value === 60) {
        return new PatchState(
          PatchImplementation.Produce.MAGIC,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.MAGIC
          ].getStages() - 1
        )
      }
      if (value === 61) {
        return new PatchState(
          PatchImplementation.Produce.MAGIC,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 62) {
        return new PatchState(
          PatchImplementation.Produce.MAGIC,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 63 && value <= 72) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 73 && value <= 75) {
        return new PatchState(
          PatchImplementation.Produce.OAK,
          CropState.DISEASED,
          value - 72
        )
      }
      if (value === 77) {
        return new PatchState(
          PatchImplementation.Produce.OAK,
          CropState.DISEASED,
          4
        )
      }
      if (value >= 78 && value <= 79) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 80 && value <= 84) {
        return new PatchState(
          PatchImplementation.Produce.WILLOW,
          CropState.DISEASED,
          value - 79
        )
      }
      if (value === 86) {
        return new PatchState(
          PatchImplementation.Produce.WILLOW,
          CropState.DISEASED,
          6
        )
      }
      if (value >= 87 && value <= 88) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 89 && value <= 95) {
        return new PatchState(
          PatchImplementation.Produce.MAPLE,
          CropState.DISEASED,
          value - 88
        )
      }
      if (value === 97) {
        return new PatchState(
          PatchImplementation.Produce.MAPLE,
          CropState.DISEASED,
          8
        )
      }
      if (value >= 98 && value <= 99) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 100 && value <= 108) {
        return new PatchState(
          PatchImplementation.Produce.YEW,
          CropState.DISEASED,
          value - 99
        )
      }
      if (value === 110) {
        return new PatchState(
          PatchImplementation.Produce.YEW,
          CropState.DISEASED,
          10
        )
      }
      if (value >= 111 && value <= 112) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 113 && value <= 123) {
        return new PatchState(
          PatchImplementation.Produce.MAGIC,
          CropState.DISEASED,
          value - 112
        )
      }
      if (value === 125) {
        return new PatchState(
          PatchImplementation.Produce.MAGIC,
          CropState.DISEASED,
          12
        )
      }
      if (value >= 126 && value <= 136) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 137 && value <= 139) {
        return new PatchState(
          PatchImplementation.Produce.OAK,
          CropState.DEAD,
          value - 136
        )
      }
      if (value === 141) {
        return new PatchState(
          PatchImplementation.Produce.OAK,
          CropState.DEAD,
          4
        )
      }
      if (value >= 142 && value <= 143) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 144 && value <= 148) {
        return new PatchState(
          PatchImplementation.Produce.WILLOW,
          CropState.DEAD,
          value - 143
        )
      }
      if (value === 150) {
        return new PatchState(
          PatchImplementation.Produce.WILLOW,
          CropState.DEAD,
          6
        )
      }
      if (value >= 151 && value <= 152) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 153 && value <= 159) {
        return new PatchState(
          PatchImplementation.Produce.MAPLE,
          CropState.DEAD,
          value - 152
        )
      }
      if (value === 161) {
        return new PatchState(
          PatchImplementation.Produce.MAPLE,
          CropState.DEAD,
          8
        )
      }
      if (value >= 162 && value <= 163) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 164 && value <= 172) {
        return new PatchState(
          PatchImplementation.Produce.YEW,
          CropState.DEAD,
          value - 163
        )
      }
      if (value === 174) {
        return new PatchState(
          PatchImplementation.Produce.YEW,
          CropState.DEAD,
          10
        )
      }
      if (value >= 175 && value <= 176) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 177 && value <= 187) {
        return new PatchState(
          PatchImplementation.Produce.MAGIC,
          CropState.DEAD,
          value - 176
        )
      }
      if (value === 189) {
        return new PatchState(
          PatchImplementation.Produce.MAGIC,
          CropState.DEAD,
          12
        )
      }
      if (value >= 190 && value <= 191) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 192 && value <= 197) {
        return new PatchState(
          PatchImplementation.Produce.WILLOW,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 198 && value <= 255) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$9_$WRAPPER = PatchImplementation$9_$WRAPPER
  /** @ignore */
  class PatchImplementation$10_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 7) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 8 && value <= 14) {
        return new PatchState(
          PatchImplementation.Produce.TEAK,
          CropState.GROWING,
          value - 8
        )
      }
      if (value === 15) {
        return new PatchState(
          PatchImplementation.Produce.TEAK,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.TEAK
          ].getStages() - 1
        )
      }
      if (value === 16) {
        return new PatchState(
          PatchImplementation.Produce.TEAK,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 17) {
        return new PatchState(
          PatchImplementation.Produce.TEAK,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 18 && value <= 23) {
        return new PatchState(
          PatchImplementation.Produce.TEAK,
          CropState.DISEASED,
          value - 17
        )
      }
      if (value >= 24 && value <= 29) {
        return new PatchState(
          PatchImplementation.Produce.TEAK,
          CropState.DEAD,
          value - 23
        )
      }
      if (value >= 30 && value <= 37) {
        return new PatchState(
          PatchImplementation.Produce.MAHOGANY,
          CropState.GROWING,
          value - 30
        )
      }
      if (value === 38) {
        return new PatchState(
          PatchImplementation.Produce.MAHOGANY,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.MAHOGANY
          ].getStages() - 1
        )
      }
      if (value === 39) {
        return new PatchState(
          PatchImplementation.Produce.MAHOGANY,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value === 40) {
        return new PatchState(
          PatchImplementation.Produce.MAHOGANY,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 41 && value <= 47) {
        return new PatchState(
          PatchImplementation.Produce.MAHOGANY,
          CropState.DISEASED,
          value - 40
        )
      }
      if (value >= 48 && value <= 54) {
        return new PatchState(
          PatchImplementation.Produce.MAHOGANY,
          CropState.DEAD,
          value - 47
        )
      }
      if (value >= 55 && value <= 255) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$10_$WRAPPER = PatchImplementation$10_$WRAPPER
  /** @ignore */
  class PatchImplementation$11_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 7) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 8 && value <= 17) {
        return new PatchState(
          PatchImplementation.Produce.REDWOOD,
          CropState.GROWING,
          value - 8
        )
      }
      if (value === 18) {
        return new PatchState(
          PatchImplementation.Produce.REDWOOD,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 19 && value <= 27) {
        return new PatchState(
          PatchImplementation.Produce.REDWOOD,
          CropState.DISEASED,
          value - 18
        )
      }
      if (value >= 28 && value <= 36) {
        return new PatchState(
          PatchImplementation.Produce.REDWOOD,
          CropState.DEAD,
          value - 27
        )
      }
      if (value === 37) {
        return new PatchState(
          PatchImplementation.Produce.REDWOOD,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.REDWOOD
          ].getStages() - 1
        )
      }
      if (value >= 41 && value <= 55) {
        return new PatchState(
          PatchImplementation.Produce.REDWOOD,
          CropState.HARVESTABLE,
          0
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$11_$WRAPPER = PatchImplementation$11_$WRAPPER
  /** @ignore */
  class PatchImplementation$12_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 7) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 8 && value <= 19) {
        return new PatchState(
          PatchImplementation.Produce.SPIRIT_TREE,
          CropState.GROWING,
          value - 8
        )
      }
      if (value === 20) {
        return new PatchState(
          PatchImplementation.Produce.SPIRIT_TREE,
          CropState.GROWING,
          12
        )
      }
      if (value >= 21 && value <= 31) {
        return new PatchState(
          PatchImplementation.Produce.SPIRIT_TREE,
          CropState.DISEASED,
          value - 20
        )
      }
      if (value >= 32 && value <= 43) {
        return new PatchState(
          PatchImplementation.Produce.SPIRIT_TREE,
          CropState.DEAD,
          value - 31
        )
      }
      if (value === 44) {
        return new PatchState(
          PatchImplementation.Produce.SPIRIT_TREE,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.SPIRIT_TREE
          ].getStages() - 1
        )
      }
      if (value >= 45 && value <= 63) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$12_$WRAPPER = PatchImplementation$12_$WRAPPER
  /** @ignore */
  class PatchImplementation$13_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 7) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 8 && value <= 16) {
        return new PatchState(
          PatchImplementation.Produce.ATTAS,
          CropState.GROWING,
          value - 8
        )
      }
      if (value >= 17 && value <= 25) {
        return new PatchState(
          PatchImplementation.Produce.IASOR,
          CropState.GROWING,
          value - 17
        )
      }
      if (value >= 26 && value <= 34) {
        return new PatchState(
          PatchImplementation.Produce.KRONOS,
          CropState.GROWING,
          value - 26
        )
      }
      if (value >= 35 && value <= 255) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$13_$WRAPPER = PatchImplementation$13_$WRAPPER
  /** @ignore */
  class PatchImplementation$14_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 7) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 8 && value <= 14) {
        return new PatchState(
          PatchImplementation.Produce.CACTUS,
          CropState.GROWING,
          value - 8
        )
      }
      if (value >= 15 && value <= 18) {
        return new PatchState(
          PatchImplementation.Produce.CACTUS,
          CropState.HARVESTABLE,
          value - 15
        )
      }
      if (value >= 19 && value <= 24) {
        return new PatchState(
          PatchImplementation.Produce.CACTUS,
          CropState.DISEASED,
          value - 18
        )
      }
      if (value >= 25 && value <= 30) {
        return new PatchState(
          PatchImplementation.Produce.CACTUS,
          CropState.DEAD,
          value - 24
        )
      }
      if (value === 31) {
        return new PatchState(
          PatchImplementation.Produce.CACTUS,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.CACTUS
          ].getStages() - 1
        )
      }
      if (value >= 32 && value <= 38) {
        return new PatchState(
          PatchImplementation.Produce.POTATO_CACTUS,
          CropState.GROWING,
          value - 32
        )
      }
      if (value >= 39 && value <= 45) {
        return new PatchState(
          PatchImplementation.Produce.POTATO_CACTUS,
          CropState.HARVESTABLE,
          value - 39
        )
      }
      if (value >= 46 && value <= 51) {
        return new PatchState(
          PatchImplementation.Produce.POTATO_CACTUS,
          CropState.DISEASED,
          value - 45
        )
      }
      if (value >= 52 && value <= 57) {
        return new PatchState(
          PatchImplementation.Produce.POTATO_CACTUS,
          CropState.DEAD,
          value - 51
        )
      }
      if (value === 58) {
        return new PatchState(
          PatchImplementation.Produce.POTATO_CACTUS,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.POTATO_CACTUS
          ].getStages() - 1
        )
      }
      if (value >= 59 && value <= 255) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$14_$WRAPPER = PatchImplementation$14_$WRAPPER
  /** @ignore */
  class PatchImplementation$15_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 7) {
        return new PatchState(
          PatchImplementation.Produce.SEAWEED,
          CropState.GROWING,
          value - 4
        )
      }
      if (value >= 8 && value <= 10) {
        return new PatchState(
          PatchImplementation.Produce.SEAWEED,
          CropState.HARVESTABLE,
          value - 8
        )
      }
      if (value >= 11 && value <= 13) {
        return new PatchState(
          PatchImplementation.Produce.SEAWEED,
          CropState.DISEASED,
          value - 10
        )
      }
      if (value >= 14 && value <= 16) {
        return new PatchState(
          PatchImplementation.Produce.SEAWEED,
          CropState.DEAD,
          value - 13
        )
      }
      if (value >= 17 && value <= 255) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$15_$WRAPPER = PatchImplementation$15_$WRAPPER
  /** @ignore */
  class PatchImplementation$16_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 11) {
        return new PatchState(
          PatchImplementation.Produce.CALQUAT,
          CropState.GROWING,
          value - 4
        )
      }
      if (value >= 12 && value <= 18) {
        return new PatchState(
          PatchImplementation.Produce.CALQUAT,
          CropState.HARVESTABLE,
          value - 12
        )
      }
      if (value >= 19 && value <= 25) {
        return new PatchState(
          PatchImplementation.Produce.CALQUAT,
          CropState.DISEASED,
          value - 18
        )
      }
      if (value >= 26 && value <= 33) {
        return new PatchState(
          PatchImplementation.Produce.CALQUAT,
          CropState.DEAD,
          value - 25
        )
      }
      if (value === 34) {
        return new PatchState(
          PatchImplementation.Produce.CALQUAT,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.CALQUAT
          ].getStages() - 1
        )
      }
      if (value >= 35 && value <= 255) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$16_$WRAPPER = PatchImplementation$16_$WRAPPER
  /** @ignore */
  class PatchImplementation$17_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 4 && value <= 7) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 8 && value <= 12) {
        return new PatchState(
          PatchImplementation.Produce.CELASTRUS,
          CropState.GROWING,
          value - 8
        )
      }
      if (value === 13) {
        return new PatchState(
          PatchImplementation.Produce.CELASTRUS,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.CELASTRUS
          ].getStages() - 1
        )
      }
      if (value >= 14 && value <= 16) {
        return new PatchState(
          PatchImplementation.Produce.CELASTRUS,
          CropState.HARVESTABLE,
          value - 14
        )
      }
      if (value === 17) {
        return new PatchState(
          PatchImplementation.Produce.CELASTRUS,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 18 && value <= 22) {
        return new PatchState(
          PatchImplementation.Produce.CELASTRUS,
          CropState.DISEASED,
          value - 17
        )
      }
      if (value >= 23 && value <= 27) {
        return new PatchState(
          PatchImplementation.Produce.CELASTRUS,
          CropState.DEAD,
          value - 22
        )
      }
      if (value === 28) {
        return new PatchState(
          PatchImplementation.Produce.CELASTRUS,
          CropState.HARVESTABLE,
          0
        )
      }
      if (value >= 29 && value <= 255) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$17_$WRAPPER = PatchImplementation$17_$WRAPPER
  /** @ignore */
  class PatchImplementation$18_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 1) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3
        )
      }
      if (value >= 2 && value <= 9) {
        return new PatchState(
          PatchImplementation.Produce.GRAPE,
          CropState.GROWING,
          value - 2
        )
      }
      if (value === 10) {
        return new PatchState(
          PatchImplementation.Produce.GRAPE,
          CropState.GROWING,
          7
        )
      }
      if (value >= 11 && value <= 15) {
        return new PatchState(
          PatchImplementation.Produce.GRAPE,
          CropState.HARVESTABLE,
          value - 11
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$18_$WRAPPER = PatchImplementation$18_$WRAPPER
  /** @ignore */
  class PatchImplementation$19_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value >= 0 && value <= 3) {
        return new PatchState(
          PatchImplementation.Produce.WEEDS,
          CropState.GROWING,
          3 - value
        )
      }
      if (value >= 8 && value <= 13) {
        return new PatchState(
          PatchImplementation.Produce.CRYSTAL_TREE,
          CropState.GROWING,
          value - 8
        )
      }
      if (value === 14) {
        return new PatchState(
          PatchImplementation.Produce.CRYSTAL_TREE,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.CRYSTAL_TREE
          ].getStages() - 1
        )
      }
      if (value === 15) {
        return new PatchState(
          PatchImplementation.Produce.CRYSTAL_TREE,
          CropState.HARVESTABLE,
          0
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$19_$WRAPPER = PatchImplementation$19_$WRAPPER
  /** @ignore */
  class PatchImplementation$20_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value === 0) {
        return new PatchState(
          PatchImplementation.Produce.EMPTY_COMPOST_BIN,
          CropState.EMPTY,
          0
        )
      }
      if (value >= 1 && value <= 15) {
        return new PatchState(
          PatchImplementation.Produce.COMPOST,
          CropState.FILLING,
          value - 1
        )
      }
      if (value >= 16 && value <= 30) {
        return new PatchState(
          PatchImplementation.Produce.COMPOST,
          CropState.HARVESTABLE,
          value - 16
        )
      }
      if (value === 31 || value === 32) {
        return new PatchState(
          PatchImplementation.Produce.COMPOST,
          CropState.GROWING,
          value - 31
        )
      }
      if (value >= 33 && value <= 47) {
        return new PatchState(
          PatchImplementation.Produce.SUPERCOMPOST,
          CropState.FILLING,
          value - 33
        )
      }
      if (value >= 48 && value <= 62) {
        return new PatchState(
          PatchImplementation.Produce.SUPERCOMPOST,
          CropState.HARVESTABLE,
          value - 48
        )
      }
      if (value === 94) {
        return new PatchState(
          PatchImplementation.Produce.COMPOST,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.COMPOST
          ].getStages() - 1
        )
      }
      if (value === 95 || value === 96) {
        return new PatchState(
          PatchImplementation.Produce.SUPERCOMPOST,
          CropState.GROWING,
          value - 95
        )
      }
      if (value === 126) {
        return new PatchState(
          PatchImplementation.Produce.SUPERCOMPOST,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.SUPERCOMPOST
          ].getStages() - 1
        )
      }
      if (value >= 129 && value <= 143) {
        return new PatchState(
          PatchImplementation.Produce.ROTTEN_TOMATO,
          CropState.FILLING,
          value - 129
        )
      }
      if (value >= 144 && value <= 158) {
        return new PatchState(
          PatchImplementation.Produce.ROTTEN_TOMATO,
          CropState.HARVESTABLE,
          value - 144
        )
      }
      if (value >= 159 && value <= 160) {
        return new PatchState(
          PatchImplementation.Produce.ROTTEN_TOMATO,
          CropState.GROWING,
          value - 159
        )
      }
      if (value >= 176 && value <= 190) {
        return new PatchState(
          PatchImplementation.Produce.ULTRACOMPOST,
          CropState.HARVESTABLE,
          value - 176
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$20_$WRAPPER = PatchImplementation$20_$WRAPPER
  /** @ignore */
  class PatchImplementation$21_$WRAPPER extends PatchImplementation_$WRAPPER {
    constructor(_$ordinal, _$name, tab, name, healthCheckRequired) {
      super(_$ordinal, _$name, tab, name, healthCheckRequired)
    }
    /**
     *
     * @param {number} value
     * @return {PatchState}
     */
    forVarbitValue(value) {
      if (value === 0) {
        return new PatchState(
          PatchImplementation.Produce.EMPTY_BIG_COMPOST_BIN,
          CropState.EMPTY,
          0
        )
      }
      if (value >= 1 && value <= 15) {
        return new PatchState(
          PatchImplementation.Produce.BIG_COMPOST,
          CropState.FILLING,
          value - 1
        )
      }
      if (value >= 16 && value <= 30) {
        return new PatchState(
          PatchImplementation.Produce.BIG_COMPOST,
          CropState.HARVESTABLE,
          value - 16
        )
      }
      if (value >= 33 && value <= 47) {
        return new PatchState(
          PatchImplementation.Produce.BIG_SUPERCOMPOST,
          CropState.FILLING,
          value - 33
        )
      }
      if (value >= 48 && value <= 62) {
        return new PatchState(
          PatchImplementation.Produce.BIG_SUPERCOMPOST,
          CropState.HARVESTABLE,
          value - 48
        )
      }
      if (value >= 63 && value <= 77) {
        return new PatchState(
          PatchImplementation.Produce.BIG_COMPOST,
          CropState.FILLING,
          15 + value - 63
        )
      }
      if (value >= 78 && value <= 92) {
        return new PatchState(
          PatchImplementation.Produce.BIG_COMPOST,
          CropState.HARVESTABLE,
          15 + value - 78
        )
      }
      if (value === 93) {
        return new PatchState(
          PatchImplementation.Produce.BIG_COMPOST,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.BIG_COMPOST
          ].getStages() - 1
        )
      }
      if (value >= 97 && value <= 99) {
        return new PatchState(
          PatchImplementation.Produce.BIG_SUPERCOMPOST,
          CropState.GROWING,
          value - 97
        )
      }
      if (value >= 100 && value <= 114) {
        return new PatchState(
          PatchImplementation.Produce.BIG_SUPERCOMPOST,
          CropState.HARVESTABLE,
          15 + value - 100
        )
      }
      if (value >= 127 && value <= 128) {
        return new PatchState(
          PatchImplementation.Produce.BIG_COMPOST,
          CropState.GROWING,
          value - 127
        )
      }
      if (value >= 129 && value <= 143) {
        return new PatchState(
          PatchImplementation.Produce.BIG_ROTTEN_TOMATO,
          CropState.FILLING,
          value - 129
        )
      }
      if (value >= 144 && value <= 158) {
        return new PatchState(
          PatchImplementation.Produce.BIG_ROTTEN_TOMATO,
          CropState.HARVESTABLE,
          value - 144
        )
      }
      if (value >= 159 && value <= 160) {
        return new PatchState(
          PatchImplementation.Produce.BIG_ROTTEN_TOMATO,
          CropState.GROWING,
          value - 159
        )
      }
      if (value >= 161 && value <= 175) {
        return new PatchState(
          PatchImplementation.Produce.BIG_SUPERCOMPOST,
          CropState.FILLING,
          15 + value - 161
        )
      }
      if (value >= 176 && value <= 205) {
        return new PatchState(
          PatchImplementation.Produce.BIG_ULTRACOMPOST,
          CropState.HARVESTABLE,
          value - 176
        )
      }
      if (value >= 207 && value <= 221) {
        return new PatchState(
          PatchImplementation.Produce.BIG_ROTTEN_TOMATO,
          CropState.HARVESTABLE,
          15 + value - 207
        )
      }
      if (value === 222) {
        return new PatchState(
          PatchImplementation.Produce.BIG_ROTTEN_TOMATO,
          CropState.GROWING,
          PatchImplementation.Produce['_$wrappers'][
            PatchImplementation.Produce.BIG_ROTTEN_TOMATO
          ].getStages() - 1
        )
      }
      if (value >= 223 && value <= 237) {
        return new PatchState(
          PatchImplementation.Produce.BIG_ROTTEN_TOMATO,
          CropState.FILLING,
          15 + value - 223
        )
      }
      return null
    }
  }
  PatchImplementation.PatchImplementation$21_$WRAPPER = PatchImplementation$21_$WRAPPER
})(PatchImplementation || (PatchImplementation = {}))
PatchImplementation['_$wrappers'] = {
  0: new PatchImplementation.PatchImplementation$0_$WRAPPER(
    0,
    'BELLADONNA',
    Tab.SPECIAL,
    '',
    false
  ),
  1: new PatchImplementation.PatchImplementation$1_$WRAPPER(
    1,
    'MUSHROOM',
    Tab.SPECIAL,
    '',
    false
  ),
  2: new PatchImplementation.PatchImplementation$2_$WRAPPER(
    2,
    'HESPORI',
    Tab.SPECIAL,
    '',
    true
  ),
  3: new PatchImplementation.PatchImplementation$3_$WRAPPER(
    3,
    'ALLOTMENT',
    Tab.ALLOTMENT,
    '',
    false
  ),
  4: new PatchImplementation.PatchImplementation$4_$WRAPPER(
    4,
    'HERB',
    Tab.HERB,
    '',
    false
  ),
  5: new PatchImplementation.PatchImplementation$5_$WRAPPER(
    5,
    'FLOWER',
    Tab.FLOWER,
    '',
    false
  ),
  6: new PatchImplementation.PatchImplementation$6_$WRAPPER(
    6,
    'BUSH',
    Tab.BUSH,
    '',
    true
  ),
  7: new PatchImplementation.PatchImplementation$7_$WRAPPER(
    7,
    'FRUIT_TREE',
    Tab.FRUIT_TREE,
    '',
    true
  ),
  8: new PatchImplementation.PatchImplementation$8_$WRAPPER(
    8,
    'HOPS',
    Tab.HOPS,
    '',
    false
  ),
  9: new PatchImplementation.PatchImplementation$9_$WRAPPER(
    9,
    'TREE',
    Tab.TREE,
    '',
    true
  ),
  10: new PatchImplementation.PatchImplementation$10_$WRAPPER(
    10,
    'HARDWOOD_TREE',
    Tab.TREE,
    'Hardwood Trees',
    true
  ),
  11: new PatchImplementation.PatchImplementation$11_$WRAPPER(
    11,
    'REDWOOD',
    Tab.TREE,
    'Redwood Trees',
    true
  ),
  12: new PatchImplementation.PatchImplementation$12_$WRAPPER(
    12,
    'SPIRIT_TREE',
    Tab.TREE,
    'Spirit Trees',
    true
  ),
  13: new PatchImplementation.PatchImplementation$13_$WRAPPER(
    13,
    'ANIMA',
    Tab.SPECIAL,
    '',
    false
  ),
  14: new PatchImplementation.PatchImplementation$14_$WRAPPER(
    14,
    'CACTUS',
    Tab.SPECIAL,
    'Cactus',
    true
  ),
  15: new PatchImplementation.PatchImplementation$15_$WRAPPER(
    15,
    'SEAWEED',
    Tab.SPECIAL,
    'Seaweed',
    false
  ),
  16: new PatchImplementation.PatchImplementation$16_$WRAPPER(
    16,
    'CALQUAT',
    Tab.FRUIT_TREE,
    'Calquat',
    true
  ),
  17: new PatchImplementation.PatchImplementation$17_$WRAPPER(
    17,
    'CELASTRUS',
    Tab.FRUIT_TREE,
    'Celastrus',
    true
  ),
  18: new PatchImplementation.PatchImplementation$18_$WRAPPER(
    18,
    'GRAPES',
    Tab.GRAPE,
    '',
    true
  ),
  19: new PatchImplementation.PatchImplementation$19_$WRAPPER(
    19,
    'CRYSTAL_TREE',
    Tab.FRUIT_TREE,
    'Crystal Tree',
    true
  ),
  20: new PatchImplementation.PatchImplementation$20_$WRAPPER(
    20,
    'COMPOST',
    Tab.SPECIAL,
    'Compost Bin',
    true
  ),
  21: new PatchImplementation.PatchImplementation$21_$WRAPPER(
    21,
    'BIG_COMPOST',
    Tab.SPECIAL,
    'Big Compost Bin',
    true
  )
}
