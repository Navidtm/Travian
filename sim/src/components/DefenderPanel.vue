<script setup lang="ts">
import { ShieldHalf } from '@lucide/vue'
import TribeSelector from './TribeSelector.vue'
import ArmyConfigurator from './ArmyConfigurator.vue'
import HeroConfig from './HeroConfig.vue'
import WallConfig from './WallConfig.vue'
import type { DefenderConfig } from '@/types/battle'
import type { UnitComposition } from '@/types/units'
import type { UnitLevels } from '@/types/battle'

withDefaults(defineProps<{ title?: string; subtitle?: string }>(), {
  title: 'Defender',
  subtitle: '',
})

const model = defineModel<DefenderConfig>({ required: true })

function setUnits(v: UnitComposition) {
  model.value.units = v
}
function setLevels(v: UnitLevels) {
  model.value.unitDefenseLevels = v
}
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      <div class="flex items-center gap-2.5">
        <span class="icon-badge border-emerald2-500/20 bg-emerald2-500/10 text-emerald2-400">
          <ShieldHalf :size="16" />
        </span>
        <div>
          <h2 class="font-display text-lg tracking-wide text-slate-100">{{ title }}</h2>
          <p v-if="subtitle" class="text-xs text-slate-500">{{ subtitle }}</p>
        </div>
      </div>
    </div>
    <div class="space-y-5 p-5">
      <div class="grid grid-cols-2 gap-3">
        <TribeSelector v-model="model.tribe" accent="gold" />
        <div>
          <label class="field-label mb-1.5 block">Village population</label>
          <input type="number" min="0" class="input-base h-9" v-model.number="model.population" />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <WallConfig v-model="model.wallLevel" :tribe="model.tribe" />
        <div>
          <label class="field-label mb-1.5 block">Residence lvl</label>
          <input
            type="number"
            min="0"
            max="20"
            class="input-base h-9"
            v-model.number="model.residenceLevel"
          />
        </div>
        <div>
          <label class="field-label mb-1.5 block">Stored resources</label>
          <input type="number" min="0" class="input-base h-9" v-model.number="model.storedResources" />
        </div>
      </div>
      <HeroConfig v-model="model.hero" mode="defense" />
      <div>
        <p class="field-label mb-3">Garrison composition &amp; upgrade levels</p>
        <ArmyConfigurator
          :tribe="model.tribe"
          :units="model.units"
          :levels="model.unitDefenseLevels"
          level-mode="defense"
          accent="gold"
          @update:units="setUnits"
          @update:levels="setLevels"
        />
      </div>
    </div>
  </section>
</template>
