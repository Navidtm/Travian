<script setup lang="ts">
const { data, refresh } = useFetch('/api/camp/academy');
const { execute } = await useFetch('/api/camp/academy', {
    method: 'post',
    immediate: false
});
</script>

<template>
    <div class="flex justify-center items-center">
        <UCard
            variant="solid"
            class="bg-blue-400/10 *:py-3 w-full max-w-max"
        >
            <div class="flex flex-col items-center">
                <div class="">
                    لیست نیاز به آموزش
                </div>
                <div v-if="data && data.length > 0">
                    {{ data }}
                    <UButton @click="execute()">
                        آموزش همه
                    </UButton>
                </div>
                <div v-else>
                    آموزش کامل یا داروالفنون هنوز ساخته نشده است
                </div>
                <UButton @click="refresh()">
                    بروزرسانی
                </UButton>
            </div>
        </UCard>
    </div>
</template>
