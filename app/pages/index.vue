<template>
    <div class="">
        <div class="px-6 py-8">
            <div class="flex gap-6">
                <div class="space-y-6 w-full">
                    <div class="flex gap-10 justify-between">
                        <ProductCard />
                        <ResourseCard />
                    </div>
                    <FarmCard />
                    <VillageCard />
                    <UButton
                        class="px-8 self-start"
                        :loading="status =='pending'"
                        label="بروزرسانی"
                        @click="refresh()"
                    />
                </div>
                <TroopsCard />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { status, refresh } = useFarm();
</script>
