<template>
    <div class="max-w-sm w-full">
        <UCard
            v-if="data?.levels"
            variant="solid"
        >
            <div class="text-center text-xl mb-4">
                مزرعه
            </div>
            <div class="space-y-4">
                <UCard
                    v-for="(value, key) in groupBy(data.levels, ({ type }) => type)"
                    :key
                    variant="solid"
                    class="bg-blue-400/10 *:py-3"
                >
                    <div class="text-center font-bold mb-3">
                        {{ resourses[key] }}
                    </div>
                    <div class="grid grid-cols-4 gap-2 mb-5">
                        <UButton
                            v-for="{ id, level } in value"
                            :key="id"
                            variant="soft"
                            @click="upgradeFarm(id)"
                        >
                            سطح
                            {{ level }}
                        </UButton>
                    </div>
                    <UButton
                        class="w-full"
                        @click="upgradeTypeFarm(key)"
                    >
                        <div class="text-center w-full">
                            ارتقا همه
                        </div>
                    </UButton>
                </UCard>
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { groupBy } from 'es-toolkit';
import { resourses } from '~/constants/farm';
import { useFarm } from '~/stores/useFarm';

const { data } = useFarm();

const upgradeFarm = (id: number) => {
    console.log(id);
};

const upgradeTypeFarm = (id: Farm) => {
    console.log(id);
};
</script>
