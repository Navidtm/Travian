export const useApi = createUseFetch(options => {
	return {
		immediate: false,
		server: false,
		deep: true,
		...options,
	};
});
