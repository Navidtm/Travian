import type { Page } from 'playwright-core';
import { BuildingPath } from '~~/shared/constants/common';
import { BuildingAddress, buildingMap, villageId } from '~~/shared/constants/village';

export const getBuildings = async (page: Page): Promise<Building[]> => {
	if (!page.url().includes(BuildingPath)) return [];

	const levels = Object.fromEntries(
		await Promise.all(
			(await page.locator('#levels > div').all()).map(async div => {
				let slot = extractNumber((await div.getAttribute('class'))!.match(/\d+/)![0]);
				const level = extractNumber(await div.textContent());
				slot = slot >= 38 ? slot : slot + 18;

				return [slot, level];
			}),
		),
	) as Record<number, number>;

	const buildingsDivs = await page
		.locator('#village_map > img.building, #village_map > img.dx1')
		.all();

	const buildings = await Promise.all(
		buildingsDivs.map(async img => {
			const cls = (await img.getAttribute('class'))!;

			const id = Number(cls.match(/g(\d+)(?=b|\s|$)/)?.[1]);
			if (!id) return [];

			const name = buildingMap[id]!;
			const level = levels[BuildingAddress[name]!] ?? 0;

			return [
				{
					currentLevel: level,
					id,
					name: name,
					maxLevel: getMaxLevel(name),
					slot: BuildingAddress[name]!,
					status: level === getMaxLevel(name) ? 'target-reached' : 'idle',
					targetLevel: getMaxLevel(name),
				} satisfies Building,
			];
		}),
	).then(v => v.flat());

	const count = await page.locator('.aid40').count();
	if (count == 1) {
		const level = await page.locator('.aid40').textContent().then(extractNumber);
		buildings.push({
			currentLevel: level,
			id: villageId['Wall'],
			name: 'Wall',
			status: level === 20 ? 'target-reached' : 'idle',
			maxLevel: 20,
			slot: 40,
			targetLevel: 20,
		});
	}

	return buildings;
};
