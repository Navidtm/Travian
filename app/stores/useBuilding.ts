export const useBuilding = defineStore('building', () => {
	const { data, pending, error, execute } = useApi('/api/building');

	if (!data.value && !pending.value && !error.value) {
		void execute();
	}

	return { data, pending, error, execute };
});
