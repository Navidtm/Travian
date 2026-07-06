<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
	defineProps<{
		label: string;
		tone?: 'red' | 'orange' | 'blue' | 'purple' | 'green' | 'gray';
	}>(),
	{
		tone: 'gray',
	},
);

const toneClasses: Record<string, { bg: string; text: string; dot: string }> = {
	red: {
		bg: 'bg-[var(--color-error-soft)]',
		text: 'text-[var(--color-error)]',
		dot: 'bg-[var(--color-error)]',
	},
	orange: { bg: 'bg-orange-400/10', text: 'text-orange-400', dot: 'bg-orange-400' },
	blue: {
		bg: 'bg-[var(--color-run-soft)]',
		text: 'text-[var(--color-run)]',
		dot: 'bg-[var(--color-run)]',
	},
	purple: { bg: 'bg-purple-400/10', text: 'text-purple-400', dot: 'bg-purple-400' },
	green: {
		bg: 'bg-[var(--color-done-soft)]',
		text: 'text-[var(--color-done)]',
		dot: 'bg-[var(--color-done)]',
	},
	gray: {
		bg: 'bg-[var(--color-surface-3)]',
		text: 'text-[var(--color-text-faint)]',
		dot: 'bg-[var(--color-text-faint)]',
	},
};

const config = computed(() => toneClasses[props.tone]!);
</script>

<template>
	<span
		class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium"
		:class="[config.bg, config.text]"
	>
		<span
			class="h-1.5 w-1.5 rounded-full"
			:class="config.dot"
		/>
		{{ label }}
	</span>
</template>
