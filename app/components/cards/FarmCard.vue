<template>
    <div class="w-full">
        <UCard
            v-if="data?.levels"
            variant="solid"
        >
            <div class="text-center text-xl mb-4">
                مزرعه
            </div>
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
                                :loading="status =='pending'"
                                :label="`سطح ${level}`"
                                variant="soft"
                                @click="upgradeFarm([{ id, level, type }])"
                            />
                        </div>
                        <UButton
                            class="px-8"
                            :loading="status =='pending'"
                            label="ارتقا همه"
                            @click="upgradeFarm(items)"
                        />
                    </div>
                </UCard>
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { groupBy } from 'es-toolkit';
import { resourses } from '~/constants/farm';
import { useFarm } from '~/stores/useFarm';
import type { upgradeFarmSchemaType } from '~~/shared/schemas/farm.schema';
import type { FarmItem } from '~~/shared/types/farm';

const { data, refresh: updateFarmData } = useFarm();

const body = ref<upgradeFarmSchemaType>();

const { status } = useFetch('/api/upgrade/farm', {
    body,
    method: 'post',
    immediate: false,
    watch: [body],
    onResponse: async () => {
        await updateFarmData();
    }
});

const upgradeFarm = async (items: FarmItem[]) => {
    body.value = {
        items,
        toLevel: 12
    };
};
</script>
