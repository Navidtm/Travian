<script setup lang="ts">
withDefaults(defineProps<{ label?: string; disabled?: boolean }>(), {
	label: 'Retry',
	disabled: false,
});

defineEmits<{ (e: 'click'): void }>();
</script>

<template>
	<button
		type="button"
		class="border-border bg-surface-2 text-text hover:bg-surface-3 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
		:disabled="disabled"
		@click="$emit('click')"
	>
		<svg
			viewBox="0 0 24 24"
			class="h-3.5 w-3.5"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path d="M20 11A8 8 0 1 0 18 16" />
			<path d="M20 5v6h-6" />
		</svg>
		{{ label }}
	</button>
</template>
