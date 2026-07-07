<script setup lang="ts">
import { formatNumber } from '~/composables/useVillageData';

const props = defineProps<{
	troops: TroopType[];
	autoQueue: boolean;
	totalPending: number;
}>();

const emit = defineEmits<{
	(e: 'update-target', id: string, value: number): void;
	(e: 'train-missing'): void;
	(e: 'toggle-auto-queue'): void;
}>();

const categoryLabel: Record<TroopCategory, string> = {
	infantry: 'Infantry',
	cavalry: 'Cavalry',
	siege: 'Siege',
	scout: 'Scout',
};

const progress = (troop: TroopType) =>
	troop.targetCount === 0 ? 1 : Math.min(1, troop.currentCount / troop.targetCount);

const onTargetInput = (id: string, event: Event) => {
	const value = Number((event.target as HTMLInputElement).value);
	if (!Number.isNaN(value)) emit('update-target', id, value);
};

const missing = computed(
	() => (troop: TroopType) => Math.max(0, troop.targetCount - troop.currentCount),
);
</script>

<template>
	<section class="rounded-card border border-border bg-surface p-4 sm:p-5">
		<div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 class="text-sm font-semibold text-text">Troop Roster</h2>
				<p class="text-[12px] text-text-muted">
					{{ totalPending }} troop{{ totalPending === 1 ? '' : 's' }} below target
				</p>
			</div>
			<div class="flex items-center gap-3">
				<ToggleSwitch
					:model-value="autoQueue"
					label="Auto Queue"
					@update:model-value="$emit('toggle-auto-queue')"
				/>
				<button
					type="button"
					class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-surface-3 disabled:cursor-not-allowed disabled:opacity-40"
					:disabled="totalPending === 0"
					@click="$emit('train-missing')"
				>
					<svg
						viewBox="0 0 24 24"
						class="h-3.5 w-3.5"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M12 19V5M5 12l7-7 7 7" />
					</svg>
					Train Missing Troops
				</button>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
			<article
				v-for="troop in troops"
				:key="troop.id"
				class="flex flex-col gap-3 rounded-lg border border-border-soft bg-surface-2 p-3.5"
			>
				<div class="flex items-start justify-between gap-2">
					<div class="min-w-0">
						<p class="truncate text-sm font-medium text-text">{{ troop.name }}</p>
						<p class="text-[11px] text-text-faint">{{ categoryLabel[troop.category] }}</p>
					</div>
					<span
						v-if="missing(troop) > 0"
						class="shrink-0 rounded-full bg-paused-soft px-2 py-0.5 text-[11px] font-medium text-paused"
					>
						{{ formatNumber(missing(troop)) }} missing
					</span>
					<span
						v-else
						class="shrink-0 rounded-full bg-done-soft px-2 py-0.5 text-[11px] font-medium text-done"
					>
						On target
					</span>
				</div>

				<div class="flex items-center justify-between gap-2 font-mono text-xs">
					<span class="text-text">{{ formatNumber(troop.currentCount) }} current</span>
					<label class="flex items-center gap-1.5 text-text-muted">
						Target
						<input
							type="number"
							min="0"
							class="w-20 rounded-md border border-border bg-surface px-2 py-1 text-right text-text focus:border-run"
							:value="troop.targetCount"
							@change="onTargetInput(troop.id, $event)"
						/>
					</label>
				</div>

				<ProgressBar
					:progress="progress(troop)"
					color="var(--color-run)"
				/>
			</article>
		</div>
	</section>
</template>
