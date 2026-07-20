import { getUnitDefinition, getTribe, getUnitsForTribe } from '@/data/units'
import type { UnitComposition } from '@/types/units'
import type {
  AttackerConfig,
  DefenderConfig,
  BattleConfig,
  BattleResult,
  SideResult,
  UnitOutcome,
  LootResult,
  BattleModifiers,
  UnitLevels,
  ArmyPlannerRequest,
  ArmyPlannerCandidate,
} from '@/types/battle'

/**
 * ============================================================================
 * TRAVIAN BATTLE ENGINE
 * ============================================================================
 *
 * This engine was corrected against a real Travian game server engine
 * (a TravianZ-derived codebase's `Battle.php`), replacing Phase 1's
 * approximations with formulas verified line-by-line against that source.
 * Constants (wall percentages, the 1.5 loss exponent, the M-factor curve,
 * the morale curve) are reproduced as found there; artifact/festival/hero-
 * item bonuses are omitted because the source engine itself zeroes them out
 * in simulator context (village/user IDs of 0 resolve to neutral multipliers).
 *
 * FORMULAS
 * ---------------------------------------------------------------------------
 * 1. ATTACK. Units split into an infantry-attack pool and a cavalry-attack
 *    pool (by unit category — note some "mounted-sounding" scouts, e.g. the
 *    Teuton Scout and Hun Scout Rider, are infantry-category in the source
 *    engine). The attacking hero's "Off. bonus %" multiplies BOTH pools;
 *    the hero's flat "Off. points" (Fighting Strength) is added to the
 *    infantry pool only — this asymmetry is intentional and matches the
 *    source engine exactly.
 *
 *      rap = infantryAttack + cavalryAttack
 *
 * 2. DEFENSE. Defending units similarly split into infantry-defense and
 *    cavalry-defense totals. The defending hero's "Def. bonus %" multiplies
 *    both totals. Then wall and residence bonuses apply:
 *
 *      wallMultiplier = (1 + tribeWallBonus) ^ wallLevel
 *      residenceBonus = 2 * residenceLevel^2 + 10   (always >= 10)
 *
 *      if wallLevel > 0:
 *          infDef *= wallMultiplier; cavDef *= wallMultiplier
 *          infDef += residenceBonus * wallMultiplier
 *          cavDef += residenceBonus * wallMultiplier
 *          (if the defending army is completely empty, the wall itself
 *           still contributes a small base defense of 10 * wallMultiplier
 *           * wallLevel before the residence bonus is added — an empty
 *           village behind a wall is not literally defenseless)
 *      else:
 *          infDef += residenceBonus; cavDef += residenceBonus
 *
 *    The final effective defense blends infantry/cavalry defense by the
 *    ATTACKER's cavalry attack share (Travian's real infantry-vs-cavalry
 *    defense split):
 *
 *      rdp = (cavalryAttack / rap) * cavDef + (infantryAttack / rap) * infDef
 *
 * 3. MORALE BONUS. Only kicks in when the attacker's village population
 *    exceeds the defender's — it boosts the defender's effective power so
 *    that small villages aren't helplessly crushed by much larger ones:
 *
 *      moraleBonus = attackerPop > defenderPop
 *          ? 1 / max(0.667, (defenderPop/attackerPop) ^ (0.2 * min(1, rap/rdp)))
 *          : 1
 *
 * 4. M-FACTOR. A battle-size dependent exponent. Large battles (1000+ total
 *    troops on both sides combined) use a slightly gentler exponent so
 *    massive engagements are less winner-take-all:
 *
 *      M = totalTroops >= 1000
 *          ? clamp(2 * (1.8592 - totalTroops^0.015), 1.2578, 1.5)
 *          : 1.5
 *
 * 5. CASUALTIES. Normal attacks and Raids use genuinely different formulas
 *    (this was the single biggest gap in Phase 1, which used one formula
 *    for both):
 *
 *      NORMAL ATTACK — decisive: the loser is reduced to (up to) 100%
 *      losses, while the winner's losses scale with the power ratio:
 *
 *        winner = rap > rdp
 *        if winner:
 *            attackerLoss = (rdp*moraleBonus / rap) ^ M   (defender: 100%)
 *            — unless attackerLoss > 1, in which case morale flips the
 *              outcome: attacker is capped at 100% loss and the defender's
 *              loss is recomputed as the (now) winning side
 *        else: attacker loses 100%, defender's loss = (rap / (rdp*moraleBonus)) ^ M
 *
 *      RAID — smooth: losses follow a logistic curve, so even a decisively
 *      losing side keeps some survivors and even a decisive winner takes
 *      some losses:
 *
 *        ratio  = winner ? (rdp*moraleBonus/rap) : (rap/(rdp*moraleBonus))
 *        holder = ratio^M / (1 + ratio^M)
 *        attackerLoss = winner ? holder : 1 - holder
 *        defenderLoss = winner ? 1 - holder : holder
 *
 * 6. LOOT. Survivors' total carry capacity caps how many resources can be
 *    taken, capped again by what the village has stored. (Deeper raid-vs-
 *    normal loot differences — population-based loot caps, resource field
 *    destruction — are a later-phase concern; the source engine's own
 *    "max bounty" calculation for the simulator uses this same
 *    capacity-based cap for both attack types.)
 * ============================================================================
 */

