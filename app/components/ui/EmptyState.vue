<script setup lang="ts">
withDefaults(
	defineProps<{
		title: string;
		description?: string;
	}>(),
	{
		description: '',
	},
);
</script>

<template>
	<div
		class="border-border flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-8 text-center"
	>
		<span
			class="bg-surface-3 text-text-faint flex h-10 w-10 items-center justify-center rounded-full"
		>
			<slot name="icon">
				<svg
					viewBox="0 0 24 24"
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					stroke-width="1.6"
				>
					<path d="M4 12h16M4 6h16M4 18h10" />
				</svg>
			</slot>
		</span>
		<p class="text-text text-xs font-medium">{{ title }}</p>
		<p
			v-if="description"
			class="text-text-faint text-[11px]"
			>{{ description }}</p
		>
		<slot name="action" />
	</div>
</template>
