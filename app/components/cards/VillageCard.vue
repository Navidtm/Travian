<template>
    <UCard
        v-if="data"
        class="w-full"
        variant="solid"
    >
        <template #header>
            <div class="text-center text-xl">
                ساختمان ها
            </div>
        </template>
        <div v-if="dataStatus == 'pending'">
            <div class="text-center">
                در حال بروزرسانی...
            </div>
        </div>
        <div
            v-if="dataStatus == 'success'"
            class="grid grid-cols-6 gap-2 text-center"
        >
            <div
                v-for="{ id, level, name } in data.levels"
                :key="id"
            >
                <span>
                    {{ name }}
                </span>
                :
                <span>
                    {{ level }}
                </span>
            </div>
        </div>
        <div class="flex w-full gap-4 items-center justify-center mt-4">
            <UButton
                class="px-8"
                :loading="status =='pending'"
                label="بروزرسانی"
                @click="refresh()"
            />
            <UButton
                class="px-8"
                :loading="status =='pending'"
                label="ارتقا همه"
                @click="execute()"
            />
        </div>
    </UCard>
</template>

<script setup lang="ts">
const { data, status: dataStatus, refresh } = useFetch('/api/village');

const { status, execute } = useFetch('/api/village', {
    method: 'post',
    immediate: false,
    onResponse: async () => {
        await refresh();
    }
});
</script>
