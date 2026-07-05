<script setup lang="ts">
const { data, refresh, status } = useFetch('/api/camp/adventures');

const query = ref({
	link: '',
});
const { execute, status: adventureStatus } = await useFetch('/api/camp/adventures', {
	method: 'post',
	immediate: false,
	query,
	onResponse: async () => {
		await refresh();
	},
});
</script>

<template>
	<div
		v-if="data"
		class="max-w-md bg-primary/20 flex flex-col items-center gap-4 p-4 rounded-xl"
	>
		<h2>ماجراجویی</h2>

		<template v-if="status == 'pending'"> در حال دریافت داده... </template>
		<template v-if="adventureStatus == 'pending'"> در حال ارسال... </template>
		<div
			v-else-if="status == 'success'"
			class="grid grid-cols-3 gap-4"
		>
			<div
				v-for="{ link, moveTime, difficulty } in data"
				:key="link"
			>
				<UButton
					:color="difficulty == 'hard' ? 'warning' : 'success'"
					@click="
						query.link = link;
						execute();
					"
				>
					<span> {{ moveTime }} ثانیه </span>
				</UButton>
			</div>
		</div>
		<UButton @click="refresh()"> بروزرسانی </UButton>
	</div>
</template>
