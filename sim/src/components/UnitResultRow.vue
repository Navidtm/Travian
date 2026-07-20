<script setup lang="ts">
import { computed } from 'vue'
import type { UnitOutcome } from '@/types/battle'

const props = defineProps<{ outcome: UnitOutcome }>()

function fmt(n: number) {
  return n.toLocaleString('en-US')
}

const survivalPercent = computed(() => {
  if (props.outcome.sent <= 0) return 0
  return Math.min(100, (props.outcome.survivors / props.outcome.sent) * 100)
})
</script>

<template>
  <tr class="border-b border-white/[0.04] last:border-0">
    <td class="py-2.5 pr-3">
      <p class="text-sm text-slate-300">{{ outcome.unitName }}</p>
      <div class="mt-1 h-1 w-full max-w-[120px] overflow-hidden rounded-full bg-ink-700">
        <div
          class="h-full rounded-full bg-gradient-to-r from-emerald2-500 to-emerald2-400 transition-all duration-500"
          :style="{ width: survivalPercent + '%' }"
        />
      </div>
    </td>
    <td class="py-2.5 px-3 text-right text-sm tabular-nums text-slate-400">{{ fmt(outcome.sent) }}</td>
    <td class="py-2.5 px-3 text-right text-sm tabular-nums text-ember-400">{{ fmt(outcome.losses) }}</td>
    <td class="py-2.5 pl-3 text-right text-sm font-medium tabular-nums text-emerald2-400">
      {{ fmt(outcome.survivors) }}
    </td>
  </tr>
</template>
