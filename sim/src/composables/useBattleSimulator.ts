import { reactive, ref, computed } from 'vue'
import {
  simulateBattle,
  createEmptyAttacker,
  createEmptyDefender,
} from '@/engine/battleEngine'
import type { BattleConfig, BattleResult, AttackType } from '@/types/battle'

export function useBattleSimulator() {
  const attacker = reactive(createEmptyAttacker())
  const defender = reactive(createEmptyDefender())
  const attackType = ref<AttackType>('normal')

  const result = ref<BattleResult | null>(null)
  const hasSimulated = computed(() => result.value !== null)

  function runSimulation() {
    const config: BattleConfig = {
      attacker: {
        tribe: attacker.tribe,
        units: { ...attacker.units },
        unitAttackLevels: { ...attacker.unitAttackLevels },
        hero: { ...attacker.hero },
        population: attacker.population,
      },
      defender: {
        tribe: defender.tribe,
        units: { ...defender.units },
        unitDefenseLevels: { ...defender.unitDefenseLevels },
        hero: { ...defender.hero },
        wallLevel: defender.wallLevel,
        residenceLevel: defender.residenceLevel,
        population: defender.population,
        storedResources: defender.storedResources,
      },
      attackType: attackType.value,
    }
    result.value = simulateBattle(config)
  }

  function reset() {
    Object.assign(attacker, createEmptyAttacker())
    Object.assign(defender, createEmptyDefender())
    attackType.value = 'normal'
    result.value = null
  }

  return {
    attacker,
    defender,
    attackType,
    result,
    hasSimulated,
    runSimulation,
    reset,
  }
}
