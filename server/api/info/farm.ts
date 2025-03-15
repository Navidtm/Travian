export default defineEventHandler(async (event) => {
    const { baseURL } = useRuntimeConfig(event);
    const page = await launchTravian(event);

    const levels = await getFarmLevels(page, baseURL);
    const products = await getFarmProducts(page, baseURL);

    return {
        levels,
        products,
        meta: {
            url: page.url(),
            date: Date.now()
        }
    };
});
