export default defineEventHandler(async (event) => {
    const { baseURL } = useRuntimeConfig(event);
    const page = await launchTravian(event);

    const villageLevels = await getVillageLevels(page, baseURL);

    return {
        villageLevels,
        meta: {
            url: page.url(),
            date: Date.now()
        }
    };
});
