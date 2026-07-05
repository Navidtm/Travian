export default defineEventHandler<{
	query: { resourceHero?: number };
}>(async event => {
	const { resourceHero } = getQuery(event);

	if (resourceHero != undefined) {
		const page = await launchTravian(event, `/hero_inventory.php?product=r${resourceHero}`);
		console.log('Resourse changed!');
		await page.close();
	}

	return;
});
