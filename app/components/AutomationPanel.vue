<script setup lang="ts">
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
		return { label: 'Running', dot: 'bg-run', ring: 'ring-run-soft' };
	}
	if (props.runState === 'paused') {
		return {
			label: 'Paused',
			dot: 'bg-paused',
			ring: 'ring-paused-soft',
		};
	}
	return {
		label: 'Stopped',
		dot: 'bg-error',
		ring: 'ring-error-soft',
	};
});

const dotColor = (task: AutomationTask) =>
	task.resourceType ? resourceColor[task.resourceType] : 'var(--color-queued)';
</script>

<template>
	<aside class="rounded-card border-border bg-surface flex flex-col gap-4 border p-4 sm:p-5">
		<div class="flex items-center justify-between">
			<h2 class="text-text text-sm font-semibold">Automation</h2>
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
		<div class="border-border-soft bg-surface-2 rounded-lg border p-3.5">
			<p class="text-text-faint mb-1.5 text-[11px] font-medium tracking-wide uppercase"
				>Current task</p
			>
			<template v-if="currentTask">
				<p class="text-text text-sm font-medium">{{ currentTask.label }}</p>
				<p class="text-text-muted mb-2.5 text-xs">{{ currentTask.detail }}</p>
				<ProgressBar
					:progress="currentTask.progress ?? 0"
					color="var(--color-run)"
				/>
				<div class="mt-1.5 flex items-center justify-between">
					<span class="text-text-muted text-[11px]"
						>{{ Math.round((currentTask.progress ?? 0) * 100) }}% complete</span
					>
					<span class="text-run font-mono text-[11px]"
						>ETA {{ formatDuration(currentTask.etaSeconds) }}</span
					>
				</div>
			</template>
			<p
				v-else
				class="text-text-faint text-xs"
				>No task currently running.</p
			>
		</div>

		<!-- Next task -->
		<div class="border-border-soft bg-surface-2 rounded-lg border p-3.5">
			<p class="text-text-faint mb-1.5 text-[11px] font-medium tracking-wide uppercase">Next up</p>
			<template v-if="nextTask">
				<p class="text-text text-sm font-medium">{{ nextTask.label }}</p>
				<p class="text-text-muted text-xs">{{ nextTask.detail }}</p>
			</template>
			<p
				v-else
				class="text-text-faint text-xs"
				>Queue is empty.</p
			>
		</div>

		<!-- Queue timeline -->
		<div class="flex-1">
			<p class="text-text-faint mb-2 text-[11px] font-medium tracking-wide uppercase">
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
							class="bg-border mt-1 w-px flex-1"
						/>
					</div>
					<div class="min-w-0 pb-1">
						<p class="text-text truncate text-xs font-medium">{{ task.label }}</p>
						<p class="text-text-muted truncate text-[11px]">{{ task.detail }}</p>
					</div>
				</li>
			</ol>
			<p
				v-else
				class="text-text-faint text-xs"
				>Nothing else queued.</p
			>
		</div>

		<!-- Controls -->
		<div class="border-border-soft flex gap-2 border-t pt-4">
			<button
				type="button"
				class="border-border bg-surface-2 text-text hover:bg-surface-3 flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors"
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
				class="border-error-soft bg-error-soft text-error hover:bg-error/20 flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors"
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
