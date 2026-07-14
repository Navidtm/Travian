import { tribeMap } from '~~/shared/constants/army';

export default defineEventHandler(async event => {
	const page = await launchTravian(event, '/dorf1.php');
	await page.locator('a.signLink').first().click();
	await page.waitForEvent('load');

	const userId = page.url().split('=')[1]!;
	const username = await getTextLocator(page, '#side_info .wrap');

	const villageList = await page.locator('#villages tbody tr').all();
	const villageStates = await getVillages(page);

	const villages = await Promise.all(
		villageList.map(async v => {
			const name = await getTextLocator(v, '.name a');
			const isCapital = await v.locator('.mainVillage').count().then(Boolean);
			const population = await getTextLocator(v, '.inhabitants').then(Number);
			const x = await getTextLocator(v, '.coordinateX').then(extractNumber);
			const y = await getTextLocator(v, '.coordinateY').then(extractNumber);
			const villageState = villageStates.find(village => village.name === name)!;

			return {
				...villageState,
				isCapital,
				population,
				coordinates: [x, y],
			} satisfies Village;
		}),
	);

	const rows = await page.locator('table#details tr').all();

	const rank = await getTextLocator(rows[0]!, 'td');
	const breed = await getTextLocator(rows[1]!, 'td');
	const faction = await getTextLocator(rows[2]!, 'td');
	const population = await getTextLocator(rows[4]!, 'td');

	const tribe = tribeMap.get(breed);

	await page.close();

	return {
		userId,
		username,
		rank,
		tribe,
		faction,
		population,
		villages,
	};
});
