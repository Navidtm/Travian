<script setup lang="ts">
import { Crown } from '@lucide/vue'
import type { AttackerHeroConfig, DefenderHeroConfig } from '@/types/battle'

const props = defineProps<{
  modelValue: AttackerHeroConfig | DefenderHeroConfig
  mode: 'attack' | 'defense'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: AttackerHeroConfig | DefenderHeroConfig]
}>()

function update(partial: Record<string, unknown>) {
  const next = { ...props.modelValue, ...partial } as AttackerHeroConfig | DefenderHeroConfig
  emit('update:modelValue', next)
}

function asAttackerHero(v: AttackerHeroConfig | DefenderHeroConfig): AttackerHeroConfig {
  return v as AttackerHeroConfig
}

function asDefenderHero(v: AttackerHeroConfig | DefenderHeroConfig): DefenderHeroConfig {
  return v as DefenderHeroConfig
}
</script>

<template>
  <div
    class="rounded-xl border p-3.5 transition-colors"
    :class="modelValue.enabled ? 'border-gold-500/25 bg-gold-500/[0.04]' : 'border-white/[0.06] bg-ink-900/50'"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Crown :size="15" :class="modelValue.enabled ? 'text-gold-400' : 'text-slate-500'" />
        <span class="text-sm font-medium text-slate-200">Hero</span>
      </div>
      <button
        type="button"
        role="switch"
        :aria-checked="modelValue.enabled"
        class="relative h-5 w-9 shrink-0 rounded-full transition-colors"
        :class="modelValue.enabled ? 'bg-gold-500' : 'bg-ink-600'"
        @click="update({ enabled: !modelValue.enabled })"
      >
        <span
          class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform"
          :class="modelValue.enabled ? 'translate-x-4' : 'translate-x-0.5'"
        />
      </button>
    </div>

    <div v-if="modelValue.enabled && mode === 'attack'" class="mt-3 grid grid-cols-2 gap-2.5">
      <div>
        <label class="field-label mb-1 block">Off. bonus %</label>
        <input
          type="number"
          min="0"
          class="input-base h-9"
          :value="asAttackerHero(modelValue).offBonusPercent"
          @input="update({ offBonusPercent: Number(($event.target as HTMLInputElement).value) || 0 })"
        />
      </div>
      <div>
        <label class="field-label mb-1 block">Off. points</label>
        <input
          type="number"
          min="0"
          class="input-base h-9"
          :value="asAttackerHero(modelValue).offPoints"
          @input="update({ offPoints: Number(($event.target as HTMLInputElement).value) || 0 })"
        />
      </div>
    </div>

    <div v-else-if="modelValue.enabled && mode === 'defense'" class="mt-3">
      <label class="field-label mb-1 block">Def. bonus %</label>
      <input
        type="number"
        min="0"
        class="input-base h-9"
        :value="asDefenderHero(modelValue).defBonusPercent"
        @input="update({ defBonusPercent: Number(($event.target as HTMLInputElement).value) || 0 })"
      />
    </div>
    <p v-else class="mt-1 text-xs text-slate-500">Disabled — no hero present in this battle.</p>
  </div>
</template>
