export default defineEventHandler(async event => {
	const page = await launchTravian(event, '/build.php?id=33');

	const researches = await page.locator('.research').all();

	const x = [];
	for (const research of researches) {
		const title = research.locator('.title').first();
		const name = getFirstTextLocator(title, 'a');
		const level = await getTextLocator(title, '.level');

		x.push({
			name,
			level: parseInt(level.replace('سطح', '')),
		});
	}
	await page.close();
	return x;
});
