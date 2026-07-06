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
		class="group rounded-lg border border-border-soft bg-surface-2 p-3.5 transition-transform hover:-translate-y-0.5"
	>
		<div class="mb-2.5 flex items-center justify-between">
			<span
				class="flex h-8 w-8 items-center justify-center rounded-lg"
				:style="{ backgroundColor: colorVar + '1a', color: colorVar }"
			>
				<slot name="icon">
					<svg
						viewBox="0 0 24 24"
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
					>
						<circle
							cx="12"
							cy="12"
							r="8"
						/>
					</svg>
				</slot>
			</span>
			<span
				v-if="trend"
				class="inline-flex items-center gap-1 text-[10px] font-medium"
				:class="trend.direction === 'up' ? 'text-done' : 'text-error'"
			>
				<svg
					v-if="trend.direction === 'up'"
					viewBox="0 0 24 24"
					class="h-3 w-3"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<path d="M6 15l6-6 6 6" />
				</svg>
				<svg
					v-else
					viewBox="0 0 24 24"
					class="h-3 w-3"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
				{{ trend.label }}
			</span>
		</div>
		<p class="font-mono text-xl font-semibold leading-tight text-text">{{ value }}</p>
		<p class="mt-0.5 truncate text-[11px] text-text-muted">{{ label }}</p>
		<p class="truncate text-[10px] text-text-faint">{{ subtitle }}</p>
	</div>
</template>
