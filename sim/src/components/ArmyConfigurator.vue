<script setup lang="ts">
import { computed } from 'vue'
import { Swords, Shield, Eye, Hammer, Crown, Home } from '@lucide/vue'
import { getUnitsForTribe } from '@/data/units'
import type { TribeId, UnitComposition } from '@/types/units'
import type { UnitLevels } from '@/types/battle'
import LevelStepper from './LevelStepper.vue'

const props = defineProps<{
  tribe: TribeId
  units: UnitComposition
  levels: UnitLevels
  /** Whether the level stepper controls attack (Blacksmith) or defense (Armory) */
  levelMode: 'attack' | 'defense'
  accent?: 'gold' | 'ember'
}>()

const emit = defineEmits<{
  'update:units': [value: UnitComposition]
  'update:levels': [value: UnitLevels]
}>()

const roster = computed(() => getUnitsForTribe(props.tribe))

const roleMeta: Record<string, { label: string; icon: typeof Swords }> = {
  offense: { label: 'Offense', icon: Swords },
  defense: { label: 'Defense', icon: Shield },
  scout: { label: 'Scout', icon: Eye },
  siege: { label: 'Siege', icon: Hammer },
  admin: { label: 'Administration', icon: Crown },
  settler: { label: 'Colonization', icon: Home },
}

function setCount(unitId: string, value: string) {
  const parsed = Math.max(0, Math.floor(Number(value) || 0))
  emit('update:units', { ...props.units, [unitId]: parsed })
}

function setLevel(unitId: string, value: number) {
  emit('update:levels', { ...props.levels, [unitId]: value })
}

const accentRing = computed(() =>
  props.accent === 'ember'
    ? 'focus:border-ember-500/60 focus:ring-ember-500/20'
    : 'focus:border-gold-500/60 focus:ring-gold-500/20'
)

const levelStepperTone = computed<'ember' | 'gold'>(() => (props.accent === 'ember' ? 'ember' : 'gold'))
const levelLabel = computed(() => (props.levelMode === 'attack' ? 'Atk Lv' : 'Def Lv'))
</script>

<template>
  <div class="divide-y divide-white/[0.05]">
    <div v-for="unit in roster" :key="unit.id" class="flex flex-col gap-2.5 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-3">
      <div class="flex min-w-0 flex-1 items-center gap-2.5">
        <span
          class="icon-badge border-white/[0.06] bg-white/[0.03] text-slate-500"
        >
          <component :is="roleMeta[unit.role]?.icon ?? Swords" :size="16" />
        </span>
        <div class="min-w-0">
          <p class="truncate text-sm font-medium text-slate-200">{{ unit.name }}</p>
          <p class="truncate text-[11px] text-slate-500">
            {{ roleMeta[unit.role]?.label }} · Atk {{ unit.attack }} · Def {{ unit.defenseInfantry }}/{{ unit.defenseCavalry }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 pl-[42px] sm:pl-0">
        <input
          type="number"
          min="0"
          step="1"
          placeholder="0"
          class="input-base h-9 w-24 text-right tabular-nums"
          :class="accentRing"
          :value="units[unit.id] ?? ''"
          @input="setCount(unit.id, ($event.target as HTMLInputElement).value)"
        />
        <div class="flex items-center gap-1.5">
          <span class="field-label hidden text-[10px] sm:inline">{{ levelLabel }}</span>
          <LevelStepper
            :model-value="levels[unit.id] ?? 0"
            :tone="levelStepperTone"
            @update:model-value="(v) => setLevel(unit.id, v)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
