export default defineEventHandler(async event => {
	const page = await launchTravian(event, '/dorf1.php');
	await page.locator('a.signLink').first().click();
	await page.waitForEvent('load');

	const userId = page.url().split('=')[1];

	const townList = await page.locator('#villages tbody tr').all();

	const villageStates = await getVillages(page);
	const villages = await Promise.all(
		townList.map(async v => {
			const name = await v.locator('.name a').textContent().then(String);
			const isCapital = await v.locator('.mainVillage').count().then(Boolean);
			const population = await v.locator('.inhabitants').textContent().then(Number);
			const x = await v.locator('.coordinateX').textContent().then(extractNumber);
			const y = await v.locator('.coordinateY').textContent().then(extractNumber);

			return {
				name,
				isCapital,
				population,
				coordinates: [x, y],
			};
		}),
	);

	const rows = await page.locator('table#details tr td').all();
	const [rank, breed, faction, numOfVillages, population] = (await Promise.all(
		rows.map(row => row.innerHTML().then(v => String(v).trim())),
	)) as [string, string, string, string, string];

	const stateMap = new Map(villageStates.map(v => [v.name, v]));

	const merged = villages.map<Village>(
		village =>
			({
				...village,
				...stateMap.get(village.name),
			}) as unknown as Village,
	);

	const username = await page
		.locator('#side_info .wrap')
		.textContent()
		.then(v => String(v).trim());

	await page.close();

	return {
		userId,
		username,
		rank,
		breed,
		faction,
		numOfVillages,
		population,
		villages: merged,
	};
});
