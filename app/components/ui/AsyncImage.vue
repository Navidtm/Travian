<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		src?: string | null;
		alt?: string;
		rounded?: string;
	}>(),
	{
		src: null,
		alt: '',
		rounded: 'rounded-lg',
	},
);

const hasError = ref(false);

watch(
	() => props.src,
	() => {
		hasError.value = false;
	},
);
</script>

<template>
	<span
		v-if="!src || hasError"
		class="flex h-full w-full items-center justify-center"
		:class="rounded"
	>
		<slot name="fallback" />
	</span>
	<img
		v-else
		:src="src"
		:alt="alt"
		loading="lazy"
		class="h-full w-full object-cover"
		:class="rounded"
		@error="hasError = true"
	/>
</template>
