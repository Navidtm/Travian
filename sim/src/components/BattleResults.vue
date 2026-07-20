<script setup lang="ts">
import { computed } from 'vue'
import { Swords, ShieldCheck, Skull, Package, Trophy } from '@lucide/vue'
import type { BattleResult } from '@/types/battle'
import StatCard from './StatCard.vue'
import UnitResultRow from './UnitResultRow.vue'

const props = defineProps<{ result: BattleResult }>()

function fmt(n: number) {
  return Math.round(n).toLocaleString('en-US')
}

const winnerLabel = computed(() => {
  if (props.result.winner === 'attacker') return 'Attacker wins'
  if (props.result.winner === 'defender') return 'Defender holds'
  return 'Mutual annihilation'
})

const winnerTone = computed(() => {
  if (props.result.winner === 'attacker') return 'ember'
  if (props.result.winner === 'defender') return 'emerald'
  return 'gold'
})

const lootPercentage = computed(() => {
  if (props.result.loot.available <= 0) return 0
  return Math.min(100, (props.result.loot.looted / props.result.loot.available) * 100)
})
</script>

<template>
  <div class="space-y-6">
    <!-- Verdict banner -->
    <div class="panel animate-fade-up flex flex-col items-center gap-2 overflow-hidden px-6 py-8 text-center">
      <span
        class="icon-badge h-12 w-12 rounded-2xl"
        :class="{
          'border-ember-500/25 bg-ember-500/10 text-ember-400': winnerTone === 'ember',
          'border-emerald2-500/25 bg-emerald2-500/10 text-emerald2-400': winnerTone === 'emerald',
          'border-gold-500/25 bg-gold-500/10 text-gold-400': winnerTone === 'gold',
        }"
      >
        <Trophy v-if="winnerTone !== 'gold'" :size="22" />
        <Skull v-else :size="22" />
      </span>
      <p class="field-label">Battle Outcome</p>
      <p
        class="font-display text-3xl tracking-wide"
        :class="{
          'text-ember-400': winnerTone === 'ember',
          'text-emerald2-400': winnerTone === 'emerald',
          'text-gold-400': winnerTone === 'gold',
        }"
      >
        {{ winnerLabel }}
      </p>
      <p class="text-sm text-slate-500">
        {{ fmt(result.attackPower) }} attack vs {{ fmt(result.effectiveDefensePower) }} effective defense
      </p>
    </div>

    <!-- Headline stats -->
    <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard label="Total Attack Power" :value="fmt(result.attackPower)" tone="ember" :icon="Swords" />
      <StatCard
        label="Total Defense Power"
        :value="fmt(result.effectiveDefensePower)"
        tone="emerald"
        :icon="ShieldCheck"
        :sublabel="`Base ${fmt(result.defensePower)} × wall ${result.modifiers.wallMultiplier.toFixed(2)}`"
      />
      <StatCard
        label="Attacker Casualties"
        :value="`${result.attacker.lossPercentage.toFixed(1)}%`"
        tone="neutral"
        :icon="Skull"
      />
      <StatCard
        label="Defender Casualties"
        :value="`${result.defender.lossPercentage.toFixed(1)}%`"
        tone="neutral"
        :icon="Skull"
      />
    </div>

    <!-- Modifiers transparency panel -->
    <div class="panel animate-fade-up px-5 py-4">
      <p class="field-label mb-3">Battle Modifiers</p>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <p class="text-xs text-slate-500">Wall multiplier</p>
          <p class="text-sm font-medium text-slate-200">×{{ result.modifiers.wallMultiplier.toFixed(3) }}</p>
        </div>
        <div>
          <p class="text-xs text-slate-500">Residence bonus</p>
          <p class="text-sm font-medium text-slate-200">+{{ fmt(result.modifiers.residenceBonus) }}</p>
        </div>
        <div>
          <p class="text-xs text-slate-500">Morale bonus</p>
          <p class="text-sm font-medium text-slate-200">×{{ result.modifiers.moraleBonus.toFixed(3) }}</p>
        </div>
        <div>
          <p class="text-xs text-slate-500">M-factor (battle size)</p>
          <p class="text-sm font-medium text-slate-200">{{ result.modifiers.mFactor.toFixed(4) }}</p>
        </div>
      </div>
      <p v-if="result.modifiers.moraleBonus > 1" class="mt-3 text-xs text-gold-400/90">
        The defender's village population is much smaller than the attacker's, so a morale bonus is
        boosting their effective defense.
      </p>
    </div>

    <!-- Loot -->
    <div class="panel animate-fade-up px-5 py-4">
      <div class="mb-3 flex items-center justify-between">
        <p class="field-label flex items-center gap-1.5">
          <Package :size="12" class="text-slate-500" />
          Resources Looted
        </p>
        <p class="text-sm font-semibold text-gold-400">{{ fmt(result.loot.looted) }}</p>
      </div>
      <div class="h-2 overflow-hidden rounded-full bg-ink-700">
        <div
          class="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-700"
          :style="{ width: lootPercentage + '%' }"
        />
      </div>
      <div class="mt-2 flex justify-between text-xs text-slate-500">
        <span>Carry capacity: {{ fmt(result.loot.carryCapacity) }}</span>
        <span>Village stock: {{ fmt(result.loot.available) }}</span>
      </div>
    </div>

    <!-- Unit tables -->
    <div class="grid gap-4 lg:grid-cols-2">
      <div class="panel animate-fade-up overflow-hidden">
        <div class="panel-header">
          <span class="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <Swords :size="14" class="text-ember-400" />
            Remaining Attacker Units
          </span>
          <span class="text-xs text-slate-500">{{ result.attacker.lossPercentage.toFixed(1) }}% lost</span>
        </div>
        <div class="overflow-x-auto px-5 py-3">
          <table v-if="result.attacker.units.length" class="w-full">
            <thead>
              <tr class="text-left text-[11px] uppercase tracking-wider text-slate-500">
                <th class="pb-2 font-medium">Unit</th>
                <th class="pb-2 px-3 text-right font-medium">Sent</th>
                <th class="pb-2 px-3 text-right font-medium">Lost</th>
                <th class="pb-2 pl-3 text-right font-medium">Survived</th>
              </tr>
            </thead>
            <tbody>
              <UnitResultRow v-for="u in result.attacker.units" :key="u.unitId" :outcome="u" />
            </tbody>
          </table>
          <p v-else class="py-4 text-center text-sm text-slate-500">No attacking units were sent.</p>
        </div>
      </div>

      <div class="panel animate-fade-up overflow-hidden">
        <div class="panel-header">
          <span class="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <ShieldCheck :size="14" class="text-emerald2-400" />
            Remaining Defender Units
          </span>
          <span class="text-xs text-slate-500">{{ result.defender.lossPercentage.toFixed(1) }}% lost</span>
        </div>
        <div class="overflow-x-auto px-5 py-3">
          <table v-if="result.defender.units.length" class="w-full">
            <thead>
              <tr class="text-left text-[11px] uppercase tracking-wider text-slate-500">
                <th class="pb-2 font-medium">Unit</th>
                <th class="pb-2 px-3 text-right font-medium">Garrisoned</th>
                <th class="pb-2 px-3 text-right font-medium">Lost</th>
                <th class="pb-2 pl-3 text-right font-medium">Survived</th>
              </tr>
            </thead>
            <tbody>
              <UnitResultRow v-for="u in result.defender.units" :key="u.unitId" :outcome="u" />
            </tbody>
          </table>
          <p v-else class="py-4 text-center text-sm text-slate-500">The village stands undefended.</p>
        </div>
      </div>
    </div>
  </div>
</template>
