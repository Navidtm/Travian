export const useApi = createUseFetch(options => {
	const token = useCookie<string>('token');

	return {
		immediate: false,
		server: false,
		headers: { token: token.value },
		...options,
	};
});
