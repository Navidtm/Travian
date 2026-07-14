export const useApi = createUseFetch(options => {
	const token = useCookie<string | null>('token');

	return {
		immediate: false,
		server: false,

		...options,

		onRequest(context) {
			if (token.value) {
				context.options.headers.set('token', token.value);
			}

			(options.onRequest as any)?.(context);
		},

		onResponseError(context) {
			console.log('naivd');

			if (context.response.status === 401) {
				token.value = null;
			}

			(options.onResponseError as any)?.(context);
		},
	};
});
