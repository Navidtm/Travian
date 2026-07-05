<script setup lang="ts">
const { data, refresh } = useFetch('/api/town');
</script>

<template>
	<UCard
		v-if="data"
		class="w-full h-max"
		variant="solid"
	>
		<div class="flex flex-col items-center gap-4">
			<h2 class="text-lg">دهکده ها</h2>
			<div
				v-for="{ name, isActive } in data"
				:key="name"
			>
				<span :class="isActive ? 'text-secondary' : 'text-white'">{{ name }}</span>
			</div>

			<UButton @click="refresh()"> بروزرسانی </UButton>
		</div>
	</UCard>
</template>
