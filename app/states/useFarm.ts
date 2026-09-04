export const useFarm = defineState(() => {
	const { data, pending, error, execute } = useApi('/api/farm');

	const {
		start,
		pending: loading,
		cancel,
	} = useApiStream<ResourceField[]>({
		onData: fields => {
			if (data.value) data.value.fields = fields;
		},
		onDone: fields => {
			if (data.value) data.value.fields = fields;
		},
	});

	if (!data.value && !pending.value && !error.value) {
		void execute();
	}

	const upgrade = async (target?: number) => {
		await start('/api/farm', { body: { target } });
	};

	return { data, pending, error, execute, upgrade, cancel, loading };
});
