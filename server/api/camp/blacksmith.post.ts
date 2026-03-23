import { getSecFromClock } from "~~/server/utils/helpers/time";

export default defineEventHandler(async (event) => {
    const page = await launchTravian(event, '/build.php?id=33');
    const researches = await page.locator('.research').all();

    console.log(`Upgrading ${researches.length} Troops`);

    for (const research of researches) {
        const title = research.locator('.title').first();
        const levelStr = await title.locator('.level').textContent() ?? '';
        let level = parseInt(levelStr.replace('سطح', ''));

        while (level < 20) {
            try {
                const buttons = await research.locator('button.build').all();

                if (buttons.length == 1) {
                    const sec = await getSecFromClock(research);

                    await buttons[0].click();

                    console.log(`Upgrading: ${level} -> ${level + 1} (${sec} sec)`);

                    await sleep(sec * 1000 + 500);
                }
                else {
                    await sleep(500);
                    console.log('waiting for Upgrading');
                }
                await page.reload();
                level++;
            }
            catch {
                console.log('Error');
            }
        }
    }

    console.log('Finished Upgrading');
    await page.close();

    return {};
});
