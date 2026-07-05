<script setup lang="ts">
import type { TargetGroup } from '~/types';

defineProps<{
	groups: TargetGroup[];
	villageCount: (group: TargetGroup) => number;
}>();

defineEmits<{ (e: 'create-group'): void }>();
</script>

<template>
	<section class="rounded-(--radius-card) border border-border bg-surface p-4 sm:p-5">
		<div class="mb-4 flex items-center justify-between gap-3">
			<div>
				<h2 class="text-sm font-semibold text-text">Target Groups</h2>
				<p class="text-[12px] text-text-muted">Reusable sets of villages for farming and attacks</p>
			</div>
			<button
				type="button"
				class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-surface-3"
				@click="$emit('create-group')"
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
				New Group
			</button>
		</div>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
			<article
				v-for="group in groups"
				:key="group.id"
				class="flex flex-col gap-2 rounded-lg border border-border-soft bg-surface-2 p-3.5"
			>
				<p class="text-sm font-medium text-text">{{ group.name }}</p>
				<p
					v-if="group.description"
					class="text-[11px] text-text-muted"
					>{{ group.description }}</p
				>
				<p class="font-mono text-[11px] text-text-faint">{{ villageCount(group) }} villages</p>
			</article>
		</div>
	</section>
</template>
