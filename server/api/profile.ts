export default defineEventHandler(async event => {
	const page = await launchTravian(event, '/dorf1.php');
	await page.locator('a.signLink').first().click();
	await page.waitForEvent('load');

	const userId = page.url().split('=')[1];

	const username = await page.locator('#side_info .wrap').textContent();

	const rows = await page.locator('table#details tr td').all();
	const [rank, breed, faction, numOfTowns, population] = await Promise.all(
		rows.map(v => v.innerHTML().then(v => v.trim())),
	);

	const { baseURL } = useRuntimeConfig();
	const hero = await page
		.locator('#content img.heroImage')
		.getAttribute('src')
		.then(v => `${baseURL}/${v}`);

	const townList = await page.locator('#villages tbody tr').all();
	const towns = await Promise.all(
		townList.map(async v => {
			const name = await v.locator('.name a').textContent().then(String);
			const isMain = await v.locator('.mainVillage').count().then(Boolean);
			const population = await v.locator('.inhabitants').textContent().then(Number);
			const x = await v.locator('.coordinateX').textContent().then(extractNumber);
			const y = await v.locator('.coordinateY').textContent().then(extractNumber);

			return {
				name,
				isMain,
				population,
				coords: [x, y],
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
		numOfTowns,
		population,
		towns,
		hero,
	};
});
