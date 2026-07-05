<template>
	<div class="w-full">
		<UCard
			v-if="data?.levels"
			variant="solid"
		>
			<div class="text-center text-xl mb-4">مزرعه</div>
			<div class="flex justify-around mb-6 gap-6">
				<UCard
					v-for="(items, key) in groupBy(data.levels, ({ type }) => type)"
					:key
					variant="solid"
					class="bg-blue-400/10 *:py-3 w-full"
					:class="{ 'max-w-86 brightness-105': key !== 'wheat' }"
				>
					<template #header>
						<div class="text-center font-bold">
							{{ resourses[key] }}
						</div>
					</template>
					<div class="flex flex-col items-center justify-between size-full">
						<div class="flex flex-wrap gap-2 mb-5">
							<UButton
								v-for="{ id, level, type } in items"
								:key="id"
								:loading="status == 'pending' && body?.items.map(v => v.id).includes(id)"
								:label="`سطح ${level}`"
								variant="soft"
								@click="upgradeFarm([{ id, level, type }])"
							/>
						</div>
						<UButton
							class="px-8"
							label="ارتقا همه"
							@click="upgradeFarm(items)"
						/>
					</div>
				</UCard>
			</div>
			<div class="flex w-full gap-4 items-center justify-center">
				<UButton
					class="px-8 self-start"
					:loading="status == 'pending'"
					label="بروزرسانی"
					@click="refresh()"
				/>
				<UButton
					class="px-8"
					label="ارتقا همه"
					@click="upgradeFarm(data.levels)"
				/>
			</div>
		</UCard>
	</div>
</template>

<script setup lang="ts">
import { groupBy } from 'es-toolkit';
import type { upgradeFarmSchemaType } from '~~/shared/schemas/farm.schema';
import type { FarmItem } from '~~/shared/types/farm';

import { resourses } from '~/constants/farm';
import { useFarm } from '~/stores/useFarm';

const { data, refresh: updateFarmData } = useFarm();

const body = ref<upgradeFarmSchemaType>();

const { status, refresh } = useFetch('/api/farm', {
	body,
	method: 'post',
	immediate: false,
	onResponse: async () => {
		await updateFarmData();
	},
});

const upgradeFarm = async (items: FarmItem[]) => {
	body.value = {
		items,
	};
	await refresh();
};
</script>
