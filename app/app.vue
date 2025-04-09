<template>
    <UApp>
        <NuxtLayout v-if="cookie">
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>

<script setup lang="ts">
const cookie = useCookie('Authorization');

useFetch('/api/auth/login', {
    immediate: !cookie.value,
    onResponse: ({ response }) => {
        if (response._data?.token) {
            cookie.value = response._data.token;
        }
    }
});
</script>
