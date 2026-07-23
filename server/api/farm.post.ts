import { farmUpgradeBodySchema } from '~~/server/schema/farm.post';

export default defineStreamEventHandler<ResourceField[]>(async event => {
	const baseURL = getBaseURL(event);
	const page = await launchTravian(event, '/dorf1.php');

	let fields = await getFarmFields(page);
	const levels = fields.map(v => v.currentLevel);

	let { target = getBucket(levels) } = await readValidatedBody(event, farmUpgradeBodySchema.parse);

	for (const { id, currentLevel } of fields) {
		let level = currentLevel;

		while (level < target) {
			await page.goto(`${baseURL}/build.php?id=${id}`);

			const sec = await getSecFromClock(page);

			await page.locator('button.build').click();
			await page.waitForEvent('load');

			await sleep(sec * 1000);
			await page.reload();

			if (page.url().includes('/dorf1')) {
				level++;
				getFarmFields(page).then(event.emit);
			}
		}
	}

	await page.goto(`${baseURL}/dorf1.php`);
	fields = await getFarmFields(page);
	await page.close();

	return fields;
});
