<script setup lang="ts">
import { computed } from 'vue';

const {
	size = 84,
	strokeWidth = 8,
	color = 'var(--color-run)',
	progress,
	label,
} = defineProps<{
	progress: number; // 0..1
	size?: number;
	strokeWidth?: number;
	color?: string;
	label?: string;
}>();

const radius = computed(() => (size - strokeWidth) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);
const offset = computed(() => circumference.value * (1 - Math.max(0, Math.min(1, progress))));
</script>

<template>
	<div
		class="relative inline-flex items-center justify-center"
		:style="{ width: `${size}px`, height: `${size}px` }"
	>
		<svg
			:width="size"
			:height="size"
			class="-rotate-90"
		>
			<circle
				:cx="size / 2"
				:cy="size / 2"
				:r="radius"
				fill="none"
				stroke="var(--color-surface-3)"
				:stroke-width="strokeWidth"
			/>
			<circle
				:cx="size / 2"
				:cy="size / 2"
				:r="radius"
				fill="none"
				:stroke="color"
				:stroke-width="strokeWidth"
				stroke-linecap="round"
				:stroke-dasharray="circumference"
				:stroke-dashoffset="offset"
				class="transition-[stroke-dashoffset] duration-700 ease-out"
			/>
		</svg>
		<div class="absolute inset-0 flex flex-col items-center justify-center">
			<span class="text-text font-mono text-sm font-semibold"
				>{{ Math.round(progress * 100) }}%</span
			>
			<span
				v-if="label"
				class="text-text-faint text-[9px]"
				>{{ label }}</span
			>
		</div>
	</div>
</template>
