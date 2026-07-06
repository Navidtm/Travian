export default defineEventHandler(async event => {
	const page = await launchTravian(event, '/dorf1.php');
	await page.locator('a.signLink').first().click();
	await page.waitForEvent('load');

	const userId = page.url().split('=')[1];

	const username = await page.locator('#side_info .wrap').textContent();

	const rows = await page.locator('table#details tr td').all();
	const [rank, breed, faction, numOfVillages, population] = await Promise.all(
		rows.map(row => row.innerHTML().then(v => v.trim())),
	);

	const townList = await page.locator('#villages tbody tr').all();
	const villages = await Promise.all(
		townList.map(async v => {
			const name = await v.locator('.name a').textContent().then(String);
			const isCapital = await v.locator('.mainVillage').count().then(Boolean);
			const inhabitants = await v.locator('.inhabitants').textContent().then(Number);
			const x = await v.locator('.coordinateX').textContent().then(extractNumber);
			const y = await v.locator('.coordinateY').textContent().then(extractNumber);

			return {
				name,
				isCapital,
				inhabitants,
				coordinates: [x, y],
			};
		}),
	);

	await page.close();
	return {
		userId,
		username,
		rank,
		breed,
		faction,
		numOfVillages,
		population,
		villages,
	};
});
