<template>
    <div class="max-w-xs">
        <UCard
            v-if="data?.levels"
            variant="solid"
        >
            <template #header>
                <div class="text-center text-xl">
                    مزرعه
                </div>
            </template>
            <template #default>
                <div class="space-y-4">
                    <UCard
                        v-for="(value, key) in groupBy(data.levels, item => `${item.type}`)"
                        :key
                        variant="solid"
                        class="bg-blue-400/10"
                    >
                        <div
                            v-for="{ id, level, type } in value"
                            :key="id"
                            class=""
                        >
                            <span>{{ resourses[type] }}</span>
                            <span>:</span>
                            <span>{{ level }}</span>
                        </div>
                    </UCard>
                </div>
            </template>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { groupBy } from 'es-toolkit';
import { resourses } from '~/constants/farm';
import { useFarm } from '~/stores/useFarm';

const { data } = useFarm();
</script>