const LOSS_EXPONENT_DEFAULT = 1.5
const LOSS_EXPONENT_FLOOR = 1.2578

/**
 * Blacksmith (attack) / Armory (defense) per-unit upgrade curve, 0-20,
 * reproduced from the source engine exactly:
 *
 *   boosted = base + (base + 300 * populationCost / 7) * (1.007^level - 1)
 *
 * Level 0 reduces to `boosted === base` since 1.007^0 - 1 === 0.
 */
function round4(n: number): number {
  return Math.round(n * 10000) / 10000
}

function boostedStat(base: number, populationCost: number, level: number): number {
  const clampedLevel = Math.max(0, Math.min(20, Math.floor(level || 0)))
  if (clampedLevel === 0) return base
  const growth = Math.pow(1.007, clampedLevel) - 1
  return round4(base + (base + (300 * populationCost) / 7) * growth)
}

function levelFor(levels: UnitLevels | undefined, unitId: string): number {
  return Math.max(0, Math.min(20, Math.floor(levels?.[unitId] || 0)))
}

interface ComposedAttack {
  infantryAttack: number
  cavalryAttack: number
  total: number
}

interface ComposedDefense {
  infantryDefense: number
  cavalryDefense: number
}

function sumUnitCounts(units: UnitComposition): number {
  let total = 0
  for (const countRaw of Object.values(units)) {
    total += Math.max(0, Math.floor(countRaw || 0))
  }
  return total
}

function composeRawAttack(units: UnitComposition, levels: UnitLevels): ComposedAttack {
  let infantryAttack = 0
  let cavalryAttack = 0

  for (const [unitId, countRaw] of Object.entries(units)) {
    const count = Math.max(0, Math.floor(countRaw || 0))
    if (count === 0) continue
    const def = getUnitDefinition(unitId)
    if (!def) continue
    const attackStat = boostedStat(def.attack, def.populationCost, levelFor(levels, unitId))
    const power = count * attackStat
    if (def.category === 'cavalry') cavalryAttack += power
    else infantryAttack += power
  }

  return { infantryAttack, cavalryAttack, total: infantryAttack + cavalryAttack }
}

function composeRawDefense(units: UnitComposition, levels: UnitLevels): ComposedDefense {
  let infantryDefense = 0
  let cavalryDefense = 0

  for (const [unitId, countRaw] of Object.entries(units)) {
    const count = Math.max(0, Math.floor(countRaw || 0))
    if (count === 0) continue
    const def = getUnitDefinition(unitId)
    if (!def) continue
    const level = levelFor(levels, unitId)
    const di = boostedStat(def.defenseInfantry, def.populationCost, level)
    const dc = boostedStat(def.defenseCavalry, def.populationCost, level)
    infantryDefense += count * di
    cavalryDefense += count * dc
  }

  return { infantryDefense, cavalryDefense }
}

function applyAttackerHero(attack: ComposedAttack, attacker: AttackerConfig): ComposedAttack {
  if (!attacker.hero.enabled) return attack
  const ob = 1 + Math.max(0, attacker.hero.offBonusPercent || 0) / 100
  const infantryAttack = attack.infantryAttack * ob + Math.max(0, attacker.hero.offPoints || 0)
  const cavalryAttack = attack.cavalryAttack * ob
  return { infantryAttack, cavalryAttack, total: infantryAttack + cavalryAttack }
}

function applyDefenderHero(defense: ComposedDefense, defender: DefenderConfig): ComposedDefense {
  if (!defender.hero.enabled) return defense
  const ob = 1 + Math.max(0, defender.hero.defBonusPercent || 0) / 100
  return {
    infantryDefense: defense.infantryDefense * ob,
    cavalryDefense: defense.cavalryDefense * ob,
  }
}

