<script setup lang="ts">
import { ref, computed } from 'vue'
import { Swords, ShieldHalf, Sparkles, RotateCcw, Target, Compass } from '@lucide/vue'
import { useBattleSimulator } from '@/composables/useBattleSimulator'
import { findWinningArmies } from '@/engine/battleEngine'
import type { ArmyPlannerCandidate, ArmyPlannerRequest } from '@/types/battle'
import TribeSelector from '@/components/TribeSelector.vue'
import ArmyConfigurator from '@/components/ArmyConfigurator.vue'
import HeroConfig from '@/components/HeroConfig.vue'
import DefenderPanel from '@/components/DefenderPanel.vue'
import AttackTypeToggle from '@/components/AttackTypeToggle.vue'
import BattleResults from '@/components/BattleResults.vue'
import ArmyPlannerResults from '@/components/ArmyPlannerResults.vue'

const { attacker, defender, attackType, result, hasSimulated, runSimulation, reset } =
  useBattleSimulator()

const mode = ref<'simulate' | 'plan'>('simulate')
const mobilePanel = ref<'attacker' | 'defender'>('attacker')

// --- Army Planner state ----------------------------------------------------
const maxCasualtyPercent = ref(10)
const assumedAttackLevel = ref(0)
const plannerCandidates = ref<ArmyPlannerCandidate[] | null>(null)
const hasPlanned = computed(() => plannerCandidates.value !== null)

function runPlanner() {
  const request: ArmyPlannerRequest = {
    attackerTribe: attacker.tribe,
    attackType: attackType.value,
    maxCasualtyPercent: maxCasualtyPercent.value,
    attackerPopulation: attacker.population,
    attackerHero: { ...attacker.hero },
    assumedAttackLevel: assumedAttackLevel.value,
    defender: {
      tribe: defender.tribe,
      units: { ...defender.units },
      unitDefenseLevels: { ...defender.unitDefenseLevels },
      hero: { ...defender.hero },
      wallLevel: defender.wallLevel,
      residenceLevel: defender.residenceLevel,
      population: defender.population,
      storedResources: defender.storedResources,
    },
  }
  plannerCandidates.value = findWinningArmies(request)
}
</script>

