export default defineEventHandler(async event => {
	const page = await launchTravian(event, '/dorf1.php');
	const townList = await page.locator('#villageList ul li a').all();

	const towns = await Promise.all(
		townList.map(async v => {
			const name = (await v.textContent()) ?? '';
			const link = (await v.getAttribute('href')) ?? '';
			const isActive = await v
				.getAttribute('class')
				.then(v => v == 'active')
				.catch(() => false);
			return { name, link, isActive };
		}),
	);

	await page.close();
	return towns;
});
