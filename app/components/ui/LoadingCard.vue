<script setup lang="ts">
import SkeletonCard from '~/components/ui/SkeletonCard.vue';

withDefaults(
	defineProps<{
		count?: number;
		columns?: 'one' | 'two' | 'three';
	}>(),
	{
		count: 3,
		columns: 'three',
	},
);

const columnClass: Record<string, string> = {
	one: 'grid-cols-1',
	two: 'grid-cols-1 sm:grid-cols-2',
	three: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
};
</script>

<template>
	<div
		class="grid gap-3"
		:class="columnClass[columns]"
	>
		<SkeletonCard
			v-for="i in count"
			:key="i"
			:lines="3"
		/>
	</div>
</template>
