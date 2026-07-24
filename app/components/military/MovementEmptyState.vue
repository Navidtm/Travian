<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
	<div
		class="border-border flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-8 text-center"
	>
		<span
			class="bg-surface-3 text-text-faint flex h-10 w-10 items-center justify-center rounded-full"
		>
			<Icon
				class="h-5 w-5"
				name="icon:menu"
			/>
		</span>
		<p class="text-text-faint text-xs">No {{ label.toLowerCase() }} movements right now</p>
	</div>
</template>
