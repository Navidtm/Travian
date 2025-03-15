export const useFarm = defineStore('farm', () => {
    const { data } = useFetch('/api/info/farm');

    return {
        data: computed(() => data)
    };
});
