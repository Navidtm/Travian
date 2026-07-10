export default defineEventHandler(async event => {
	const page = await launchTravian(event, '/build.php?id=33');

	const researches = await page.locator('.research').all();

	const x = [];
	for (const research of researches) {
		const title = research.locator('.title').first();
		const links = await title.locator('a').all();
		const name = (await links[1]!.textContent()) ?? '';
		const level = (await title.locator('.level').textContent()) ?? '';

		x.push({
			name,
			level: parseInt(level.replace('سطح', '')),
		});
	}
	return x;
});
