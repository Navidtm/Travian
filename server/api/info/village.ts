export default defineEventHandler(async (event) => {
    const { baseURL } = useRuntimeConfig(event);
    const page = await launchTravian(event);

    const levels = await getVillageLevels(page, baseURL);

    return {
        levels,
        meta: {
            url: page.url(),
            date: Date.now()
        }
    };
});
