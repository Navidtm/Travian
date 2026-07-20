/**
 * Core domain types describing tribes and units.
 * Kept deliberately generic/data-driven so future phases (e.g. new tribes,
 * new unit roles, artifacts, technologies) can extend this without
 * touching the battle engine itself.
 */

export type TribeId = 'romans' | 'gauls' | 'teutons' | 'egyptians' | 'huns' | 'spartans' | 'vikings'

/**
 * Defense in Travian is split into "infantry defense" and "cavalry defense".
 * Every unit has both values; which one applies is determined by the
 * composition of the ATTACKING force (see engine/battleEngine.ts).
 */
export type UnitCategory = 'infantry' | 'cavalry'

/**
 * Role is informational/UI-grouping only — it does not affect combat math
 * directly, but lets the UI group units sensibly and leaves room for
 * future mechanics (e.g. rams reducing wall level, catapults targeting
 * buildings, chiefs/senators reducing loyalty).
 */
export type UnitRole = 'offense' | 'defense' | 'scout' | 'siege' | 'admin' | 'settler'

export interface UnitCost {
  wood: number
  clay: number
  iron: number
  crop: number
}

export interface UnitDefinition {
  id: string
  tribe: TribeId
  name: string
  category: UnitCategory
  role: UnitRole
  /** Base attack points */
  attack: number
  /** Base defense points against infantry-flavoured attacks */
  defenseInfantry: number
  /** Base defense points against cavalry-flavoured attacks */
  defenseCavalry: number
  /** Fields per hour */
  speed: number
  /** Resources carried back when raiding/plundering */
  capacity: number
  /** Population ("culture point"/housing) cost per unit */
  populationCost: number
  /** Training cost in resources */
  cost: UnitCost
  /** Base training time in seconds (building level 1, no speed research/bonuses) */
  trainingTimeSeconds: number
}

/** Unit counts keyed by unit id, e.g. { legionnaire: 100, imperian: 50 } */
export type UnitComposition = Record<string, number>

export interface TribeDefinition {
  id: TribeId
  name: string
  /** Percentage defense bonus granted per wall level, before compounding */
  wallBonusPerLevel: number
  wallName: string
}
