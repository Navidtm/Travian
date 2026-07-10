export const useBuilding = defineStore('building', () => {
	const { data, pending, error, execute } = useFetch('/api/building', {
		key: 'building',
		immediate: false,
	});

	if (!data.value && !pending.value && !error.value) {
		void execute();
	}

	return { data, pending, error, execute };
});
