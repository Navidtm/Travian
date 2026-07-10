<script setup lang="ts">
defineProps<{
	groups: TargetGroup[];
	villageCount: (group: TargetGroup) => number;
}>();

defineEmits<{ (e: 'create-group'): void }>();
</script>

<template>
	<section class="rounded-card border-border bg-surface border p-4 sm:p-5">
		<div class="mb-4 flex items-center justify-between gap-3">
			<div>
				<h2 class="text-text text-sm font-semibold">Target Groups</h2>
				<p class="text-text-muted text-[12px]">Reusable sets of villages for farming and attacks</p>
			</div>
			<button
				type="button"
				class="border-border bg-surface-2 text-text hover:bg-surface-3 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
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
				class="border-border-soft bg-surface-2 flex flex-col gap-2 rounded-lg border p-3.5"
			>
				<p class="text-text text-sm font-medium">{{ group.name }}</p>
				<p
					v-if="group.description"
					class="text-text-muted text-[11px]"
					>{{ group.description }}</p
				>
				<p class="text-text-faint font-mono text-[11px]">{{ villageCount(group) }} villages</p>
			</article>
		</div>
	</section>
</template>
