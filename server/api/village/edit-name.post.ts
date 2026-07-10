export default defineEventHandler(async event => {
	const { name } = await readBody(event);
	const page = await launchTravian(event, '/dorf1.php');
	await page.locator('#villageNameField').dblclick();
	await page.locator('#villageNameInput').fill(name);
	await page.locator('#dialogButtonOk').click();
	await page.close();
	return;
});
