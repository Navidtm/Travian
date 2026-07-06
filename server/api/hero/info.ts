export default defineEventHandler(async event => {
	const page = await launchTravian(event, '/hero_inventory.php');

	const buttons = await page.locator('.regeneratebtn').count();
	const isDead = buttons == 1;

	const power = !isDead
		? await page.locator('.health').locator('span').textContent().then(Number)
		: 0;

	const resources = await page.locator('#setResource').locator('input').all();

	const i = (await Promise.all(resources.map(async v => await v.isChecked()))).indexOf(true);
	const resourceHero =
		(await resources[i]?.getAttribute('id').then(v => Number(v?.replace('resourceHero', '')))) ?? 0;

	const experience =
		(await page.locator('.experience').locator('.power').textContent().then(Number)) ?? 0;

	await page.locator('.attribute.experience.tooltip').hover();

	const experienceRemaining = await page
		.locator('.text.elementText font')
		.first()
		.textContent()
		.then(Number);

	const experienceForNextLevel = experienceRemaining + experience;
	const experienceProgress = experience / experienceForNextLevel;

	const level =
		(await page.locator('.level').locator('.power').first().textContent().then(Number)) ?? 0;
	const speed =
		(await page
			.locator('.level')
			.locator('.speed')
			.locator('span')
			.textContent()
			.then(extractNumber)) ?? 0;

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
		isAlive: !isDead,
		heroImage,
		power,
		resourceBonusPercent: resourceHero,
	} satisfies Hero;
});