<template>
  <div class="relative min-h-screen bg-ink-950 bg-radial-fade">
    <div class="pointer-events-none fixed inset-0 bg-noise opacity-[0.03]" />

    <div class="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <!-- Header -->
      <header class="mb-8 flex flex-col items-center text-center">
        <span class="icon-badge mb-4 h-14 w-14 rounded-2xl border-gold-500/25 bg-gold-500/10 text-gold-400">
          <Swords :size="26" />
        </span>
        <span class="mb-3 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold-400">
          Engine-verified formulas · Upgrade levels 1–20
        </span>
        <h1 class="font-display text-4xl font-semibold tracking-wide text-slate-50 sm:text-5xl">
          Travian <span class="text-gold-400">Battle Simulator</span>
        </h1>
        <p class="mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
          Configure two armies — down to Blacksmith and Armory upgrade levels — and resolve the
          battle with Travian-accurate combat mathematics.
        </p>
      </header>

      <!-- Mode switch -->
      <div class="mx-auto mb-8 flex max-w-md gap-2 rounded-xl border border-white/[0.06] bg-ink-900/50 p-1.5">
        <button
          type="button"
          class="tab-btn flex items-center justify-center gap-1.5"
          :class="mode === 'simulate' ? 'tab-btn-active' : 'tab-btn-inactive'"
          @click="mode = 'simulate'"
        >
          <Swords :size="14" /> Battle Simulator
        </button>
        <button
          type="button"
          class="tab-btn flex items-center justify-center gap-1.5"
          :class="mode === 'plan' ? 'tab-btn-active' : 'tab-btn-inactive'"
          @click="mode = 'plan'"
        >
          <Target :size="14" /> Army Planner
        </button>
      </div>

      <!-- ================================================================ -->
      <!-- SIMULATOR MODE                                                    -->
      <!-- ================================================================ -->
      <template v-if="mode === 'simulate'">
        <!-- Mobile panel switcher -->
        <div class="mb-4 flex gap-2 rounded-xl border border-white/[0.06] bg-ink-900/50 p-1.5 lg:hidden">
          <button
            type="button"
            class="tab-btn flex items-center justify-center gap-1.5"
            :class="mobilePanel === 'attacker' ? 'tab-btn-active' : 'tab-btn-inactive'"
            @click="mobilePanel = 'attacker'"
          >
            <Swords :size="14" /> Attacker
          </button>
          <button
            type="button"
            class="tab-btn flex items-center justify-center gap-1.5"
            :class="mobilePanel === 'defender' ? 'tab-btn-active' : 'tab-btn-inactive'"
            @click="mobilePanel = 'defender'"
          >
            <ShieldHalf :size="14" /> Defender
          </button>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Attacker -->
          <section class="panel" :class="mobilePanel === 'attacker' ? 'block' : 'hidden lg:block'">
            <div class="panel-header">
              <div class="flex items-center gap-2.5">
                <span class="icon-badge border-ember-500/20 bg-ember-500/10 text-ember-400">
                  <Swords :size="16" />
                </span>
                <h2 class="font-display text-lg tracking-wide text-slate-100">Attacker</h2>
              </div>
            </div>
            <div class="space-y-5 p-5">
              <div class="grid grid-cols-2 gap-3">
                <TribeSelector v-model="attacker.tribe" accent="ember" />
                <div>
                  <label class="field-label mb-1.5 block">Village population</label>
                  <input type="number" min="0" class="input-base h-9" v-model.number="attacker.population" />
                </div>
              </div>
              <HeroConfig v-model="attacker.hero" mode="attack" />
              <div>
                <p class="field-label mb-3">Army composition &amp; upgrade levels</p>
                <ArmyConfigurator
                  :tribe="attacker.tribe"
                  :units="attacker.units"
                  :levels="attacker.unitAttackLevels"
                  level-mode="attack"
                  accent="ember"
                  @update:units="(v) => (attacker.units = v)"
                  @update:levels="(v) => (attacker.unitAttackLevels = v)"
                />
              </div>
            </div>
          </section>

          <!-- Defender -->
          <DefenderPanel
            :model-value="defender"
            class="min-w-0"
            :class="mobilePanel === 'defender' ? 'block' : 'hidden lg:block'"
          />
        </div>

        <!-- Battle controls -->
        <section class="panel mt-6 flex flex-col items-center gap-4 px-6 py-6 sm:flex-row sm:justify-between">
          <div class="w-full sm:w-72">
            <p class="field-label mb-1.5">Attack type</p>
            <AttackTypeToggle v-model="attackType" />
          </div>
          <div class="flex w-full gap-3 sm:w-auto">
            <button class="btn-secondary" type="button" @click="reset">
              <RotateCcw :size="14" />
              Reset
            </button>
            <button class="btn-primary w-full sm:w-auto" type="button" @click="runSimulation">
              <Sparkles :size="16" />
              Simulate Battle
            </button>
          </div>
        </section>

        <!-- Results -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
        >
          <section v-if="hasSimulated && result" class="mt-8">
            <BattleResults :result="result" />
          </section>
        </Transition>
      </template>

      <!-- ================================================================ -->
      <!-- ARMY PLANNER MODE                                                 -->
      <!-- ================================================================ -->
      <template v-else>
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Enemy garrison (spy report) -->
          <DefenderPanel
            :model-value="defender"
            title="Enemy Village"
            subtitle="Enter what your spy report found"
          />

          <!-- Attack plan preferences -->
          <section class="panel">
            <div class="panel-header">
              <div class="flex items-center gap-2.5">
                <span class="icon-badge border-ember-500/20 bg-ember-500/10 text-ember-400">
                  <Compass :size="16" />
                </span>
                <div>
                  <h2 class="font-display text-lg tracking-wide text-slate-100">Attack Plan</h2>
                  <p class="text-xs text-slate-500">Your tribe and goals for this attack</p>
                </div>
              </div>
            </div>
            <div class="space-y-5 p-5">
              <div class="grid grid-cols-2 gap-3">
                <TribeSelector v-model="attacker.tribe" accent="ember" />
                <div>
                  <label class="field-label mb-1.5 block">Village population</label>
                  <input type="number" min="0" class="input-base h-9" v-model.number="attacker.population" />
                </div>
              </div>

              <HeroConfig v-model="attacker.hero" mode="attack" />

              <div>
                <p class="field-label mb-1.5">Attack type</p>
                <AttackTypeToggle v-model="attackType" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="field-label mb-1.5 block">Max acceptable casualties</label>
                  <div class="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      class="input-base h-9 pr-7"
                      v-model.number="maxCasualtyPercent"
                    />
                    <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">%</span>
                  </div>
                </div>
                <div>
                  <label class="field-label mb-1.5 block">Assume Blacksmith level</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    class="input-base h-9"
                    v-model.number="assumedAttackLevel"
                  />
                </div>
              </div>

              <button class="btn-primary w-full" type="button" @click="runPlanner">
                <Target :size="16" />
                Find Best Army
              </button>
              <p class="text-xs leading-relaxed text-slate-500">
                Finds the cheapest single-unit-type army from your tribe that beats the enemy
                garrison above while keeping your own losses at or under the target percentage.
              </p>
            </div>
          </section>
        </div>

        <!-- Planner results -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
        >
          <section v-if="hasPlanned && plannerCandidates" class="mt-8">
            <ArmyPlannerResults :candidates="plannerCandidates" :max-casualty-percent="maxCasualtyPercent" />
          </section>
        </Transition>
      </template>

      <footer class="mt-14 text-center text-xs text-slate-600">
        Combat formulas are documented in <code class="text-slate-500">src/engine/battleEngine.ts</code>
        — verified against a real Travian server engine, with per-unit Blacksmith/Armory upgrade
        levels (1–20) applied via the same growth curve.
      </footer>
    </div>
  </div>
</template>