function applyWallAndResidence(
  defense: ComposedDefense,
  defender: DefenderConfig
): { infantryDefense: number; cavalryDefense: number; wallMultiplier: number; residenceBonus: number } {
  const tribe = getTribe(defender.tribe)
  const wallBonus = tribe?.wallBonusPerLevel ?? 0
  const wallLevel = Math.max(0, Math.floor(defender.wallLevel || 0))
  const residenceLevel = Math.max(0, Math.min(20, Math.floor(defender.residenceLevel || 0)))
  const residenceBonus = 2 * residenceLevel * residenceLevel + 10

  let { infantryDefense, cavalryDefense } = defense

  if (wallLevel > 0) {
    const wallMultiplier = Math.pow(1 + wallBonus, wallLevel)

    if (infantryDefense > 0 || cavalryDefense > 0) {
      infantryDefense *= wallMultiplier
      cavalryDefense *= wallMultiplier
    } else {
      // An empty garrison behind a wall still has a small base defense.
      const baseWall = 10 * wallMultiplier * wallLevel
      infantryDefense = baseWall
      cavalryDefense = baseWall
    }

    const resBonus = residenceBonus * wallMultiplier
    infantryDefense += resBonus
    cavalryDefense += resBonus

    return { infantryDefense, cavalryDefense, wallMultiplier, residenceBonus }
  }

  infantryDefense += residenceBonus
  cavalryDefense += residenceBonus
  return { infantryDefense, cavalryDefense, wallMultiplier: 1, residenceBonus }
}

function blendDefense(defense: ComposedDefense, attack: ComposedAttack): number {
  if (attack.total <= 0) {
    return defense.infantryDefense + defense.cavalryDefense
  }
  const cavalryShare = attack.cavalryAttack / attack.total
  const infantryShare = 1 - cavalryShare
  return defense.infantryDefense * infantryShare + defense.cavalryDefense * cavalryShare
}

function computeMoraleBonus(
  attackerPop: number,
  defenderPop: number,
  rap: number,
  rdp: number
): number {
  if (attackerPop <= defenderPop || attackerPop <= 0) return 1
  const safeDefPop = Math.max(0, defenderPop)
  const popRatio = safeDefPop / attackerPop
  const exponent = 0.2 * Math.min(1, rap / Math.max(rdp, 1))
  const base = Math.max(0.667, Math.pow(popRatio, exponent))
  return 1 / base
}

function computeMFactor(totalTroopsInvolved: number): number {
  if (totalTroopsInvolved < 1000) return LOSS_EXPONENT_DEFAULT
  const raw = 2 * (1.8592 - Math.pow(totalTroopsInvolved, 0.015))
  return Math.min(LOSS_EXPONENT_DEFAULT, Math.max(LOSS_EXPONENT_FLOOR, raw))
}

function clamp01(n: number): number {
  if (Number.isNaN(n) || !Number.isFinite(n)) return 0
  return Math.min(1, Math.max(0, n))
}

interface LossRatios {
  attackerLossRatio: number
  defenderLossRatio: number
}

function computeLossRatiosNormal(
  rap: number,
  rdp: number,
  moraleBonus: number,
  mFactor: number
): LossRatios {
  const safeRap = Math.max(1, rap)
  let winner = rap > rdp

  let attackerLossRatio: number
  if (winner) {
    attackerLossRatio = Math.pow((rdp * moraleBonus) / safeRap, mFactor)
    if (attackerLossRatio > 1) {
      attackerLossRatio = 1
      winner = false
    }
  } else {
    attackerLossRatio = 1
  }

  let defenderLossRatio: number
  if (winner) {
    defenderLossRatio = 1
  } else {
    defenderLossRatio = Math.pow(safeRap / Math.max(rdp * moraleBonus, 1), mFactor)
    if (defenderLossRatio > 1) defenderLossRatio = 1
  }

  return {
    attackerLossRatio: clamp01(attackerLossRatio),
    defenderLossRatio: clamp01(defenderLossRatio),
  }
}

function computeLossRatiosRaid(
  rap: number,
  rdp: number,
  moraleBonus: number,
  mFactor: number
): LossRatios {
  const safeRap = Math.max(1, rap)
  const winner = rap > rdp

  const ratio = winner ? (rdp * moraleBonus) / safeRap : safeRap / Math.max(rdp * moraleBonus, 1)
  const powRatio = Math.pow(ratio, mFactor)
  const holder = powRatio / (1 + powRatio)

  const attackerLossRatio = winner ? holder : 1 - holder
  const defenderLossRatio = winner ? 1 - holder : holder

  return {
    attackerLossRatio: clamp01(attackerLossRatio),
    defenderLossRatio: clamp01(defenderLossRatio),
  }
}

