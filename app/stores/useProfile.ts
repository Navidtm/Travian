export const useProfile = defineStore('profile', () => {
	const { data, pending, error, execute } = useFetch('/api/profile', {
		key: 'profile',
		immediate: false,
	});

	if (!data.value && !pending.value && !error.value) {
		void execute();
	}

	return { data, pending, error, execute };
});
