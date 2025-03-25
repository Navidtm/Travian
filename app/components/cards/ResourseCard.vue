<template>
    <UCard
        v-if="data?.products"
        class="w-full py-0"
        variant="solid"
    >
        <template #header>
            <div class="text-center text-xl">
                منابع
            </div>
        </template>
        <div class="flex w-full gap-4">
            <div
                v-for="{ name, amount, max } in data.resourses"
                :key="name"
                class="w-full text-center"
            >
                <div>
                    {{ resourses[name] }}:

                    {{ amount.toLocaleString() }}
                </div>
                <UProgress
                    :model-value="amount"
                    status
                    :max
                />
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { resourses } from '~/constants/farm';
import { useFarm } from '~/stores/useFarm';

const { data } = useFarm();
</script>
