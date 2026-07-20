<script setup lang="ts">
import { computed } from 'vue'
import { Trophy, TriangleAlert } from '@lucide/vue'
import type { ArmyPlannerCandidate } from '@/types/battle'

const props = defineProps<{ candidates: ArmyPlannerCandidate[]; maxCasualtyPercent: number }>()

function fmt(n: number) {
  return Math.round(n).toLocaleString('en-US')
}

function fmtDuration(seconds: number) {
  const totalMinutes = Math.round(seconds / 60)
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

const achievableCandidates = computed(() => props.candidates.filter((c) => c.achievable))
const unachievableCandidates = computed(() => props.candidates.filter((c) => !c.achievable))
const best = computed(() => achievableCandidates.value[0] ?? null)
</script>

<template>
  <div class="animate-fade-up space-y-4">
    <div v-if="best" class="panel flex flex-col gap-1 border-gold-500/20 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-3">
        <span class="icon-badge h-11 w-11 rounded-2xl border-gold-500/25 bg-gold-500/10 text-gold-400">
          <Trophy :size="20" />
        </span>
        <div>
          <p class="field-label">Recommended (cheapest to train)</p>
          <p class="font-display text-xl text-gold-400">{{ fmt(best.count) }} × {{ best.unitName }}</p>
        </div>
      </div>
      <div class="text-sm text-slate-400 sm:text-right">
        <p>{{ best.attackerLossPercent.toFixed(1) }}% casualties (target ≤ {{ maxCasualtyPercent }}%)</p>
        <p>{{ fmt(best.resourceCost.total) }} total resources · {{ fmtDuration(best.trainingTimeSeconds) }} base training</p>
      </div>
    </div>

    <div class="panel overflow-hidden">
      <div class="panel-header">
        <span class="text-sm font-semibold text-slate-200">All Candidates</span>
        <span class="text-xs text-slate-500">Ranked by total resource cost</span>
      </div>
      <div class="overflow-x-auto px-5 py-3">
        <table class="w-full min-w-[560px]">
          <thead>
            <tr class="text-left text-[11px] uppercase tracking-wider text-slate-500">
              <th class="pb-2 font-medium">Unit</th>
              <th class="pb-2 px-3 text-right font-medium">Count needed</th>
              <th class="pb-2 px-3 text-right font-medium">Your losses</th>
              <th class="pb-2 px-3 text-right font-medium">Population</th>
              <th class="pb-2 px-3 text-right font-medium">Resources</th>
              <th class="pb-2 pl-3 text-right font-medium">Training time</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="c in achievableCandidates"
              :key="c.unitId"
              class="border-b border-white/[0.04] last:border-0"
              :class="{ 'bg-gold-500/[0.04]': c.unitId === best?.unitId }"
            >
              <td class="py-2.5 pr-3 text-sm text-slate-200">{{ c.unitName }}</td>
              <td class="py-2.5 px-3 text-right text-sm tabular-nums text-slate-300">{{ fmt(c.count) }}</td>
              <td class="py-2.5 px-3 text-right text-sm tabular-nums text-ember-400">
                {{ c.attackerLossPercent.toFixed(1) }}%
              </td>
              <td class="py-2.5 px-3 text-right text-sm tabular-nums text-slate-400">{{ fmt(c.populationCost) }}</td>
              <td class="py-2.5 px-3 text-right text-sm tabular-nums text-slate-400">{{ fmt(c.resourceCost.total) }}</td>
              <td class="py-2.5 pl-3 text-right text-sm tabular-nums text-slate-400">
                {{ fmtDuration(c.trainingTimeSeconds) }}
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="achievableCandidates.length === 0" class="py-4 text-center text-sm text-slate-500">
          No candidate unit could meet that casualty target within a reasonable army size.
        </p>
      </div>
    </div>

    <div v-if="unachievableCandidates.length" class="panel border-ember-500/20 px-5 py-4">
      <p class="flex items-center gap-1.5 text-xs text-ember-400">
        <TriangleAlert :size="13" />
        {{ unachievableCandidates.length }} unit type(s) couldn't hit that casualty target even at very large
        numbers, and were left out of the ranking above: {{ unachievableCandidates.map((c) => c.unitName).join(', ') }}.
      </p>
    </div>

    <p class="px-1 text-xs text-slate-600">
      Each row assumes a pure army of that single unit type — mixed-unit armies aren't optimized here yet,
      since mixing changes the attacker's infantry/cavalry split and therefore the defense the enemy gets to use.
    </p>
  </div>
</template>
