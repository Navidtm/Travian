<script setup lang="ts">
const stream = useApiStream({
	onMessage(message) {
		console.log(message.progress);
		console.log(message.message);
	},

	onError(error) {
		console.log(error);
	},
	onDone(result) {
		console.log(result);

		console.log('stream closed');
	},
});

const { refresh } = useFetch('/api/village/edit-name', {
	body: { name: 'navid' },
	method: 'POST',
	immediate: false,
});
</script>
<template>
	<!-- <button @click="stream.start('/api/test')"> click me </button> -->
	<button @click="refresh()"> click me </button>
</template>
