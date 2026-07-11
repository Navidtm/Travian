<script setup lang="ts">
defineProps<{
	stats: {
		infantryPercent: number;
		cavalryPercent: number;
		offensiveRatio: number;
		defensiveRatio: number;
		researchCompletion: number;
		blacksmithCompletion: number;
		averageTroopLevel: number;
		totalCropConsumption: number;
	};
}>();
</script>

<template>
	<section class="rounded-card border-border bg-surface border p-4 sm:p-5">
		<h2 class="text-text mb-4 text-sm font-semibold">Army Statistics</h2>

		<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
			<div class="flex flex-col items-center gap-2">
				<RadialProgress
					:progress="stats.infantryPercent"
					color="var(--color-wood)"
					label="Infantry"
				/>
			</div>
			<div class="flex flex-col items-center gap-2">
				<RadialProgress
					:progress="stats.cavalryPercent"
					color="var(--color-iron)"
					label="Cavalry"
				/>
			</div>
			<div class="flex flex-col items-center gap-2">
				<RadialProgress
					:progress="stats.researchCompletion"
					color="var(--color-done)"
					label="Research"
				/>
			</div>
			<div class="flex flex-col items-center gap-2">
				<RadialProgress
					:progress="stats.blacksmithCompletion"
					color="var(--color-paused)"
					label="Blacksmith"
				/>
			</div>
		</div>

		<div class="mt-5 space-y-4">
			<div>
				<div class="text-text-muted mb-1 flex items-center justify-between text-[11px]">
					<span>Offensive vs Defensive</span>
					<span class="font-mono"
						>{{ Math.round(stats.offensiveRatio * 100) }}% /
						{{ Math.round(stats.defensiveRatio * 100) }}%</span
					>
				</div>
				<ProgressBar
					:progress="stats.offensiveRatio"
					color="var(--color-error)"
				/>
			</div>

			<div
				class="border-border-soft bg-surface-2 flex items-center justify-between rounded-lg border px-3.5 py-2.5"
			>
				<span class="text-text-muted text-xs">Total Crop Consumption</span>
				<span class="text-crop font-mono text-sm font-semibold"
					>{{ formatNumber(stats.totalCropConsumption) }}/h</span
				>
			</div>
		</div>
	</section>
</template>
