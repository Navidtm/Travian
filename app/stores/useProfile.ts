export const useProfile = defineStore('profile', () => {
	const { data, pending, error, execute } = useAsyncData('profile', () => $fetch('/api/profile'), {
		immediate: false,
	});

	return { data, pending, error, execute };
});
