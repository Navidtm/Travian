<script setup lang="ts">
withDefaults(defineProps<{ lines?: number }>(), { lines: 3 });
</script>

<template>
	<div class="border-border-soft bg-surface-2 animate-pulse rounded-lg border p-3.5">
		<div class="bg-surface-3 mb-3 h-8 w-8 rounded-lg" />
		<div class="space-y-2">
			<div
				v-for="i in lines"
				:key="i"
				class="bg-surface-3 h-2.5 rounded"
				:style="{ width: i === lines ? '60%' : '100%' }"
			/>
		</div>
	</div>
</template>
