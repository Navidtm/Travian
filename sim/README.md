# Travian Battle Simulator

A battle simulator for Travian, with combat math verified against a real
Travian game server engine, per-unit Blacksmith/Armory upgrade levels
(1–20), and a redesigned dark, "ancient empire" themed interface.

## Stack

- **Vue 3.5** (Composition API, `<script setup>`)
- **TypeScript 5.9**
- **Tailwind CSS 4.3** — CSS-first configuration (no `tailwind.config.js`),
  via the official `@tailwindcss/vite` plugin
- **Vite 8**
- **@lucide/vue** for icons

## Getting started

```bash
npm install
npm run dev
```

To type-check and build for production:

```bash
npm run build
```

Requires Node.js 20.19+ or 22.12+ (Vite 8's minimum).

## Project structure

```
src/
  types/           Domain types (units, tribes, battle config/result)
  data/units.ts     Full unit roster for 7 tribes, values sourced from a real engine
  engine/           Pure, framework-agnostic battle math (battleEngine.ts)
  composables/      Reactive wiring between the engine and the UI
  components/       Presentational Vue components
  App.vue           Page layout
```

## What's new in this pass

**Army Planner.** A second mode alongside the battle simulator: enter an
enemy garrison (e.g. from a spy report — reuses the same defender inputs as
the simulator), pick your tribe and a maximum acceptable casualty
percentage, and it finds the cheapest single-unit-type army from your
tribe's roster that beats that garrison within your casualty target.
Ranked by real training resource cost (sourced from the same engine as the
combat formulas), with population cost and training time shown alongside.
Deliberately scoped to pure single-unit-type armies rather than optimized
mixed compositions — see the comment above `findWinningArmies` in
`battleEngine.ts` for why that's the right tradeoff here.

**Unit upgrade levels (1–20).** Every unit can now be upgraded via
Blacksmith (attack, on the attacker's army) and Armory (defense, on the
defender's garrison), using the exact growth curve from the source engine:

```
boosted = base + (base + 300 × populationCost / 7) × (1.007^level − 1)
```

Level 0 is unresearched/base stats; level 20 is the in-game maximum. Each
unit row in the army configurator has a compact stepper for its level —
only the stat that matters for that side of the battle is exposed (attack
level for the attacker, defense level for the defender), since the other
wouldn't affect this particular battle's outcome.

**Visual and UX redesign.**
- Migrated to Tailwind CSS v4's CSS-first `@theme` configuration and the
  official Vite plugin, dropping the old `tailwind.config.js`/PostCSS setup.
- Added `@lucide/vue` icons throughout (roles, hero, wall, attack type,
  outcome banner) instead of plain text labels.
- Army panels now have a mobile tab switcher (Attacker/Defender) instead of
  two long stacked panels, since each side can have up to 10 units with
  count + level controls.
- Subtle fade-up entrance animations on the results panel and stat cards,
  a themed scrollbar, and a soft noise/vignette background for depth.
- Reworked unit rows with role icons and inline survival bars in the
  results tables.

**Dependencies updated to current releases** (Vue 3.5.40, Tailwind 4.3.2,
Vite 8.1.5, TypeScript 5.9.2, vue-tsc 3.1.0, @vitejs/plugin-vue 6.0.8) —
versions current as of this update; re-check `npm outdated` periodically.

## Combat model

See the derivation comment directly above `simulateBattle` in
`src/engine/battleEngine.ts` for the exact formulas (attack/defense split,
wall + residence bonuses, morale bonus, the battle-size "M-factor", and the
distinct Normal Attack vs. Raid casualty formulas).

### Known simplifications (still deferred, intentionally)

- Losses are applied as a uniform percentage across all unit types on the
  losing side, rather than a fully independent per-unit-type calculation.
- Artifacts, festival/brewery bonuses, and hero equipment bonuses are not
  modeled — the source engine itself zeroes these out in simulator context.
- Catapult/ram building-damage simulation is not implemented yet (the
  formula was found in the source; troop casualties were the priority).
- No multi-wave, reinforcement, or travel-time modeling — this is a single
  instantaneous battle resolution.
- Blacksmith/Armory levels aren't gated by building level or Academy
  research prerequisites — any level 0-20 can be picked freely, since this
  is a simulator rather than a persistent village.
- The Army Planner only searches pure single-unit-type armies; it doesn't
  attempt to optimize a mixed composition (e.g. "80% infantry + 20% rams").

## Extending this project

- **New tribe / unit**: add entries to `src/data/units.ts`.
- **New mechanic**: add fields to `BattleConfig`/`BattleResult` in
  `src/types/battle.ts`, then implement the math in `battleEngine.ts`.
- **Building damage (rams/catapults)**: the real formula is
  `4 * sigma(ratio) * floor(count/durability) * upgrades / moraleBonus`
  where `sigma(x) = (x > 1 ? 2 - x^-1.5 : x^1.5) / 2` — a natural next
  addition using the `attackPower`/`effectiveDefensePower` already computed.
