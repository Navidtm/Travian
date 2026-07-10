<script setup lang="ts">
import { formatDuration } from '~/composables/useVillageData';

defineProps<{
	current?: TrainingQueueItem;
	upcoming: TrainingQueueItem[];
}>();
</script>

<template>
	<aside class="rounded-card border-border bg-surface flex flex-col gap-4 border p-4 sm:p-5">
		<div class="flex items-center justify-between">
			<h2 class="text-text text-sm font-semibold">Training Queue</h2>
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

		<div class="border-border-soft bg-surface-2 rounded-lg border p-3.5">
			<p class="text-text-faint mb-1.5 text-[11px] font-medium tracking-wide uppercase"
				>Currently training</p
			>
			<template v-if="current">
				<p class="text-text text-sm font-medium"
					>{{ current.quantity }}&times; {{ current.troopName }}</p
				>
				<div class="mt-2.5">
					<ProgressBar
						:progress="current.progress"
						color="var(--color-run)"
					/>
				</div>
				<div class="mt-1.5 flex items-center justify-between">
					<span class="text-text-muted text-[11px]"
						>{{ Math.round(current.progress * 100) }}% complete</span
					>
					<span class="text-run font-mono text-[11px]"
						>ETA {{ formatDuration(current.etaSeconds) }}</span
					>
				</div>
			</template>
			<p
				v-else
				class="text-text-faint text-xs"
				>No troops currently training.</p
			>
		</div>

		<div class="flex-1">
			<p class="text-text-faint mb-2 text-[11px] font-medium tracking-wide uppercase">
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
						<span class="bg-queued mt-1 h-2 w-2 shrink-0 rounded-full" />
						<span
							v-if="idx < upcoming.length - 1"
							class="bg-border mt-1 w-px flex-1"
						/>
					</div>
					<div class="min-w-0 pb-1">
						<p class="text-text truncate text-xs font-medium"
							>{{ item.quantity }}&times; {{ item.troopName }}</p
						>
						<p class="text-text-muted truncate font-mono text-[11px]"
							>Est. {{ formatDuration(item.etaSeconds) }}</p
						>
					</div>
				</li>
			</ol>
			<p
				v-else
				class="text-text-faint text-xs"
				>Nothing else queued.</p
			>
		</div>
	</aside>
</template>