function buildUnitOutcomes(units: UnitComposition, lossRatio: number): UnitOutcome[] {
  const outcomes: UnitOutcome[] = []
  for (const [unitId, countRaw] of Object.entries(units)) {
    const sent = Math.max(0, Math.floor(countRaw || 0))
    if (sent === 0) continue
    const def = getUnitDefinition(unitId)
    if (!def) continue
    const losses = Math.round(sent * lossRatio)
    const survivors = Math.max(0, sent - losses)
    outcomes.push({ unitId, unitName: def.name, sent, losses, survivors })
  }
  return outcomes
}

function computeCarryCapacity(outcomes: UnitOutcome[]): number {
  let capacity = 0
  for (const outcome of outcomes) {
    const def = getUnitDefinition(outcome.unitId)
    if (!def) continue
    capacity += outcome.survivors * def.capacity
  }
  return capacity
}

export function simulateBattle(config: BattleConfig): BattleResult {
  const { attacker, defender } = config

  // --- Attack power -------------------------------------------------------
  const rawAttack = composeRawAttack(attacker.units, attacker.unitAttackLevels)
  const attack = applyAttackerHero(rawAttack, attacker)
  const rap = Math.round(attack.total)

  // --- Defense power --------------------------------------------------------
  const rawDefense = composeRawDefense(defender.units, defender.unitDefenseLevels)
  const heroDefense = applyDefenderHero(rawDefense, defender)
  const { infantryDefense, cavalryDefense, wallMultiplier, residenceBonus } = applyWallAndResidence(
    heroDefense,
    defender
  )
  const rdp =
    rap === 0
      ? Math.round(infantryDefense + cavalryDefense)
      : Math.round(blendDefense({ infantryDefense, cavalryDefense }, attack))

  // --- Morale & battle-size (M) factor -------------------------------------
  const moraleBonus = computeMoraleBonus(attacker.population, defender.population, rap, rdp)
  const totalTroopsInvolved = sumUnitCounts(attacker.units) + sumUnitCounts(defender.units)
  const mFactor = computeMFactor(totalTroopsInvolved)

  // --- Casualties -----------------------------------------------------------
  const { attackerLossRatio, defenderLossRatio } =
    config.attackType === 'normal'
      ? computeLossRatiosNormal(rap, rdp, moraleBonus, mFactor)
      : computeLossRatiosRaid(rap, rdp, moraleBonus, mFactor)

  const attackerUnitOutcomes = buildUnitOutcomes(attacker.units, attackerLossRatio)
  const defenderUnitOutcomes = buildUnitOutcomes(defender.units, defenderLossRatio)

  const attackerSide: SideResult = {
    totalPower: rap,
    rawPower: rawAttack.total,
    lossPercentage: attackerLossRatio * 100,
    units: attackerUnitOutcomes,
  }

  const defenderSide: SideResult = {
    totalPower: rdp,
    rawPower: rawDefense.infantryDefense + rawDefense.cavalryDefense,
    lossPercentage: defenderLossRatio * 100,
    units: defenderUnitOutcomes,
  }

  const carryCapacity = computeCarryCapacity(attackerUnitOutcomes)
  const available = Math.max(0, defender.storedResources || 0)
  const looted = Math.min(carryCapacity, available)
  const loot: LootResult = { carryCapacity, available, looted }

  const modifiers: BattleModifiers = {
    wallMultiplier,
    residenceBonus,
    moraleBonus,
    mFactor,
    totalTroopsInvolved,
  }

  let winner: BattleResult['winner'] = 'draw'
  if (rap > rdp) winner = 'attacker'
  else if (rdp > rap) winner = 'defender'

  return {
    config,
    attackPower: rap,
    defensePower: rawDefense.infantryDefense + rawDefense.cavalryDefense,
    effectiveDefensePower: rdp,
    modifiers,
    attacker: attackerSide,
    defender: defenderSide,
    loot,
    winner,
  }
}

export function createEmptyAttackerHero(): AttackerConfig['hero'] {
  return { enabled: false, offBonusPercent: 5, offPoints: 100 }
}

export function createEmptyDefenderHero(): DefenderConfig['hero'] {
  return { enabled: false, defBonusPercent: 5 }
}

export function createEmptyAttacker(): AttackerConfig {
  return {
    tribe: 'romans',
    units: {},
    unitAttackLevels: {},
    hero: createEmptyAttackerHero(),
    population: 500,
  }
}

export function createEmptyDefender(): DefenderConfig {
  return {
    tribe: 'teutons',
    units: {},
    unitDefenseLevels: {},
    hero: createEmptyDefenderHero(),
    wallLevel: 0,
    residenceLevel: 0,
    population: 500,
    storedResources: 10000,
  }
}

