// @ts-nocheck
/* eslint-disable */
import { FarmingRegion } from './FarmingRegion'
import { FarmingPatch } from './FarmingPatch'
import { Varbits } from './Varbits'
import { PatchImplementation } from './PatchImplementation'
export class FarmingWorld {
  constructor() {
    /*private*/ this.regions = new Map()
    /*private*/ this.tabs = new Map()
    if (this.farmingGuildRegion === undefined) this.farmingGuildRegion = null
    this.add(
      new FarmingRegion(
        'Al Kharid',
        13106,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.CACTUS)
      )
    )
    this.add(
      new FarmingRegion(
        'Ardougne',
        10290,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.BUSH)
      )
    )
    this.add(
      new FarmingRegion(
        'Ardougne',
        10548,
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
        'Brimhaven',
        11058,
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
      )
    )
    this.add(
      new FarmingRegion(
        'Catherby',
        11062,
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
        'Catherby',
        11317,
        new FarmingPatch(
          '',
          Varbits.FARMING_4771,
          PatchImplementation.FRUIT_TREE
        )
      )
    )
    this.add(
      new FarmingRegion(
        "Champions' Guild",
        12596,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.BUSH)
      )
    )
    this.add(
      new FarmingRegion(
        'Draynor Manor',
        12340,
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
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.HOPS)
      )
    )
    this.add(
      new FarmingRegion(
        'Etceteria',
        10300,
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
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.TREE)
      )
    )
    this.add(
      new FarmingRegion(
        'Falador',
        12083,
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
      14907
    )
    this.add(
      new FarmingRegion(
        'Seaweed',
        15008,
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
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.TREE),
        new FarmingPatch(
          '',
          Varbits.FARMING_4772,
          PatchImplementation.FRUIT_TREE
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Harmony',
        15148,
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
        new FarmingPatch('', Varbits.FARMING_4775, PatchImplementation.COMPOST)
      )
    )
    this.add(
      new FarmingRegion(
        'Kourend',
        6711,
        new FarmingPatch(
          '',
          Varbits.FARMING_7904,
          PatchImplementation.SPIRIT_TREE
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Kourend',
        7223,
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
        new FarmingPatch(
          '',
          Varbits.FARMING_4771,
          PatchImplementation.FRUIT_TREE
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Lumbridge',
        12851,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.HOPS)
      )
    )
    this.add(
      new FarmingRegion(
        'Lumbridge',
        12594,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.TREE)
      )
    )
    this.add(
      new FarmingRegion(
        'Morytania',
        13622,
        new FarmingPatch(
          'Mushroom',
          Varbits.FARMING_4771,
          PatchImplementation.MUSHROOM
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Morytania',
        14391,
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
        'Port Sarim',
        12082,
        new FarmingPatch(
          '',
          Varbits.FARMING_4771,
          PatchImplementation.SPIRIT_TREE
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Rimmington',
        11570,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.BUSH)
      ),
      11826
    )
    this.add(
      new FarmingRegion(
        "Seers' Village",
        10551,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.HOPS)
      )
    )
    this.add(
      new FarmingRegion(
        'Tai Bwo Wannai',
        11056,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.CALQUAT)
      )
    )
    this.add(
      new FarmingRegion(
        'Taverley',
        11573,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.TREE)
      )
    )
    this.add(
      new FarmingRegion(
        'Tree Gnome Village',
        9777,
        new FarmingPatch(
          '',
          Varbits.FARMING_4771,
          PatchImplementation.FRUIT_TREE
        )
      )
    )
    this.add(
      new FarmingRegion(
        'Troll Stronghold',
        11321,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.HERB)
      )
    )
    this.add(
      new FarmingRegion(
        'Varrock',
        12854,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.TREE)
      ),
      12853
    )
    this.add(
      new FarmingRegion(
        'Yanille',
        10288,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.HOPS)
      )
    )
    this.add(
      new FarmingRegion(
        'Weiss',
        11325,
        new FarmingPatch('', Varbits.FARMING_4771, PatchImplementation.HERB)
      )
    )
    this.add(
      new FarmingRegion(
        'Farming Guild',
        5021,
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
          PatchImplementation.GIANT_COMPOST
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
      ))
    )
    this.add(
      new FarmingRegion(
        'Prifddinas',
        13151,
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
      )
    )
  }
  /*private*/ add(r, ...extraRegions) {
    this.regions.set(r.getRegionID(), r)
    for (let i = 0; i < extraRegions.length; i++) {
      {
        let er = extraRegions[i]
        this.regions.set(er, r)
      }
    }
    for (let i = 0; i < r.getPatches().length; i++) {
      {
        let p = r.getPatches()[i]
        let tab = PatchImplementation['_$wrappers'][
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
