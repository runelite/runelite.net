// @ts-nocheck
/* eslint-disable */
export class FarmingWorld {
  constructor() {
    this.regions = new Map()
    this.tabs = new Map()
    if (this.farmingGuildRegion === undefined) {
      this.farmingGuildRegion = null
    }
    this.add(
      new FarmingRegion(
        'Al Kharid',
        13106,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.CACTUS
        )
      ),
      13362,
      13105
    )
    this.add(
      new FarmingRegion(
        'Aldarin',
        5421,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.HOPS
        )
      ),
      5165,
      5166,
      5422,
      5677,
      5678
    )
    this.add(
      new FarmingRegion(
        'Ardougne',
        10290,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.BUSH
        )
      ),
      10546
    )
    this.add(
      new FarmingRegion(
        'Ardougne',
        10548,
        false,
        new FarmingPatch(
          'North',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_C,
          PatchImplementation.FLOWER
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_D,
          PatchImplementation.HERB
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_E,
          PatchImplementation.COMPOST
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Auburnvale',
        5427,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.TREE
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.BELLADONNA
        )
      ),
      5428,
      5684
    )
    this.add(
      new FarmingRegion(
        'Avium Savannah',
        6702,
        true,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.HARDWOOD_TREE
        )
      ),
      6446
    )
    this.add(
      new FarmingRegion(
        'Brimhaven',
        11058,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.FRUIT_TREE
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.SPIRIT_TREE
        )
      ),
      11057
    )
    this.add(
      new FarmingRegion(
        'Catherby',
        11062,
        false,
        new FarmingPatch(
          'North',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_C,
          PatchImplementation.FLOWER
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_D,
          PatchImplementation.HERB
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_E,
          PatchImplementation.COMPOST
        )
      ),
      11061,
      11318,
      11317
    )
    this.add(
      new FarmingRegion(
        'Catherby',
        11317,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.FRUIT_TREE
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Civitas illa Fortis',
        6192,
        false,
        new FarmingPatch(
          'North',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_C,
          PatchImplementation.FLOWER
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_D,
          PatchImplementation.HERB
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_E,
          PatchImplementation.COMPOST
        )
      ),
      6447,
      6448,
      6449,
      6191,
      6193
    )
    this.add(
      new FarmingRegion(
        "Champions' Guild",
        12596,
        true,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.BUSH
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Draynor Manor',
        12340,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.BELLADONNA
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Entrana',
        11060,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.HOPS
        )
      ),
      11316
    )
    this.add(
      new FarmingRegion(
        'Etceteria',
        10300,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.BUSH
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.SPIRIT_TREE
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Falador',
        11828,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.TREE
        )
      ),
      12084
    )
    this.add(
      new FarmingRegion(
        'Falador',
        12083,
        false,
        new FarmingPatch(
          'North West',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South East',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_C,
          PatchImplementation.FLOWER
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_D,
          PatchImplementation.HERB
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_E,
          PatchImplementation.COMPOST
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Fossil Island',
        14651,
        false,
        new FarmingPatch(
          'East',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.HARDWOOD_TREE
        ),
        new FarmingPatch(
          'Middle',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.HARDWOOD_TREE
        ),
        new FarmingPatch(
          'West',
          VarbitID.FARMING_TRANSMIT_C,
          PatchImplementation.HARDWOOD_TREE
        )
      ),
      14907,
      14908,
      15164,
      14652,
      14906,
      14650,
      15162,
      15163
    )
    this.add(
      new FarmingRegion(
        'Seaweed',
        15008,
        false,
        new FarmingPatch(
          'North',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.SEAWEED
        ),
        new FarmingPatch(
          'South',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.SEAWEED
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Gnome Stronghold',
        9781,
        true,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.TREE
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.FRUIT_TREE
        )
      ),
      9782,
      9526,
      9525
    )
    this.add(
      new FarmingRegion(
        'Harmony',
        15148,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.HERB
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Kastori',
        5243,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.CALQUAT
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.FRUIT_TREE
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_C,
          PatchImplementation.FLOWER
        )
      ),
      5167,
      5424
    )
    this.add(
      new FarmingRegion(
        'Kourend',
        6967,
        false,
        new FarmingPatch(
          'North East',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South West',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_C,
          PatchImplementation.FLOWER
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_D,
          PatchImplementation.HERB
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_E,
          PatchImplementation.COMPOST
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_F,
          PatchImplementation.SPIRIT_TREE
        )
      ),
      6711
    )
    this.add(
      new FarmingRegion(
        'Kourend',
        7223,
        false,
        new FarmingPatch(
          'East 1',
          VarbitID.FARMING_TRANSMIT_A1,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'East 2',
          VarbitID.FARMING_TRANSMIT_A2,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'East 3',
          VarbitID.FARMING_TRANSMIT_B1,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'East 4',
          VarbitID.FARMING_TRANSMIT_B2,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'East 5',
          VarbitID.FARMING_TRANSMIT_C1,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'East 6',
          VarbitID.FARMING_TRANSMIT_C2,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'West 1',
          VarbitID.FARMING_TRANSMIT_D1,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'West 2',
          VarbitID.FARMING_TRANSMIT_D2,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'West 3',
          VarbitID.FARMING_TRANSMIT_E1,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'West 4',
          VarbitID.FARMING_TRANSMIT_E2,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'West 5',
          VarbitID.FARMING_TRANSMIT_F1,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'West 6',
          VarbitID.FARMING_TRANSMIT_F2,
          PatchImplementation.GRAPES
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Lletya',
        9265,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.FRUIT_TREE
        )
      ),
      11103
    )
    this.add(
      new FarmingRegion(
        'Lumbridge',
        12851,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.HOPS
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Lumbridge',
        12594,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.TREE
        )
      ),
      12850
    )
    this.add(
      new FarmingRegion(
        'Morytania',
        13622,
        false,
        new FarmingPatch(
          'Mushroom',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.MUSHROOM
        )
      ),
      13878
    )
    this.add(
      new FarmingRegion(
        'Morytania',
        14391,
        false,
        new FarmingPatch(
          'North West',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South East',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_C,
          PatchImplementation.FLOWER
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_D,
          PatchImplementation.HERB
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_E,
          PatchImplementation.COMPOST
        )
      ),
      14390
    )
    this.add(
      new FarmingRegion(
        'Port Sarim',
        12082,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.SPIRIT_TREE
        )
      ),
      12083
    )
    this.add(
      new FarmingRegion(
        'Rimmington',
        11570,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.BUSH
        )
      ),
      11826
    )
    this.add(
      new FarmingRegion(
        "Seers' Village",
        10551,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.HOPS
        )
      ),
      10550
    )
    this.add(
      new FarmingRegion(
        'Tai Bwo Wannai',
        11056,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.CALQUAT
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Taverley',
        11573,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.TREE
        )
      ),
      11829
    )
    this.add(
      new FarmingRegion(
        'Tree Gnome Village',
        9777,
        true,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.FRUIT_TREE
        )
      ),
      10033
    )
    this.add(
      new FarmingRegion(
        'Troll Stronghold',
        11321,
        true,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.HERB
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Varrock',
        12854,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.TREE
        )
      ),
      12853
    )
    this.add(
      new FarmingRegion(
        'Yanille',
        10288,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.HOPS
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Weiss',
        11325,
        false,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.HERB
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Farming Guild',
        5021,
        true,
        new FarmingPatch(
          'Hespori',
          VarbitID.FARMING_TRANSMIT_J,
          PatchImplementation.HESPORI
        )
      )
    )
    this.add(
      (this.farmingGuildRegion = new FarmingRegion(
        'Farming Guild',
        4922,
        true,
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_G,
          PatchImplementation.TREE
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_E,
          PatchImplementation.HERB
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.BUSH
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_H,
          PatchImplementation.FLOWER
        ),
        new FarmingPatch(
          'North',
          VarbitID.FARMING_TRANSMIT_C,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South',
          VarbitID.FARMING_TRANSMIT_D,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_N,
          PatchImplementation.BIG_COMPOST
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_F,
          PatchImplementation.CACTUS
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.SPIRIT_TREE
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_K,
          PatchImplementation.FRUIT_TREE
        ),
        new FarmingPatch(
          'Anima',
          VarbitID.FARMING_TRANSMIT_M,
          PatchImplementation.ANIMA
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_L,
          PatchImplementation.CELASTRUS
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_I,
          PatchImplementation.REDWOOD
        )
      )),
      5177,
      5178,
      5179,
      4921,
      4923,
      4665,
      4666,
      4667
    )
    this.add(
      new FarmingRegion(
        'Prifddinas',
        13151,
        false,
        new FarmingPatch(
          'North',
          VarbitID.FARMING_TRANSMIT_A,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South',
          VarbitID.FARMING_TRANSMIT_B,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_C,
          PatchImplementation.FLOWER
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_E,
          PatchImplementation.CRYSTAL_TREE
        ),
        new FarmingPatch(
          '',
          VarbitID.FARMING_TRANSMIT_D,
          PatchImplementation.COMPOST
        )
      ),
      12895,
      12894,
      13150,
      12994,
      12993,
      12737,
      12738,
      12126,
      12127,
      13250
    )
  }
  /*private*/ add(r, ...extraRegions) {
    this.regions.set(r.getRegionID(), r)
    for (let i = 0; i < extraRegions.length; i++) {
      {
        const er = extraRegions[i]
        this.regions.set(er, r)
      }
    }
    for (let i = 0; i < r.getPatches().length; i++) {
      {
        const p = r.getPatches()[i]
        const tab = PatchImplementation['_$wrappers'][
          p.getImplementation()
        ].getTab()
        if (!this.tabs.has(tab)) {
          this.tabs.set(tab, new Array())
        }
        this.tabs.get(tab).push(p)
      }
    }
  }
  getFarmingGuildRegion() {
    return this.farmingGuildRegion
  }
  getRegions() {
    return this.regions
  }
  getTabs() {
    return this.tabs
  }
}
FarmingWorld['__class'] = 'timetracking.FarmingWorld'
import { PatchImplementation } from './PatchImplementation'
import { VarbitID } from './VarbitID'
import { FarmingPatch } from './FarmingPatch'
import { FarmingRegion } from './FarmingRegion'
