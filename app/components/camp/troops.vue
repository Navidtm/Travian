<script setup lang="ts">
const { data, refresh } = useFetch('/api/camp/troops');
</script>

<template>
	<div
		v-if="data"
		class="max-w-md bg-primary/20 flex flex-col items-center gap-4 p-4 rounded-xl"
	>
		<h2>سربازخانه</h2>
		<div v-if="data.length == 0">ساختمان ها را بسازید!</div>
		<div
			v-for="{ count, maxTrain, name } in data"
			:key="name"
		>
			{{ name }}
			{{ count }}
			تا حداکثر : {{ maxTrain }} تا
		</div>

		<UButton @click="refresh()"> بروزرسانی </UButton>
	</div>
</template>
