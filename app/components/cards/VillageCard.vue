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
        <div class="grid grid-cols-6 gap-2 text-center mb-4">
            <div
                v-for="{ id, level, name, isEmpty } in data.levels"
                :key="id"
                class="data-[empty=true]:opacity-40"
                :data-empty="isEmpty"
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
        <UButton
            class="px-8 mx-auto block"
            :loading="status =='pending'"
            label="ارتقا همه"
            @click="execute()"
        />
    </UCard>
</template>

<script setup lang="ts">
const token = useCookie('token');

const { data, refresh: updateFarmData } = useFetch('/api/info/village', {
    headers: {
        token: token.value ?? ''
    }
});

const { status, execute } = useFetch('/api/upgrade/building', {
    method: 'post',
    immediate: false,
    onResponse: async () => {
        await updateFarmData();
    }
});
</script>
