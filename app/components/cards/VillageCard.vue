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
        <UButton
            class="px-8"
            :loading="status =='pending'"
            label="ارتقا همه"
            @click="execute()"
        />
    </UCard>
</template>

<script setup lang="ts">
const { data, refresh: updateFarmData } = useFetch('/api/info/village');

const { status, execute } = useFetch('/api/upgrade/building', {
    method: 'post',
    immediate: false,
    onResponse: async () => {
        await updateFarmData();
    }
});
</script>
