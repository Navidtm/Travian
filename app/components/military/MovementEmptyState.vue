<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
	<div
		class="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-8 text-center"
	>
		<span
			class="flex h-10 w-10 items-center justify-center rounded-full bg-surface-3 text-text-faint"
		>
			<svg
				viewBox="0 0 24 24"
				class="h-5 w-5"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
			>
				<path d="M4 12h16M4 6h16M4 18h10" />
			</svg>
		</span>
		<p class="text-xs text-text-faint">No {{ label.toLowerCase() }} movements right now</p>
	</div>
</template>
