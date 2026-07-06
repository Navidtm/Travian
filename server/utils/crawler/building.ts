import type { Page } from 'playwright-core';
import { BuildingPath } from '~~/shared/constants/common';
import { buildingMap } from '~~/shared/constants/village';

export const getBuildings = async (page: Page) => {
	if (!page.url().includes(BuildingPath)) return [];

	const levels = Object.fromEntries(
		await Promise.all(
			(await page.locator('#levels > div').all()).map(async div => {
				const slot = extractNumber((await div.getAttribute('class'))!.match(/\d+/)![0]);
				const level = extractNumber(await div.textContent());

				return [slot, level];
			}),
		),
	) as Record<number, number>;

	const buildingsDivs = await page.locator('#village_map > img.building').all();
	const buildings = await Promise.all(
		buildingsDivs.map(async img => {
			const cls = (await img.getAttribute('class'))!;

			const slot = Number(cls.match(/\bd(\d+)\b/)![1]);
			const type = cls.match(/\bg(\d+)\b/);

			if (!type) return [];

			const building = buildingMap[Number(type[1])]!;

			return [
				{
					name: building,
					slot,
					level: levels[slot] ?? 0,
				},
			];
		}),
	).then(v => v.flat());

	return buildings;
};
