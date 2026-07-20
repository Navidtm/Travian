<script setup lang="ts">
import { computed } from 'vue'
import { Minus, Plus } from '@lucide/vue'

const props = withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    max?: number
    tone?: 'ember' | 'gold'
  }>(),
  { min: 0, max: 20, tone: 'gold' }
)

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const clamped = computed(() => Math.max(props.min, Math.min(props.max, Math.round(props.modelValue || 0))))

function step(delta: number) {
  emit('update:modelValue', Math.max(props.min, Math.min(props.max, clamped.value + delta)))
}

function setDirect(value: string) {
  const n = Math.max(props.min, Math.min(props.max, Math.round(Number(value) || 0)))
  emit('update:modelValue', n)
}

const toneText = computed(() => (props.tone === 'ember' ? 'text-ember-400' : 'text-gold-400'))
</script>

<template>
  <div class="flex items-center overflow-hidden rounded-md border border-white/[0.08] bg-ink-900/70">
    <button
      type="button"
      class="flex h-7 w-6 shrink-0 items-center justify-center text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-slate-200 disabled:pointer-events-none disabled:opacity-30"
      :disabled="clamped <= min"
      @click="step(-1)"
      aria-label="Decrease level"
    >
      <Minus :size="11" />
    </button>
    <input
      type="number"
      :min="min"
      :max="max"
      class="h-7 w-8 shrink-0 border-x border-white/[0.06] bg-transparent text-center text-xs font-semibold tabular-nums outline-none"
      :class="toneText"
      :value="clamped"
      @input="setDirect(($event.target as HTMLInputElement).value)"
    />
    <button
      type="button"
      class="flex h-7 w-6 shrink-0 items-center justify-center text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-slate-200 disabled:pointer-events-none disabled:opacity-30"
      :disabled="clamped >= max"
      @click="step(1)"
      aria-label="Increase level"
    >
      <Plus :size="11" />
    </button>
  </div>
</template>
