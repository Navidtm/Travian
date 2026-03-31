<script setup lang="ts">
const links = [
    {
        name: 'خانه',
        route: '/'
    },
    {
        name: 'سربازخانه',
        route: '/camp'
    }
];
</script>

<template>
    <div class="">
        <div class="border-b border-white/20 py-4 text-white">
            <div class="flex justify-center gap-4 items-center">
                <ULink
                    v-for="link in links"
                    :key="link.route"
                    :to="link.route"
                >
                    <div class="">
                        {{ link.name }}
                    </div>
                </ULink>
            </div>
        </div>
    </div>
</template>
