<template>
    <UCard
        v-if="data"
        class="max-w-xs"
        variant="solid"
    >
        <template #header>
            <div class="text-center text-xl">
                ساختمان ها
            </div>
        </template>
        <div
            v-for="{ id, level, name, isEmpty } in data.levels"
            :key="id"
            class="data-[empty=true]:opacity-40"
            :data-empty="isEmpty"
        >
            <span>{{ name }}</span>
            :
            <span>
                {{ level }}
            </span>
        </div>
    </UCard>
</template>

<script setup lang="ts">
const { data } = useFetch('/api/info/village');
</script>
