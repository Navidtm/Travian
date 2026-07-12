<script setup lang="ts">
const { data: hero, pending } = useFetch('/api/hero/info');

const { execute: revive } = useFetch('/api/hero/revive', {
	method: 'POST',
	immediate: false,
});
</script>

<template>
	<section class="rounded-card border-border bg-surface border p-4 sm:p-5">
		<SkeletonCard v-if="pending" />
		<div
			v-else-if="hero"
			class="flex flex-col gap-4 sm:flex-row sm:items-center"
		>
			<!-- Portrait -->
			<div class="relative mx-auto sm:mx-0">
				<div
					class="absolute inset-0 -z-10 rounded-full blur-xl"
					:style="{
						backgroundColor: hero.isAlive ? 'var(--color-run-soft)' : 'var(--color-error-soft)',
					}"
				/>
				<div
					class="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2"
					:class="hero.isAlive ? 'border-run' : 'border-error'"
					:style="{ backgroundColor: 'var(--color-surface-2)' }"
				>
					<div v-if="hero.heroImage">
						<img :src="hero.heroImage" />
					</div>
					<svg
						v-else
						viewBox="0 0 24 24"
						class="h-11 w-11"
						:class="hero.isAlive ? 'text-run' : 'text-error'"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
					>
						<circle
							cx="12"
							cy="8"
							r="3.6"
						/>
						<path d="M5 20a7 7 0 0 1 14 0" />
					</svg>
				</div>
				<span
					class="bg-surface-3 text-text absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold"
				>
					Lv.{{ hero.level }}
				</span>
			</div>

			<div class="min-w-0 flex-1 text-center sm:text-left">
				<div class="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
					<p class="text-text text-base font-semibold">{{ hero.name }}</p>
					<StatusPill
						v-if="hero.isAlive"
						label="Healthy"
						tone="green"
					/>
					<StatusPill
						v-else
						label="Danger"
						tone="red"
					/>
				</div>

				<div class="mt-3">
					<div class="text-text-muted mb-1 flex items-center justify-between text-[11px]">
						<span>Experience</span>
						<span class="font-mono"
							>{{ formatNumber(hero.experience) }} /
							{{ formatNumber(hero.experienceForNextLevel) }}</span
						>
					</div>
					<ProgressBar
						:progress="hero.experienceProgress"
						color="var(--color-run)"
					/>
					<p class="text-text-faint mt-1 text-[11px]"
						>{{ formatNumber(hero.experienceRemaining) }} XP to next level</p
					>
				</div>
			</div>
		</div>

		<div class="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
			<div class="border-border-soft bg-surface-2 rounded-lg border p-3 text-center">
				<p class="text-text font-mono text-lg font-semibold">{{ hero?.power ?? '??' }}</p>
				<p class="text-text-muted text-[10px]">Power</p>
			</div>
			<div class="border-border-soft bg-surface-2 rounded-lg border p-3 text-center">
				<p class="text-text font-mono text-lg font-semibold">{{ hero?.speed ?? '??' }}</p>
				<p class="text-text-muted text-[10px]">Speed</p>
			</div>
			<div class="border-border-soft bg-surface-2 rounded-lg border p-3 text-center">
				<p
					v-if="hero"
					class="text-done font-mono text-lg font-semibold"
					>+{{ hero.resourceBonusPercent }}%</p
				>
				<p class="text-text-muted text-[10px]">Resource Bonus</p>
			</div>
		</div>

		<button
			v-if="hero && !hero.isAlive"
			type="button"
			class="bg-error mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
			@click="revive()"
		>
			Revive Hero
		</button>
	</section>
</template>
