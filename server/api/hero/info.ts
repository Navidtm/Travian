export default defineEventHandler(async event => {
	const page = await launchTravian(event, '/hero_inventory.php');

	const isAlive = await page.locator('.regeneratebtn').isVisible();

	const power = isAlive ? await getTextLocator(page, '.health span').then(Number) : 0;

	const resources = await page.locator('#setResource').locator('input').all();

	const i = (await Promise.all(resources.map(async v => await v.isChecked()))).indexOf(true);
	const resourceHero =
		(await resources[i]?.getAttribute('id').then(v => Number(v?.replace('resourceHero', '')))) ?? 0;

	const experience = await getTextLocator(page, '.experience .power').then(extractNumber);

	await page.locator('.attribute.experience.tooltip').hover();

	const experienceRemaining = await getFirstTextLocator(page, '.elementText font').then(
		extractNumber,
	);

	const experienceForNextLevel = experienceRemaining + experience;
	const experienceProgress = experience / experienceForNextLevel;

	const level = await getFirstTextLocator(page, '.level .power').then(extractNumber);
	const speed = await getFirstTextLocator(page, '.level .speed span').then(extractNumber);

	const { baseURL } = useRuntimeConfig(event);
	const heroImage = await page
		.locator('#heroImage')
		.getAttribute('src')
		.then(v => baseURL + '/' + v);

	await page.close();

	return {
		name: 'Navid',
		experienceRemaining,
		experienceForNextLevel,
		experienceProgress,
		experience,
		level,
		speed,
		isAlive,
		heroImage,
		power,
		resourceBonusPercent: resourceHero,
	} satisfies Hero;
});
