<script setup lang="ts">
import { Swords, Coins } from '@lucide/vue'
import type { AttackType } from '@/types/battle'

defineProps<{ modelValue: AttackType }>()
const emit = defineEmits<{ 'update:modelValue': [value: AttackType] }>()
</script>

<template>
  <div class="flex gap-2 rounded-xl border border-white/[0.06] bg-ink-900/50 p-1.5">
    <button
      type="button"
      class="tab-btn flex items-center justify-center gap-1.5"
      :class="modelValue === 'normal' ? 'tab-btn-active' : 'tab-btn-inactive'"
      @click="emit('update:modelValue', 'normal')"
    >
      <Swords :size="14" />
      Normal Attack
    </button>
    <button
      type="button"
      class="tab-btn flex items-center justify-center gap-1.5"
      :class="modelValue === 'raid' ? 'tab-btn-active' : 'tab-btn-inactive'"
      @click="emit('update:modelValue', 'raid')"
    >
      <Coins :size="14" />
      Raid
    </button>
  </div>
</template>
