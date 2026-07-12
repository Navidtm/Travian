export default defineEventHandler<{ query: { id: string } }>(async event => {
	const { id } = getQuery(event);
	const page = await launchTravian(event, `/a2b.php?id=${id}&h=1`);

	const button = page.locator('button#btn_ok').first();
	await button.click();

	await page.close();
	return;
});
