import { FarmPath } from '~~/server/constants/consts';

export default defineEventHandler(async (event) => {
    const page = await launchTravian(event, FarmPath);

    const levels = await getFarmLevels(page);
    const products = await getFarmProducts(page);
    const troops = await getTroops(page);
    const resourses = await getResourses(page);

    await page.close();

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
