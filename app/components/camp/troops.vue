<script setup lang="ts">
const { data } = useFetch('/api/camp/troops');
</script>

<template>
    <div class="">
        navid
        {{ data }}
    </div>
</template>
