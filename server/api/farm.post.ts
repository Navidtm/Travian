import { farmPath } from '~~/shared/constants/common';
import type { farmSchemaType } from '~~/shared/schemas/farm.schema';

export default defineEventHandler<farmSchemaType>(async (event) => {
    const { baseURL } = useRuntimeConfig(event);
    const page = await launchTravian(event, farmPath);
    const { items } = await readBody(event);

    for (const { id, type } of items) {
        const farmRoute = `${baseURL}/build.php?id=${id}`;
        await page.goto(farmRoute);

        const title = page.locator('h1.titleInHeader').first();
        const levelStr = await title.locator('span.level').textContent() ?? '';
        let level = parseInt(levelStr.replace('سطح', ''));

        const template = `${type}-${id}`;

        let toLevel = 20;
        if (level < 10) {
            toLevel = 10;
        }
        else if (level < 15) {
            toLevel = 15;
        }

        if (level < toLevel) {
            console.log(`Started Upgrading ${template}:${level} -> ${toLevel}`);
        }

        while (level < toLevel) {
            try {
                const sec = await getSecFromClock(page);

                await page.locator('.button-contents').click();

                console.log(`Upgrading ${level} -> ${level + 1}`);

                await sleep(sec * 1000);

                if (page.url().includes('/dorf1')) {
                    level++;
                    await page.goto(farmRoute);
                }
            }
            catch {
                console.log('Got Error');
            }
        };
    }

    console.log('Finished All Upgrading');
    await page.close();

    return {};
});
