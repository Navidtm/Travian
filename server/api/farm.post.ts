import z from 'zod';

export default defineStreamEventHandler<ResourceField[]>(async event => {
	const baseURL = getBaseURL(event);
	const page = await launchTravian(event, '/dorf1.php');

	let fields = await getFarmFields(page);
	const levels = fields.map(v => v.currentLevel);

	const schema = z.object({ target: z.int().optional().default(getBucket(levels)) });
	let { target } = await readValidatedBody(event, schema.parse);

	for (const { id } of fields) {
		await page.goto(`${baseURL}/build.php?id=${id}`);
		let level = await getTextLocator(page, 'h1.titleInHeader span.level').then(extractNumber);

		while (level < target) {
			const sec = await getSecFromClock(page);

			await page.locator('button.build').click();
			await page.waitForEvent('load');

			await sleep(sec * 1000);

			if (page.url().includes('/dorf1')) {
				level++;
				getFarmFields(page).then(event.emit);
				await page.goto(`${baseURL}/build.php?id=${id}`);
			}
		}
	}

	await page.goto(`${baseURL}/dorf1.php`);
	fields = await getFarmFields(page);
	await page.close();

	return fields;
});
