<script setup lang="ts">
import { formatDuration } from '~/composables/useVillageData';

defineProps<{ entries: BlacksmithState[] }>();

defineEmits<{ (e: 'upgrade', troopName: string): void }>();
</script>

<template>
	<section class="rounded-card border-border bg-surface border p-4 sm:p-5">
		<h2 class="text-text mb-4 text-sm font-semibold">Blacksmith</h2>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
			<article
				v-for="entry in entries"
				:key="entry.troopName"
				class="border-border-soft bg-surface-2 flex flex-col gap-2.5 rounded-lg border p-3.5"
			>
				<div class="flex items-center justify-between gap-2">
					<p class="text-text truncate text-sm font-medium">{{ entry.troopName }}</p>
					<span
						v-if="entry.level >= entry.maxLevel"
						class="bg-paused-soft text-paused shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide"
					>
						MAX LEVEL
					</span>
				</div>

				<p class="text-text-muted font-mono text-xs">
					Level {{ entry.level }}
					<span class="text-text-faint">/ {{ entry.maxLevel }}</span>
				</p>

				<template v-if="entry.level < entry.maxLevel">
					<ProgressBar
						:progress="entry.upgradeProgress"
						color="var(--color-run)"
					/>
					<div class="flex items-center justify-between">
						<span class="text-run font-mono text-[11px]"
							>ETA {{ formatDuration(entry.estimatedUpgradeSeconds) }}</span
						>
						<button
							type="button"
							class="border-border bg-surface-3 text-text hover:bg-surface rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors"
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
