import { BuildingPath } from '~~/shared/constants/common';

export default defineEventHandler(async event => {
	const page = await launchTravian(event, BuildingPath);

	const levels = await getBuildings(page);

	await page.close();

	return levels;
});
