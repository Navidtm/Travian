import { ResourceField } from '~~/shared/types';

export default defineStreamEventHandler<ResourceField[]>(async event => {
	const baseURL = getBaseURL(event);
	const page = await launchTravian(event, '/dorf1.php');

	let fields = await getFarmFields(page);

	while (true) {
		const minLevel = Math.min(...fields.map(field => field.currentLevel));
		if (minLevel == 20) break;

		const { id } = fields.find(f => f.currentLevel === minLevel)!;

		await page.goto(`${baseURL}/build.php?id=${id}`);

		const sec = await getSecFromClock(page);

		await page.locator('button.build').click();

		await sleep(sec * 1000);
		await page.reload();

		if (page.url().includes('/dorf1')) {
			fields = await getFarmFields(page);
			event.emit(fields);
		}
	}

	await page.goto(`${baseURL}/dorf1.php`);
	fields = await getFarmFields(page);
	await page.close();

	return fields;
});
