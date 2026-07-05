<script setup lang="ts">
import { computed } from 'vue';

import { formatDuration } from '~/composables/useVillageData';

const props = defineProps<{
	currentTask?: AutomationTask;
	nextTask?: AutomationTask;
	queuedTasks: AutomationTask[];
	runState: AutomationRunState;
}>();

defineEmits<{
	(e: 'toggle-pause'): void;
	(e: 'stop'): void;
}>();

const resourceColor: Record<ResourceType, string> = {
	wood: 'var(--color-wood)',
	clay: 'var(--color-clay)',
	iron: 'var(--color-iron)',
	crop: 'var(--color-crop)',
};

const stateMeta = computed(() => {
	if (props.runState === 'running') {
		return { label: 'Running', dot: 'bg-run', ring: 'ring-[var(--color-run-soft)]' };
	}
	if (props.runState === 'paused') {
		return {
			label: 'Paused',
			dot: 'bg-paused',
			ring: 'ring-[var(--color-paused-soft)]',
		};
	}
	return {
		label: 'Stopped',
		dot: 'bg-error',
		ring: 'ring-[var(--color-error-soft)]',
	};
});

const dotColor = (task: AutomationTask) =>
	task.resourceType ? resourceColor[task.resourceType] : 'var(--color-queued)';
</script>

<template>
	<aside
		class="flex flex-col gap-4 rounded-(--radius-card) border border-border bg-surface p-4 sm:p-5"
	>
		<div class="flex items-center justify-between">
			<h2 class="text-sm font-semibold text-text">Automation</h2>
			<span
				class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1"
				:class="stateMeta.ring"
			>
				<span
					class="h-1.5 w-1.5 rounded-full"
					:class="stateMeta.dot"
				/>
				{{ stateMeta.label }}
			</span>
		</div>

		<!-- Current task -->
		<div class="rounded-lg border border-border-soft bg-surface-2 p-3.5">
			<p class="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-text-faint"
				>Current task</p
			>
			<template v-if="currentTask">
				<p class="text-sm font-medium text-text">{{ currentTask.label }}</p>
				<p class="mb-2.5 text-xs text-(--color-text-muted)">{{ currentTask.detail }}</p>
				<ProgressBar
					:progress="currentTask.progress ?? 0"
					color="var(--color-run)"
				/>
				<div class="mt-1.5 flex items-center justify-between">
					<span class="text-[11px] text-(--color-text-muted)"
						>{{ Math.round((currentTask.progress ?? 0) * 100) }}% complete</span
					>
					<span class="font-mono text-[11px] text-run"
						>ETA {{ formatDuration(currentTask.etaSeconds) }}</span
					>
				</div>
			</template>
			<p
				v-else
				class="text-xs text-text-faint"
				>No task currently running.</p
			>
		</div>

		<!-- Next task -->
		<div class="rounded-lg border border-border-soft bg-surface-2 p-3.5">
			<p class="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-text-faint">Next up</p>
			<template v-if="nextTask">
				<p class="text-sm font-medium text-text">{{ nextTask.label }}</p>
				<p class="text-xs text-(--color-text-muted)">{{ nextTask.detail }}</p>
			</template>
			<p
				v-else
				class="text-xs text-text-faint"
				>Queue is empty.</p
			>
		</div>

		<!-- Queue timeline -->
		<div class="flex-1">
			<p class="mb-2 text-[11px] font-medium uppercase tracking-wide text-text-faint">
				Queue &middot; {{ queuedTasks.length }} waiting
			</p>
			<ol
				v-if="queuedTasks.length"
				class="relative max-h-64 space-y-3.5 overflow-y-auto pr-1"
			>
				<li
					v-for="(task, idx) in queuedTasks"
					:key="task.id"
					class="relative flex gap-3 pl-1"
				>
					<div class="flex flex-col items-center">
						<span
							class="mt-1 h-2 w-2 shrink-0 rounded-full"
							:style="{ backgroundColor: dotColor(task) }"
						/>
						<span
							v-if="idx < queuedTasks.length - 1"
							class="mt-1 w-px flex-1 bg-border"
						/>
					</div>
					<div class="min-w-0 pb-1">
						<p class="truncate text-xs font-medium text-text">{{ task.label }}</p>
						<p class="truncate text-[11px] text-(--color-text-muted)">{{ task.detail }}</p>
					</div>
				</li>
			</ol>
			<p
				v-else
				class="text-xs text-text-faint"
				>Nothing else queued.</p
			>
		</div>

		<!-- Controls -->
		<div class="flex gap-2 border-t border-border-soft pt-4">
			<button
				type="button"
				class="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs font-medium text-text transition-colors hover:bg-surface-3"
				@click="$emit('toggle-pause')"
			>
				<svg
					v-if="runState === 'running'"
					viewBox="0 0 24 24"
					class="h-3.5 w-3.5"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<rect
						x="6"
						y="4"
						width="4"
						height="16"
						rx="1"
					/>
					<rect
						x="14"
						y="4"
						width="4"
						height="16"
						rx="1"
					/>
				</svg>
				<svg
					v-else
					viewBox="0 0 24 24"
					class="h-3.5 w-3.5"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M6 4l14 8-14 8V4Z" />
				</svg>
				{{ runState === 'running' ? 'Pause' : 'Resume' }}
			</button>
			<button
				type="button"
				class="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-error-soft bg-error-soft px-3 py-2 text-xs font-medium text-error transition-colors hover:bg-error/20"
				@click="$emit('stop')"
			>
				<svg
					viewBox="0 0 24 24"
					class="h-3.5 w-3.5"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<rect
						x="5"
						y="5"
						width="14"
						height="14"
						rx="1.5"
					/>
				</svg>
				Stop
			</button>
		</div>
	</aside>
</template>
