export const useFarm = defineStore('farm', () => {
	const { data, pending, error, execute } = useFetch('/api/farm', {
		key: 'farm',
		immediate: false,
	});

	if (!data.value && !pending.value && !error.value) {
		void execute();
	}

	return { data, pending, error, execute };
});
