export const useFarm = defineStore('farm', () => {
    const { data, refresh, status, error } = useFetch('/api/farm', {
        lazy: true
    });

    return {
        data: computed(() => data),
        status: computed(() => status),
        error: computed(() => error),
        refresh
    };
});
