export default defineEventHandler(async event => {
	const page = await launchTravian(event, '/build.php?id=33');
	const researches = await page.locator('.research').all();

	console.log(`Upgrading ${researches.length} Troops`);

	for (const research of researches) {
		const title = await getTextLocator(research.locator('.title').first(), '.level');

		let level = parseInt(title.replace('سطح', ''));

		while (level < 20) {
			const buttons = await research.locator('button.build').all();

			if (buttons.length === 1) {
				const sec = await getSecFromClock(research);

				await buttons[0]!.click();

				console.log(`Upgrading: ${level} -> ${level + 1} (${sec} sec)`);

				await sleep(sec * 1000 + 400);
				level++;
			} else {
				await sleep(500);
				console.log('500 ms waiting...');
			}
			await page.reload();
		}
	}

	console.log('Finished Upgrading');
	await page.close();

	return;
});