/**
 * ============================================================================
 * ARMY PLANNER
 * ============================================================================
 * Given a known enemy garrison (e.g. from a spy report — reuses the exact
 * same DefenderConfig the main simulator uses), find the minimum number of
 * each candidate attacking unit (evaluated one unit type at a time, i.e. a
 * pure single-unit-type army) needed to beat it while keeping the
 * attacker's own casualties at or below a target percentage.
 *
 * This deliberately does not attempt to optimize mixed-unit-type armies:
 * doing so changes the infantry/cavalry attack-share that the defense blend
 * depends on (see blendDefense above), turning this into a much harder
 * combinatorial search. Single-unit-type armies are also how most players
 * actually plan real attacks (e.g. "how many Teutonic Knights do I need"),
 * so this is both simpler and practically relevant. Mixed armies are a
 * natural future enhancement.
 *
 * For a fixed unit type, attacker losses are monotonically non-increasing
 * as troop count grows (more attack power only ever helps), so an
 * exponential bracket-then-binary-search finds the minimum satisfying count
 * quickly and reliably without scanning every integer.
 */

const PLANNER_SEARCH_CEILING = 2_000_000

function evaluatePlannerCandidate(
  unitId: string,
  count: number,
  request: ArmyPlannerRequest
): { attackerLossPercent: number; defenderLossPercent: number; winner: BattleResult['winner'] } {
  const config: BattleConfig = {
    attacker: {
      tribe: request.attackerTribe,
      units: { [unitId]: count },
      unitAttackLevels: { [unitId]: request.assumedAttackLevel },
      hero: request.attackerHero,
      population: request.attackerPopulation,
    },
    defender: request.defender,
    attackType: request.attackType,
  }
  const result = simulateBattle(config)
  return {
    attackerLossPercent: result.attacker.lossPercentage,
    defenderLossPercent: result.defender.lossPercentage,
    winner: result.winner,
  }
}

function meetsTarget(
  unitId: string,
  count: number,
  request: ArmyPlannerRequest,
  maxCasualtyPercent: number
): boolean {
  const { attackerLossPercent, winner } = evaluatePlannerCandidate(unitId, count, request)
  return winner === 'attacker' && attackerLossPercent <= maxCasualtyPercent
}

function findMinimalCount(
  unitId: string,
  request: ArmyPlannerRequest,
  maxCasualtyPercent: number
): { count: number; achievable: boolean } {
  if (meetsTarget(unitId, 1, request, maxCasualtyPercent)) {
    return { count: 1, achievable: true }
  }

  let low = 1
  let high = 2

  while (!meetsTarget(unitId, high, request, maxCasualtyPercent)) {
    if (high >= PLANNER_SEARCH_CEILING) {
      return { count: PLANNER_SEARCH_CEILING, achievable: false }
    }
    low = high
    high = Math.min(PLANNER_SEARCH_CEILING, high * 2)
  }

  // Binary search the boundary within (low, high]
  while (high - low > 1) {
    const mid = Math.floor((low + high) / 2)
    if (meetsTarget(unitId, mid, request, maxCasualtyPercent)) {
      high = mid
    } else {
      low = mid
    }
  }

  return { count: high, achievable: true }
}

export function findWinningArmies(request: ArmyPlannerRequest): ArmyPlannerCandidate[] {
  const maxCasualtyPercent = Math.max(0, Math.min(100, request.maxCasualtyPercent))
  const roster = getUnitsForTribe(request.attackerTribe).filter((u) => u.attack > 0)

  const candidates: ArmyPlannerCandidate[] = roster.map((unit) => {
    const { count, achievable } = findMinimalCount(unit.id, request, maxCasualtyPercent)
    const { attackerLossPercent, defenderLossPercent } = evaluatePlannerCandidate(
      unit.id,
      count,
      request
    )

    const resourceCost = {
      wood: unit.cost.wood * count,
      clay: unit.cost.clay * count,
      iron: unit.cost.iron * count,
      crop: unit.cost.crop * count,
      total: (unit.cost.wood + unit.cost.clay + unit.cost.iron + unit.cost.crop) * count,
    }

    return {
      unitId: unit.id,
      unitName: unit.name,
      count,
      attackerLossPercent,
      defenderLossPercent,
      populationCost: unit.populationCost * count,
      resourceCost,
      trainingTimeSeconds: unit.trainingTimeSeconds * count,
      achievable,
    }
  })

  return candidates.sort((a, b) => {
    if (a.achievable !== b.achievable) return a.achievable ? -1 : 1
    return a.resourceCost.total - b.resourceCost.total
  })
}
