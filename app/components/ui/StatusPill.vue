<script setup lang="ts">
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
		bg: 'bg-error-soft',
		text: 'text-error',
		dot: 'bg-error',
	},
	orange: { bg: 'bg-orange-400/10', text: 'text-orange-400', dot: 'bg-orange-400' },
	blue: {
		bg: 'bg-run-soft',
		text: 'text-run',
		dot: 'bg-run',
	},
	purple: { bg: 'bg-purple-400/10', text: 'text-purple-400', dot: 'bg-purple-400' },
	green: {
		bg: 'bg-done-soft',
		text: 'text-done',
		dot: 'bg-done',
	},
	gray: {
		bg: 'bg-surface-3',
		text: 'text-text-faint',
		dot: 'bg-text-faint',
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
