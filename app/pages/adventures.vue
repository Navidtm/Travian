<script setup lang="ts">
const { data, refresh } = useFetch('/api/camp/adventures');
const query = ref();
const { execute } = await useFetch('/api/camp/adventures', {
    method: 'post',
    immediate: false,
    query
});

const goToAdventure = async (link: string) => {
    query.value = {
        link
    };
    await execute();
    await refresh();
};
</script>

<template>
    <div class="max-w-md bg-primary/20 flex flex-col items-center gap-4 p-4 rounded-xl">
        <h2>
            ماجراجویی
        </h2>
        <div class="grid grid-cols-2 gap-4">
            <div
                v-for="{ link, moveTime, difficulty } in data"
                :key="link"
            >
                <UButton
                    :color="difficulty == 'hard' ? 'warning':'success' "
                    @click="goToAdventure(link)"
                >
                    ماجراجویی
                    <span>
                        ({{ moveTime }} ثانیه)
                    </span>
                </UButton>
            </div>
        </div>
        <UButton @click="refresh()">
            بروزرسانی
        </UButton>
    </div>
</template>
