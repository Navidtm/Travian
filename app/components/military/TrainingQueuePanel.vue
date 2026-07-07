<script setup lang="ts">
import { formatDuration } from '~/composables/useVillageData';

defineProps<{
	current?: TrainingQueueItem;
	upcoming: TrainingQueueItem[];
}>();
</script>

<template>
	<aside class="flex flex-col gap-4 rounded-card border border-border bg-surface p-4 sm:p-5">
		<div class="flex items-center justify-between">
			<h2 class="text-sm font-semibold text-text">Training Queue</h2>
			<span
				class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1"
				:class="current ? 'ring-run-soft' : 'ring-queued-soft'"
			>
				<span
					class="h-1.5 w-1.5 rounded-full"
					:class="current ? 'bg-run' : 'bg-queued'"
				/>
				{{ current ? 'Training' : 'Idle' }}
			</span>
		</div>

		<div class="rounded-lg border border-border-soft bg-surface-2 p-3.5">
			<p class="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-text-faint"
				>Currently training</p
			>
			<template v-if="current">
				<p class="text-sm font-medium text-text"
					>{{ current.quantity }}&times; {{ current.troopName }}</p
				>
				<div class="mt-2.5">
					<ProgressBar
						:progress="current.progress"
						color="var(--color-run)"
					/>
				</div>
				<div class="mt-1.5 flex items-center justify-between">
					<span class="text-[11px] text-text-muted"
						>{{ Math.round(current.progress * 100) }}% complete</span
					>
					<span class="font-mono text-[11px] text-run"
						>ETA {{ formatDuration(current.etaSeconds) }}</span
					>
				</div>
			</template>
			<p
				v-else
				class="text-xs text-text-faint"
				>No troops currently training.</p
			>
		</div>

		<div class="flex-1">
			<p class="mb-2 text-[11px] font-medium uppercase tracking-wide text-text-faint">
				Queue &middot; {{ upcoming.length }} waiting
			</p>
			<ol
				v-if="upcoming.length"
				class="space-y-3.5 overflow-y-auto pr-1"
			>
				<li
					v-for="(item, idx) in upcoming"
					:key="item.id"
					class="relative flex gap-3 pl-1"
				>
					<div class="flex flex-col items-center">
						<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-queued" />
						<span
							v-if="idx < upcoming.length - 1"
							class="mt-1 w-px flex-1 bg-border"
						/>
					</div>
					<div class="min-w-0 pb-1">
						<p class="truncate text-xs font-medium text-text"
							>{{ item.quantity }}&times; {{ item.troopName }}</p
						>
						<p class="truncate font-mono text-[11px] text-text-muted"
							>Est. {{ formatDuration(item.etaSeconds) }}</p
						>
					</div>
				</li>
			</ol>
			<p
				v-else
				class="text-xs text-text-faint"
				>Nothing else queued.</p
			>
		</div>
	</aside>
</template>
