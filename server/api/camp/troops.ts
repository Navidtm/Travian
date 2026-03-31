export default defineEventHandler(async (event) => {
    const army = [];

    for (const id of [35, 27, 29]) {
        const page = await launchTravian(event, `/build.php?id=${id}`);
        const troops = await page.locator('.details').all();

        for (const troop of troops) {
            const name = await troop.locator('img.unit').first().getAttribute('alt') ?? '';
            const maxTrain = await troop.locator('a').last().textContent() ?? '';
            const count = await troop.locator('.furtherInfo').textContent() ?? '0';

            army.push({
                name,
                maxTrain,
                id,
                count: extractNumber(count)
            });
        }
    }

    return army;
});
