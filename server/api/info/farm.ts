export default defineEventHandler(async (event) => {
    const { baseURL } = useRuntimeConfig(event);
    const page = await launchTravian(event);

    const farmLevels = await getFarmLevels(page, baseURL);

    return {
        farmLevels,
        meta: {
            url: page.url(),
            date: Date.now()
        }
    };
});
