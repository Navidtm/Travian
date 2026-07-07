<script setup lang="ts">
import { formatDuration } from '~/composables/useVillageData';

defineProps<{ entries: BlacksmithState[] }>();

defineEmits<{ (e: 'upgrade', troopName: string): void }>();
</script>

<template>
	<section class="rounded-card border border-border bg-surface p-4 sm:p-5">
		<h2 class="mb-4 text-sm font-semibold text-text">Blacksmith</h2>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
			<article
				v-for="entry in entries"
				:key="entry.troopName"
				class="flex flex-col gap-2.5 rounded-lg border border-border-soft bg-surface-2 p-3.5"
			>
				<div class="flex items-center justify-between gap-2">
					<p class="truncate text-sm font-medium text-text">{{ entry.troopName }}</p>
					<span
						v-if="entry.level >= entry.maxLevel"
						class="shrink-0 rounded-full bg-paused-soft px-2 py-0.5 text-[10px] font-semibold tracking-wide text-paused"
					>
						MAX LEVEL
					</span>
				</div>

				<p class="font-mono text-xs text-text-muted">
					Level {{ entry.level }}
					<span class="text-text-faint">/ {{ entry.maxLevel }}</span>
				</p>

				<template v-if="entry.level < entry.maxLevel">
					<ProgressBar
						:progress="entry.upgradeProgress"
						color="var(--color-run)"
					/>
					<div class="flex items-center justify-between">
						<span class="font-mono text-[11px] text-run"
							>ETA {{ formatDuration(entry.estimatedUpgradeSeconds) }}</span
						>
						<button
							type="button"
							class="rounded-md border border-border bg-surface-3 px-2.5 py-1 text-[11px] font-medium text-text transition-colors hover:bg-surface"
							@click="$emit('upgrade', entry.troopName)"
						>
							Upgrade
						</button>
					</div>
				</template>
			</article>
		</div>
	</section>
</template>
