<script setup lang="ts">
defineProps<{ active: 'training' | 'operations' }>();
</script>

<template>
	<div class="flex items-center gap-1 rounded-lg border border-border bg-surface-2 p-1">
		<NuxtLink
			to="/military/training"
			class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
			:class="
				active === 'training' ? 'bg-surface text-text shadow-sm' : 'text-text-muted hover:text-text'
			"
		>
			Training
		</NuxtLink>
		<NuxtLink
			to="/military/operations"
			class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
			:class="
				active === 'operations'
					? 'bg-surface text-text shadow-sm'
					: 'text-text-muted hover:text-text'
			"
		>
			Operations
		</NuxtLink>
	</div>
</template>
