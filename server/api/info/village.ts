import { villagePath } from '~~/server/constants/consts';

export default defineEventHandler(async (event) => {
    const { page, closeBrowser } = await launchTravian(event, villagePath);

    const levels = await getVillageLevels(page);

    await closeBrowser();
    return {
        levels,
        meta: {
            url: page.url(),
            date: Date.now()
        }
    };
});
