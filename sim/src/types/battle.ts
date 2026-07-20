import type { TribeId, UnitComposition } from './units'

export type AttackType = 'normal' | 'raid'

/**
 * Per-unit research/upgrade level (Blacksmith for attack, Armory for
 * defense), 0-20, keyed by unit id. Level 0 means unresearched/base stats.
 */
export type UnitLevels = Record<string, number>

/**
 * Mirrors the real simulator's hero fields exactly:
 * - offBonusPercent: the hero's "Attack bonus" skill (%), multiplies BOTH
 *   infantry and cavalry attack totals.
 * - offPoints: the hero's raw "Fighting Strength" when attacking — a flat
 *   attack value added to the (non-cavalry) attack pool.
 */
export interface AttackerHeroConfig {
  enabled: boolean
  offBonusPercent: number
  offPoints: number
}

/**
 * The real simulator only exposes a defense bonus percentage for the
 * defending hero (no flat defense-strength field) — a defending hero's raw
 * stats depend on persistent hero state that a stateless simulator can't
 * know, so only the trainable "Defense bonus" skill is exposed here.
 */
export interface DefenderHeroConfig {
  enabled: boolean
  defBonusPercent: number
}

export interface AttackerConfig {
  tribe: TribeId
  units: UnitComposition
  /** Blacksmith attack-upgrade level (0-20) per unit id */
  unitAttackLevels: UnitLevels
  hero: AttackerHeroConfig
  /** Village population — used for the morale bonus calculation */
  population: number
}

export interface DefenderConfig {
  tribe: TribeId
  units: UnitComposition
  /** Armory defense-upgrade level (0-20) per unit id */
  unitDefenseLevels: UnitLevels
  hero: DefenderHeroConfig
  wallLevel: number
  /** Residence / Palace / Command Center level (0-20) — grants flat defense */
  residenceLevel: number
  /** Village population — used for the morale bonus calculation */
  population: number
  /** Total resources currently stored in the defending village (sum of all 4 resource types) */
  storedResources: number
}

export interface BattleConfig {
  attacker: AttackerConfig
  defender: DefenderConfig
  attackType: AttackType
}

/** Per-unit outcome for one side of the battle */
export interface UnitOutcome {
  unitId: string
  unitName: string
  sent: number
  losses: number
  survivors: number
}

export interface SideResult {
  totalPower: number
  /** Power before wall/residence/hero modifiers (defender only) or raw sum (attacker) */
  rawPower: number
  lossPercentage: number
  units: UnitOutcome[]
}

export interface LootResult {
  carryCapacity: number
  available: number
  looted: number
}

export interface BattleModifiers {
  wallMultiplier: number
  residenceBonus: number
  moraleBonus: number
  /** Battle-size exponent (M): dampens toward 1.2578 for very large battles, otherwise 1.5 */
  mFactor: number
  totalTroopsInvolved: number
}

export interface BattleResult {
  config: BattleConfig
  attackPower: number
  defensePower: number
  effectiveDefensePower: number
  modifiers: BattleModifiers
  attacker: SideResult
  defender: SideResult
  loot: LootResult
  winner: 'attacker' | 'defender' | 'draw'
}

// ============================================================================
// ARMY PLANNER — "what's the cheapest army that beats this defense within X%
// casualties?" Reuses the same DefenderConfig a spy report would populate.
// ============================================================================

export interface ArmyPlannerRequest {
  attackerTribe: TribeId
  attackType: AttackType
  maxCasualtyPercent: number
  attackerPopulation: number
  attackerHero: AttackerHeroConfig
  /** Applied uniformly to every candidate unit for a fair, simple comparison */
  assumedAttackLevel: number
  defender: DefenderConfig
}

export interface ArmyPlannerResourceCost {
  wood: number
  clay: number
  iron: number
  crop: number
  total: number
}

export interface ArmyPlannerCandidate {
  unitId: string
  unitName: string
  /** Minimum count of this unit (alone) needed to meet the casualty target */
  count: number
  attackerLossPercent: number
  defenderLossPercent: number
  populationCost: number
  resourceCost: ArmyPlannerResourceCost
  trainingTimeSeconds: number
  /** False if no count up to the search ceiling satisfied the constraint */
  achievable: boolean
}
