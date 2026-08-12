export default defineEventHandler(async event => {
	const page = await launchTravian(event, '/hero_inventory.php');

	const clock = await page
		.locator('.regenerateCosts span.clock')
		.first()
		.textContent()
		.then(String);

	const sec = calculateSec(clock);

	await page.locator('#save').click();

	await sleep(sec * 1000 + 1000);
	await page.close();
	return;
});
