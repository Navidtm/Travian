export const useFarm = defineStore('farm', () => {
	const { data, pending, error, execute } = useAsyncData('farm', () => $fetch('/api/farm'), {
		immediate: false,
	});

	return { data, pending, error, execute };
});
