import { villagePath } from '~~/server/constants/consts';

export default defineEventHandler(async (event) => {
    const page = await launchTravian(event, villagePath);

    const levels = await getVillageLevels(page);

    await page.close();

    return {
        levels,
        meta: {
            url: page.url(),
            date: Date.now()
        }
    };
});
