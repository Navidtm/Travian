import { sum } from 'es-toolkit';
import type { farmSchemaType } from '~~/shared/schemas/farm.schema';

export default defineEventHandler<farmSchemaType>(async (event) => {
    const { baseURL } = useRuntimeConfig(event);
    const { page, closeBrowser } = await launchTravian(event);
    const { items, toLevel } = await readBody(event);

    for (const { id, level, type } of items) {
        const template = `${type}(id: ${id})`;
        console.log(`started upgrading ${template} to ${toLevel}`);

        let currentLevel = level;

        while (currentLevel < toLevel) {
            try {
                await page.goto(`${baseURL}/build.php?id=${id}`);

                const clock = await page.locator('.clocks').innerText();

                await page.locator('.button-contents').click();

                if (page.url().includes('/dorf1')) {
                    currentLevel++;
                }

                console.log(`Upgraded ${template} to ${currentLevel}`);

                const sec = sum(clock.split(':')
                    .reverse()
                    .map((v, i) => +v * Math.pow(60, i))
                );

                await sleep(sec * 1000);
            }
            catch {
                console.log('Got Error');
            }
        };
    }

    console.log('finished upgrading');
    await closeBrowser();

    return {};
});
