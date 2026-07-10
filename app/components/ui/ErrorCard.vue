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
			<svg
				viewBox="0 0 24 24"
				class="h-5 w-5"
				fill="none"
				stroke="currentColor"
				stroke-width="1.8"
			>
				<path d="M12 9v4M12 17h.01" />
				<path d="M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
			</svg>
		</span>
		<div>
			<p class="text-text text-sm font-medium">{{ title }}</p>
			<p class="text-text-muted mt-0.5 text-xs">{{ description }}</p>
		</div>
		<RetryButton @click="$emit('retry')" />
	</div>
</template>
