export default defineEventHandler(async event => {
	const army = [];
	const page = await launchTravian(event, `/dorf2.php`);
	const baseURL = getBaseURL(event);

	const levels = await getBuildings(page);
	const troopsIdList = [35, 27, 29].filter(id => levels.map(v => v.slot).includes(id));

	for (const id of troopsIdList) {
		await page.goto(`${baseURL}/build.php?id=${id}`);
		const troops = await page.locator('.details').all();

		for (const troop of troops) {
			const name = (await troop.locator('img.unit').first().getAttribute('alt')) ?? '';
			const maxTrain = (await troop.locator('a').last().textContent()) ?? '';
			const count = await getTextLocator(troop, '.furtherInfo').then(extractNumber);

			army.push({
				name,
				maxTrain,
				id,
				count,
			});
		}
	}

	await page.close();
	return army;
});
