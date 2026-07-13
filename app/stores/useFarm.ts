export const useFarm = defineStore('farm', () => {
	const { data, pending, error, execute } = useApi('/api/farm');

	if (!data.value && !pending.value && !error.value) {
		void execute();
	}

	return { data, pending, error, execute };
});
