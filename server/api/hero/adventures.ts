const locationMap = new Map<string, AdventureLocation>([
	['جنگل', 'Forest'],
	['دشت', 'Plain'],
	['دريا', 'Sea'],
	['کوهستان', 'Mountain'],
]);

export default defineEventHandler(async event => {
	const page = await launchTravian(event, '/hero_adventure.php');
	const adventuresEls = await page.locator('tbody tr').all();

	const adventures: Adventure[] = await Promise.all(
		adventuresEls.map(async row => {
			const href = await row.locator('.gotoAdventure.arrow').getAttribute('href');
			const id = href!.match(/id=(\d+)/)![1] ?? '';

			const coordinates = await parseCoordinates(row);

			const locationTxt = await getTextLocator(row, '.location');
			const location = locationMap.get(locationTxt)!;

			const moveTime = await getTextLocator(row, '.moveTime');

			const difficultyClass = await row.locator('.difficulty img').getAttribute('class');

			return {
				id,
				location,
				coordinates,
				durationSeconds: calculateSec(moveTime),
				difficulty: difficultyClass?.includes('adventureDifficulty0') ? 'hard' : 'medium',
			} satisfies Adventure;
		}),
	);

	await page.close();
	return adventures.sort((a, b) => a.durationSeconds - b.durationSeconds);
});
