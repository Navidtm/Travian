import { villagePath } from '~~/shared/constants/common';
import { BuildingList, BuildingAddress, villageId } from '~~/shared/constants/village';

import { getMaxLevel } from '../utils/utils';

export default defineStreamEventHandler<Building[]>(async event => {
	const baseURL = getBaseURL(event);
	const page = await launchTravian(event, villagePath);

	let buildings = await getBuildings(page);

	const target = 20;

	for (const name of BuildingList) {
		const slot = BuildingAddress[name]!;
		const id = villageId[name];

		let level = buildings.find(v => v.slot === slot)?.currentLevel ?? 0;

		while (level < target) {
			if (level == getMaxLevel(name)) break;

			await page.goto(`${baseURL}/build.php?id=${slot}`);

			if (level === 0) {
				const button = page.locator('button.build').first();

				const attr = (await button.getAttribute('onclick')) ?? '';
				const c = attr.match(/[?&]c=([^&'"]+)/)?.[1];

				await page.goto(`${baseURL}/dorf2.php?a=${id}&id=${slot}&c=${c}`);
				getBuildings(page).then(event.emit);
			} else {
				if (name === 'Embassy') break;

				const button = page.locator('button.build').first();

				const etaSeconds = await getSecFromClock(page);

				await button.click();
				await page.waitForEvent('load');

				buildings = await getBuildings(page);

				const buildingIdx = buildings.findIndex(v => v.name === name);

				buildings[buildingIdx] = {
					etaSeconds,
					currentLevel: level,
					status: 'upgrading',
					targetLevel: 20,
					name,
					maxLevel: getMaxLevel(name),
					id,
					slot,
				};

				event.emit(buildings);

				await sleep(etaSeconds * 1000);
			}

			if (page.url().includes('/dorf2')) {
				level++;
			}
		}
	}

	await page.goto(`${baseURL}/dorf2.php`);
	buildings = await getBuildings(page);

	await page.close();

	return buildings;
});
