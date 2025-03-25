<template>
    <UCard
        v-if="data?.products"
        class="max-w-42 w-full h-max"
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
            class="flex justify-between w-full"
        >
            <span>{{ name }}</span>
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
