<script setup lang="ts">
const { data, refresh, status } = await useFetch('/api/hero/info');

const query = ref({
    resourceHero: data.value?.resourceHero
});

const { execute: edit } = await useFetch('/api/hero/edit', {
    query,
    method: 'post',
    immediate: false,
    onResponse: async () => {
        await refresh();
    }
});

const { execute } = await useFetch('/api/hero/regeneration', {
    immediate: false,
    method: 'post',
    onResponse: async () => {
        await refresh();
    }
});

const resources = [
    {
        name: 'primary',
        nameFa: 'همه'
    },
    {
        name: 'wood',
        nameFa: 'چوب'
    },
    {
        name: 'clay',
        nameFa: 'خشت'
    },
    {
        name: 'iron',
        nameFa: 'آهن'
    },
    {
        name: 'wheat',
        nameFa: 'گندم'
    }
];
</script>

<template>
    <div class="max-w-md bg-primary/20 flex flex-col items-center gap-4 p-4 rounded-xl">
        <h2>
            قهرمان
        </h2>
        <template v-if="status == 'pending'">
            در حال دریافت داده
        </template>
        <template v-else-if="data">
            <div class="flex flex-col items-center gap-2">
                <div class="flex gap-4">
                    <UButton
                        v-for="({ name, nameFa }, i) in resources"
                        :key="name"
                        :class="[data.resourceHero == i ? `bg-${name}` :`border-2 border-${name} bg-transparent`, `hover:bg-${name} active:bg-${name}/50`]"
                        @click="query.resourceHero = i;edit()"
                    >
                        {{ nameFa }}
                    </UButton>
                </div>
            </div>
            <div v-if="data.isDead">
                قهرمان مرده
                <UButton
                    color="success"
                    @click="execute()"
                >
                    احیاء
                </UButton>
            </div>
            <div v-else>
                <div class="flex gap-4">
                    <div class="">
                        سلامتی:
                        <span>{{ data.power }}</span>
                    </div>
                    <div class="">
                        سطح:
                        <span>{{ data.level }}</span>
                    </div>
                    <div class="">
                        تجربه:
                        <span>{{ data.experience }}</span>
                    </div>
                    <div class="">
                        سرعت:
                        <span>{{ data.speed }}</span>
                    </div>
                </div>
            </div>
            <UButton @click="refresh()">
                بروزرسانی
            </UButton>
        </template>
    </div>
</template>
