<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
import { TRIBES } from '@/data/units'
import type { TribeId } from '@/types/units'

defineProps<{
  modelValue: TribeId
  accent?: 'gold' | 'ember'
}>()

const emit = defineEmits<{ 'update:modelValue': [value: TribeId] }>()
</script>

<template>
  <div>
    <label class="field-label mb-1.5 block">Tribe</label>
    <div class="relative">
      <select
        class="input-base h-9 cursor-pointer appearance-none pr-8"
        :value="modelValue"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value as TribeId)"
      >
        <option v-for="tribe in TRIBES" :key="tribe.id" :value="tribe.id">
          {{ tribe.name }}
        </option>
      </select>
      <ChevronDown
        :size="14"
        class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
      />
    </div>
  </div>
</template>
