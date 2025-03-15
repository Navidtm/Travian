<template>
    <UCard
        v-if="data?.products"
        class="max-w-xs h-max"
        variant="solid"
    >
        <template #header>
            <div class="text-center text-xl">
                منابع
            </div>
        </template>
        <div
            v-for="{ name, amount, max } in data.resourses"
            :key="name"
            class="grid grid-cols-2"
        >
            <span>{{ resourses[name] }}:</span>
            <span>
                {{ amount.toLocaleString() }}
            </span>
            {{ max }}
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { resourses } from '~/constants/farm';
import { useFarm } from '~/stores/useFarm';

const { data } = useFarm();
</script>
