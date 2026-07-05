export default defineEventHandler(async event => {
	const path = '/build.php?id=28';
	const page = await launchTravian(event, path);

	const buttons = await page.locator('button.build').all();

	console.log('Started Researching');

	for (const _ of buttons) {
		const button = page.locator('button.build').first();
		const name = await page.locator('img.unit').first().getAttribute('alt');

		await button.click();

		console.log(`Researching ${name}`);

		await sleep(1500);
		await page.reload();
	}

	console.log('Finished Researching');
	await page.close();
	return;
});
