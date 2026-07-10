<script setup lang="ts">
defineProps<{
	modelValue: boolean;
	label?: string;
}>();

defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
</script>

<template>
	<button
		dir="rtl"
		type="button"
		role="switch"
		:aria-checked="modelValue"
		class="inline-flex items-center gap-2"
		@click="$emit('update:modelValue', !modelValue)"
	>
		<span
			class="relative h-5 w-9 shrink-0 rounded-full transition-colors"
			:class="modelValue ? 'bg-run' : 'bg-surface-3'"
		>
			<span
				class="bg-bg absolute top-0.5 h-4 w-4 rounded-full transition-transform"
				:class="modelValue ? 'translate-x-4' : 'translate-x-0.5'"
			/>
		</span>
		<span
			v-if="label"
			class="text-text text-xs font-medium"
			>{{ label }}</span
		>
	</button>
</template>
