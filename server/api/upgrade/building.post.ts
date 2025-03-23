import { sum } from 'es-toolkit';
import { BuildingList, max5Levels, villageAddress, villageId } from '~~/shared/constants/village';
import type { farmSchemaType } from '~~/shared/schemas/farm.schema';

export default defineEventHandler<farmSchemaType>(async (event) => {
    const { baseURL } = useRuntimeConfig(event);
    const { page, closeBrowser } = await launchTravian(event);

    const levels = await getVillageLevels(page, baseURL);

    const toLevel = 15;

    for (const name of BuildingList) {
        const id = villageAddress[name];

        const template = `${name}(id: ${id})`;
        console.log(`started upgrading ${template} to ${toLevel}`);

        let currentLevel = levels.find(v => v.id === id)?.level ?? 0;

        console.log(`Upgraded ${template} from ${currentLevel} to ${toLevel}`);

        while (currentLevel < toLevel) {
            try {
                if (max5Levels.includes(name) && currentLevel == 5)
                    break;

                await page.goto(`${baseURL}/build.php?id=${id}`);

                if (currentLevel == 0) {
                    const links = await page.locator('.contractLink button').all();

                    for (const link of links) {
                        const onclickAttr = await link.getAttribute('onclick');

                        const id = onclickAttr?.split(/'/)[1].match(/a=(\d+)/)?.[1] ?? 0;

                        if (villageId[name] == id) {
                            console.log(`Building ${template}`);
                            await link.click();
                            break;
                        }
                    }
                }
                else {
                    if (name == 'Embassy')
                        break;

                    const clock = await page.locator('.clocks').first().innerText();

                    await page.locator('.button-contents').first().click();

                    console.log(`Upgraded ${template} to ${currentLevel + 1}`);

                    const sec = sum(clock.split(':')
                        .reverse()
                        .map((v, i) => +v * Math.pow(60, i))
                    );

                    await sleep(sec * 1000);
                }

                if (page.url().includes('/dorf2')) {
                    currentLevel++;
                }
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
