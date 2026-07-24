<script setup lang="ts">
withDefaults(
	defineProps<{
		title?: string;
		description?: string;
	}>(),
	{
		title: 'Something went wrong',
		description: "This section couldn't load. Check your connection and try again.",
	},
);

defineEmits<{ (e: 'retry'): void }>();
</script>

<template>
	<div
		class="border-error-soft bg-error-soft/40 flex flex-col items-center justify-center gap-3 rounded-lg border px-4 py-8 text-center"
	>
		<span class="bg-error-soft text-error flex h-10 w-10 items-center justify-center rounded-full">
			<Icon
				class="h-5 w-5"
				name="icon:warning"
			/>
		</span>
		<div>
			<p class="text-text text-sm font-medium">{{ title }}</p>
			<p class="text-text-muted mt-0.5 text-xs">{{ description }}</p>
		</div>
		<RetryButton @click="$emit('retry')" />
	</div>
</template>
