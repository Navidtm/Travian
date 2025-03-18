<template>
    <UCard
        v-if="data?.products"
        class="max-w-xs h-max"
        variant="solid"
    >
        <template #header>
            <div class="text-center text-xl">
                ارتش
            </div>
        </template>
        <div
            v-for="{ name, amount } in data.troops"
            :key="name"
            class="grid grid-cols-2"
        >
            <span>{{ name }}:</span>
            <span>
                {{ amount.toLocaleString() }}
            </span>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { useFarm } from '~/stores/useFarm';

const { data } = useFarm();
</script>
