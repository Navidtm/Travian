<script setup lang="ts">
defineProps<{
	label: string;
	value: string;
	subtitle: string;
	colorVar: string;
	icon?: string;
	trend?: { direction: 'up' | 'down'; label: string };
}>();
</script>

<template>
	<div
		class="group border-border-soft bg-surface-2 rounded-lg border p-3.5 transition-transform hover:-translate-y-0.5"
	>
		<div class="mb-2.5 flex items-center justify-between">
			<span
				class="flex h-8 w-8 items-center justify-center rounded-lg"
				:style="{ backgroundColor: colorVar + '1a', color: colorVar }"
			>
				<slot name="icon">
					<Icon
						class="h-4 w-4"
						name="icon:circle"
					/>
				</slot>
			</span>
			<span
				v-if="trend"
				class="inline-flex items-center gap-1 text-[10px] font-medium"
				:class="trend.direction === 'up' ? 'text-done' : 'text-error'"
			>
				<Icon
					v-if="trend.direction === 'up'"
					class="h-3 w-3"
					name="icon:chevron-up"
				/>
				<Icon
					v-else
					class="h-3 w-3"
					name="icon:chevron-down-small"
				/>
				{{ trend.label }}
			</span>
		</div>
		<p class="text-text font-mono text-xl leading-tight font-semibold">{{ value }}</p>
		<p class="text-text-muted mt-0.5 truncate text-[11px]">{{ label }}</p>
		<p class="text-text-faint truncate text-[10px]">{{ subtitle }}</p>
	</div>
</template>
