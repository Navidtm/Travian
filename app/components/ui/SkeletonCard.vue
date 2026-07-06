<script setup lang="ts">
withDefaults(defineProps<{ lines?: number }>(), { lines: 3 });
</script>

<template>
	<div class="animate-pulse rounded-lg border border-border-soft bg-surface-2 p-3.5">
		<div class="mb-3 h-8 w-8 rounded-lg bg-surface-3" />
		<div class="space-y-2">
			<div
				v-for="i in lines"
				:key="i"
				class="h-2.5 rounded bg-surface-3"
				:style="{ width: i === lines ? '60%' : '100%' }"
			/>
		</div>
	</div>
</template>
