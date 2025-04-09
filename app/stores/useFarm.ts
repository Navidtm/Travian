export const useFarm = defineStore('farm', () => {
    const token = useCookie('token');

    const { data, refresh, status, error } = useFetch('/api/info/farm', {
        lazy: true,
        headers: {
            token: token.value ?? ''
        }
    });

    return {
        data: computed(() => data),
        status: computed(() => status),
        error: computed(() => error),
        refresh
    };
});
