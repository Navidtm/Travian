<script setup lang="ts">
import { computed } from 'vue';

import StatusBadge from '~/components/ui/StatusBadge.vue';
import ToggleSwitch from '~/components/ui/ToggleSwitch.vue';
import type { AttackTemplate, FarmingJob, TargetGroup } from '~/types';

const props = defineProps<{
	jobs: FarmingJob[];
	groups: TargetGroup[];
	templates: AttackTemplate[];
}>();

defineEmits<{
	(e: 'toggle-job', id: string): void;
	(e: 'create-job'): void;
}>();

const groupName = computed(
	() => (id: string) => props.groups.find(g => g.id === id)?.name ?? '\u2014',
);
const templateName = computed(
	() => (id: string) => props.templates.find(t => t.id === id)?.name ?? '\u2014',
);
</script>

<template>
	<section class="rounded-(--radius-card) border border-border bg-surface p-4 sm:p-5">
		<div class="mb-4 flex items-center justify-between gap-3">
			<div>
				<h2 class="text-sm font-semibold text-text">Farming Scheduler</h2>
				<p class="text-[12px] text-text-muted">Automated farming runs on a fixed interval</p>
			</div>
			<button
				type="button"
				class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-surface-3"
				@click="$emit('create-job')"
			>
				<svg
					viewBox="0 0 24 24"
					class="h-3.5 w-3.5"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M12 5v14M5 12h14" />
				</svg>
				New Job
			</button>
		</div>

		<ul class="space-y-2">
			<li
				v-for="job in jobs"
				:key="job.id"
				class="flex flex-col gap-2.5 rounded-lg border border-border-soft bg-surface-2 p-3.5 sm:flex-row sm:items-center sm:justify-between"
			>
				<div class="min-w-0">
					<div class="flex items-center gap-2">
						<p class="truncate text-sm font-medium text-text">{{ job.name }}</p>
						<StatusBadge :status="job.status" />
					</div>
					<p class="mt-0.5 truncate text-[11px] text-text-muted">
						{{ groupName(job.targetGroupId) }} &middot; {{ templateName(job.templateId) }} &middot;
						every {{ job.intervalMinutes }}m
					</p>
				</div>

				<div class="flex items-center gap-4 sm:gap-6">
					<div class="text-right font-mono text-[11px] text-text-muted">
						<p>Last: {{ job.lastRun ?? '\u2014' }}</p>
						<p>Next: {{ job.nextRun ?? '\u2014' }}</p>
					</div>
					<ToggleSwitch
						:model-value="job.enabled"
						@update:model-value="$emit('toggle-job', job.id)"
					/>
				</div>
			</li>
		</ul>
	</section>
</template>
