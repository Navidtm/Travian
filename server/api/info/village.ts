export default defineEventHandler(async (event) => {
    const { baseURL } = useRuntimeConfig(event);
    const { page, closeBrowser } = await launchTravian(event);

    const levels = await getVillageLevels(page, baseURL);

    await closeBrowser();
    return {
        levels,
        meta: {
            url: page.url(),
            date: Date.now()
        }
    };
});
