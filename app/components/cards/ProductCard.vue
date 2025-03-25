<template>
    <UCard
        v-if="data?.products"
        class="w-1/2"
        variant="solid"
    >
        <template #header>
            <div class="text-center text-xl">
                تولید ها
            </div>
        </template>
        <div class="grid grid-cols-2 gap-4 w-full">
            <div
                v-for="{ name, amount } in data.products"
                :key="name"
                class="w-full text-center"
            >
                <div>
                    {{ (amount / 3600).toFixed().toLocaleString() }}
                    <span class="text-blue-400">{{ name }}</span>
                    در ثانیه
                </div>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { useFarm } from '~/stores/useFarm';

const { data } = useFarm();
</script>
