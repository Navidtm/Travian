<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		progress: number; // 0..1
		color?: string; // css color value
		trackClass?: string;
	}>(),
	{
		color: 'var(--color-run)',
		trackClass: '',
	},
);

const pct = computed(() => `${Math.max(0, Math.min(100, props.progress * 100))}%`);
</script>

<template>
	<div
		class="h-1.5 w-full overflow-hidden rounded-full"
		:class="trackClass || 'bg-surface-3'"
		role="progressbar"
		:aria-valuenow="Math.round(progress * 100)"
		aria-valuemin="0"
		aria-valuemax="100"
	>
		<div
			class="h-full rounded-full transition-[width] duration-500 ease-out"
			:style="{ width: pct, backgroundColor: color }"
		/>
	</div>
</template>
