<script setup lang="ts">
import { computed } from 'vue'
import { Castle } from '@lucide/vue'
import { getTribe } from '@/data/units'
import type { TribeId } from '@/types/units'

const props = defineProps<{
  modelValue: number
  tribe: TribeId
}>()

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const tribeInfo = computed(() => getTribe(props.tribe))
const bonusPercent = computed(() => ((tribeInfo.value?.wallBonusPerLevel ?? 0) * 100).toFixed(1))
</script>

<template>
  <div>
    <div class="mb-1.5 flex items-center justify-between">
      <label class="field-label flex items-center gap-1.5">
        <Castle :size="12" class="text-slate-500" />
        {{ tribeInfo?.wallName ?? 'Wall' }}
      </label>
      <span class="text-[11px] text-slate-500">+{{ bonusPercent }}%/lvl</span>
    </div>
    <input
      type="number"
      min="0"
      max="20"
      class="input-base h-9"
      :value="modelValue"
      @input="emit('update:modelValue', Math.min(20, Math.max(0, Number(($event.target as HTMLInputElement).value) || 0)))"
    />
  </div>
</template>
