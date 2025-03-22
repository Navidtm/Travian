export default defineEventHandler(async (event) => {
    const { baseURL } = useRuntimeConfig(event);
    const { page, closeBrowser } = await launchTravian(event);

    const levels = await getFarmLevels(page, baseURL);
    const products = await getFarmProducts(page, baseURL);
    const troops = await getTroops(page, baseURL);
    const resourses = await getResourses(page, baseURL);

    await closeBrowser();
    return {
        levels,
        troops,
        products,
        resourses,
        meta: {
            url: page.url(),
            date: Date.now()
        }
    };
});
