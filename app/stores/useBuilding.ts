export const useBuilding = defineStore('building', () => {
	const { data, pending, error, execute } = useApi('/api/building');

	const { start } = useApiStream<Building[]>({
		onData: building => {
			if (data.value) data.value = building;
		},
		onDone: building => {
			if (data.value) data.value = building;
		},
	});

	if (!data.value && !pending.value && !error.value) {
		void execute();
	}

	const upgrade = async (target?: number) => {
		await start('/api/building', { body: { target } });
	};

	return { data, pending, error, execute, upgrade };
});
