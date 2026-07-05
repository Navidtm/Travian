<script setup lang="ts">
import { resourses } from '~/constants/farm';

const { data, refresh, status } = await useFetch('/api/hero/info');

const query = ref({
	resourceHero: data.value?.resourceHero,
});

const { execute: edit, status: editStatus } = await useFetch('/api/hero/edit', {
	query,
	method: 'post',
	immediate: false,
	onResponse: async () => {
		await refresh();
	},
});

const { execute, status: regenerationStatus } = await useFetch('/api/hero/regeneration', {
	immediate: false,
	method: 'post',
	onResponse: async () => {
		await refresh();
	},
});
</script>

<template>
	<div class="max-w-md bg-primary/20 flex flex-col items-center gap-4 p-4 rounded-xl border-sum">
		<h2>قهرمان</h2>
		<template v-if="status == 'pending'"> در حال دریافت داده </template>
		<template v-else-if="data">
			<div v-if="editStatus == 'pending'">در حال تغییر...</div>
			<div
				v-else
				class="flex flex-col items-center gap-2"
			>
				<div class="sr-only hover:bg-all active:bg-all border-all bg-all" />
				<div class="sr-only hover:bg-wood active:bg-wood border-wood bg-wood" />
				<div class="sr-only hover:bg-clay active:bg-clay border-clay bg-clay" />
				<div class="sr-only hover:bg-iron active:bg-iron border-iron bg-iron" />
				<div class="sr-only hover:bg-wheat active:bg-wheat border-wheat bg-wheat" />
				<div class="flex gap-4">
					<UButton
						v-for="(name, i) in ['all', 'wood', 'clay', 'iron', 'wheat']"
						:key="name"
						:class="[
							data.resourceHero == i ? `bg-${name}` : `border-2 border-${name} bg-transparent`,
							`hover:bg-${name} active:bg-${name}/50`,
						]"
						@click="
							query.resourceHero = i;
							edit();
						"
					>
						{{ resourses[name as Resourse] }}
					</UButton>
				</div>
			</div>
			<div v-if="data.isDead">
				<template v-if="regenerationStatus == 'pending'"> در حال احیاء قهرمان... </template>
				<template v-else>
					قهرمان مرده
					<UButton
						color="success"
						@click="execute()"
					>
						احیاء
					</UButton>
				</template>
			</div>
			<div v-else>
				<div class="flex gap-4">
					<div class="">
						سلامتی:
						<span>{{ data.power }}</span>
					</div>
					<div class="">
						سطح:
						<span>{{ data.level }}</span>
					</div>
					<div class="">
						تجربه:
						<span>{{ data.experience.toLocaleString() }}</span>
					</div>
					<div class="">
						سرعت:
						<span>{{ data.speed }}</span>
					</div>
				</div>
			</div>
			<UButton @click="refresh()"> بروزرسانی </UButton>
		</template>
	</div>
</template>
