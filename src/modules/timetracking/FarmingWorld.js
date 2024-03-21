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
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.CACTUS)
      ),
      13362,
      13105
    )
    this.add(
      new FarmingRegion(
        'Ardougne',
        10290,
        false,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.BUSH)
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
          Varbits.FARMING_4771,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South',
          Varbits.FARMING_4772,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch('', Varbits.FARMING_4773, PatchImplementation.FLOWER),
        new FarmingPatch('', Varbits.FARMING_4774, PatchImplementation.HERB),
        new FarmingPatch('', Varbits.FARMING_4775, PatchImplementation.COMPOST)
      )
    )
    this.add(
      new FarmingRegion(
        'Avium Savannah',
        6702,
        true,
        new FarmingPatch(
          '',
          Varbits.FARMING_4771,
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
          Varbits.FARMING_4771,
          PatchImplementation.FRUIT_TREE
        ),
        new FarmingPatch(
          '',
          Varbits.FARMING_4772,
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
          Varbits.FARMING_4771,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South',
          Varbits.FARMING_4772,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch('', Varbits.FARMING_4773, PatchImplementation.FLOWER),
        new FarmingPatch('', Varbits.FARMING_4774, PatchImplementation.HERB),
        new FarmingPatch('', Varbits.FARMING_4775, PatchImplementation.COMPOST)
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
          Varbits.FARMING_4771,
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
          Varbits.FARMING_4771,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South',
          Varbits.FARMING_4772,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch('', Varbits.FARMING_4773, PatchImplementation.FLOWER),
        new FarmingPatch('', Varbits.FARMING_4774, PatchImplementation.HERB),
        new FarmingPatch('', Varbits.FARMING_4775, PatchImplementation.COMPOST)
      ),
      6448
    )
    this.add(
      new FarmingRegion(
        "Champions' Guild",
        12596,
        true,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.BUSH)
      )
    )
    this.add(
      new FarmingRegion(
        'Draynor Manor',
        12340,
        false,
        new FarmingPatch(
          'Belladonna',
          Varbits.FARMING_4771,
          PatchImplementation.BELLADONNA
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Entrana',
        11060,
        false,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.HOPS)
      ),
      11316
    )
    this.add(
      new FarmingRegion(
        'Etceteria',
        10300,
        false,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.BUSH),
        new FarmingPatch(
          '',
          Varbits.FARMING_4772,
          PatchImplementation.SPIRIT_TREE
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Falador',
        11828,
        false,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.TREE)
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
          Varbits.FARMING_4771,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South East',
          Varbits.FARMING_4772,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch('', Varbits.FARMING_4773, PatchImplementation.FLOWER),
        new FarmingPatch('', Varbits.FARMING_4774, PatchImplementation.HERB),
        new FarmingPatch('', Varbits.FARMING_4775, PatchImplementation.COMPOST)
      )
    )
    this.add(
      new FarmingRegion(
        'Fossil Island',
        14651,
        false,
        new FarmingPatch(
          'East',
          Varbits.FARMING_4771,
          PatchImplementation.HARDWOOD_TREE
        ),
        new FarmingPatch(
          'Middle',
          Varbits.FARMING_4772,
          PatchImplementation.HARDWOOD_TREE
        ),
        new FarmingPatch(
          'West',
          Varbits.FARMING_4773,
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
          Varbits.FARMING_4771,
          PatchImplementation.SEAWEED
        ),
        new FarmingPatch(
          'South',
          Varbits.FARMING_4772,
          PatchImplementation.SEAWEED
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Gnome Stronghold',
        9781,
        true,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.TREE),
        new FarmingPatch(
          '',
          Varbits.FARMING_4772,
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
          Varbits.FARMING_4771,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch('', Varbits.FARMING_4772, PatchImplementation.HERB)
      )
    )
    this.add(
      new FarmingRegion(
        'Kourend',
        6967,
        false,
        new FarmingPatch(
          'North East',
          Varbits.FARMING_4771,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South West',
          Varbits.FARMING_4772,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch('', Varbits.FARMING_4773, PatchImplementation.FLOWER),
        new FarmingPatch('', Varbits.FARMING_4774, PatchImplementation.HERB),
        new FarmingPatch('', Varbits.FARMING_4775, PatchImplementation.COMPOST),
        new FarmingPatch(
          '',
          Varbits.FARMING_7904,
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
          Varbits.GRAPES_4953,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'East 2',
          Varbits.GRAPES_4954,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'East 3',
          Varbits.GRAPES_4955,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'East 4',
          Varbits.GRAPES_4956,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'East 5',
          Varbits.GRAPES_4957,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'East 6',
          Varbits.GRAPES_4958,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'West 1',
          Varbits.GRAPES_4959,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'West 2',
          Varbits.GRAPES_4960,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'West 3',
          Varbits.GRAPES_4961,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'West 4',
          Varbits.GRAPES_4962,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'West 5',
          Varbits.GRAPES_4963,
          PatchImplementation.GRAPES
        ),
        new FarmingPatch(
          'West 6',
          Varbits.GRAPES_4964,
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
          Varbits.FARMING_4771,
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
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.HOPS)
      )
    )
    this.add(
      new FarmingRegion(
        'Lumbridge',
        12594,
        false,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.TREE)
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
          Varbits.FARMING_4771,
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
          Varbits.FARMING_4771,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South East',
          Varbits.FARMING_4772,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch('', Varbits.FARMING_4773, PatchImplementation.FLOWER),
        new FarmingPatch('', Varbits.FARMING_4774, PatchImplementation.HERB),
        new FarmingPatch('', Varbits.FARMING_4775, PatchImplementation.COMPOST)
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
          Varbits.FARMING_4771,
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
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.BUSH)
      ),
      11826
    )
    this.add(
      new FarmingRegion(
        "Seers' Village",
        10551,
        false,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.HOPS)
      ),
      10550
    )
    this.add(
      new FarmingRegion(
        'Tai Bwo Wannai',
        11056,
        false,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.CALQUAT)
      )
    )
    this.add(
      new FarmingRegion(
        'Taverley',
        11573,
        false,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.TREE)
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
          Varbits.FARMING_4771,
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
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.HERB)
      )
    )
    this.add(
      new FarmingRegion(
        'Varrock',
        12854,
        false,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.TREE)
      ),
      12853
    )
    this.add(
      new FarmingRegion(
        'Yanille',
        10288,
        false,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.HOPS)
      )
    )
    this.add(
      new FarmingRegion(
        'Weiss',
        11325,
        false,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.HERB)
      )
    )
    this.add(
      new FarmingRegion(
        'Farming Guild',
        5021,
        true,
        new FarmingPatch(
          'Hespori',
          Varbits.FARMING_7908,
          PatchImplementation.HESPORI
        )
      )
    )
    this.add(
      (this.farmingGuildRegion = new FarmingRegion(
        'Farming Guild',
        4922,
        true,
        new FarmingPatch('', Varbits.FARMING_7905, PatchImplementation.TREE),
        new FarmingPatch('', Varbits.FARMING_4775, PatchImplementation.HERB),
        new FarmingPatch('', Varbits.FARMING_4772, PatchImplementation.BUSH),
        new FarmingPatch('', Varbits.FARMING_7906, PatchImplementation.FLOWER),
        new FarmingPatch(
          'North',
          Varbits.FARMING_4773,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South',
          Varbits.FARMING_4774,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          '',
          Varbits.FARMING_7912,
          PatchImplementation.BIG_COMPOST
        ),
        new FarmingPatch('', Varbits.FARMING_7904, PatchImplementation.CACTUS),
        new FarmingPatch(
          '',
          Varbits.FARMING_4771,
          PatchImplementation.SPIRIT_TREE
        ),
        new FarmingPatch(
          '',
          Varbits.FARMING_7909,
          PatchImplementation.FRUIT_TREE
        ),
        new FarmingPatch(
          'Anima',
          Varbits.FARMING_7911,
          PatchImplementation.ANIMA
        ),
        new FarmingPatch(
          '',
          Varbits.FARMING_7910,
          PatchImplementation.CELASTRUS
        ),
        new FarmingPatch('', Varbits.FARMING_7907, PatchImplementation.REDWOOD)
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
          Varbits.FARMING_4771,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch(
          'South',
          Varbits.FARMING_4772,
          PatchImplementation.ALLOTMENT
        ),
        new FarmingPatch('', Varbits.FARMING_4773, PatchImplementation.FLOWER),
        new FarmingPatch(
          '',
          Varbits.FARMING_4775,
          PatchImplementation.CRYSTAL_TREE
        ),
        new FarmingPatch('', Varbits.FARMING_4774, PatchImplementation.COMPOST)
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
import { Varbits } from './Varbits'
import { FarmingPatch } from './FarmingPatch'
import { FarmingRegion } from './FarmingRegion'
