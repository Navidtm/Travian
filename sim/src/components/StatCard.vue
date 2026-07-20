<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(
  defineProps<{
    label: string
    value: string
    tone?: 'gold' | 'ember' | 'emerald' | 'neutral'
    sublabel?: string
    icon?: Component
  }>(),
  { tone: 'neutral', sublabel: '' }
)

const toneClasses: Record<string, string> = {
  gold: 'text-gold-400',
  ember: 'text-ember-400',
  emerald: 'text-emerald2-400',
  neutral: 'text-slate-100',
}

const iconToneClasses: Record<string, string> = {
  gold: 'bg-gold-500/10 text-gold-400 border-gold-500/20',
  ember: 'bg-ember-500/10 text-ember-400 border-ember-500/20',
  emerald: 'bg-emerald2-500/10 text-emerald2-400 border-emerald2-500/20',
  neutral: 'bg-white/[0.04] text-slate-300 border-white/10',
}
</script>

<template>
  <div class="panel animate-fade-up px-5 py-4">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="field-label">{{ label }}</p>
        <p class="mt-1.5 truncate font-display text-2xl tracking-wide" :class="toneClasses[tone]">
          {{ value }}
        </p>
        <p v-if="sublabel" class="mt-0.5 truncate text-xs text-slate-500">{{ sublabel }}</p>
      </div>
      <span v-if="icon" class="icon-badge" :class="iconToneClasses[tone]">
        <component :is="icon" :size="16" />
      </span>
    </div>
  </div>
</template>
