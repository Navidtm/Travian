import type { Page } from 'playwright-core';
import { farmPath, farmLevelsId, farmTypes, villagePath } from '~~/shared/constants/common';

export const getFarmLevels = async (page: Page) => {
	if (!page.url().includes(farmPath)) {
		return [];
	}

	const items = await page.locator(farmLevelsId).locator('.level').all();

	const farmLevels = await Promise.all(items.map(v => v.textContent()));

	const levels = farmLevels.map<FarmItem>((v, i) => ({
		level: +`${v}` as FarmLevel,
		id: (i + 1) as FarmId,
		type: farmTypes[i + 1] ?? 'clay',
	}));

	return levels;
};

export const getVillageLevels = async (page: Page) => {
	if (!page.url().includes(villagePath)) {
		return [];
	}

	const villageNames = await page.locator(`img.building`).all();

	const names = await Promise.all(
		villageNames.map(
			async v =>
				await v
					.getAttribute('alt')
					.then(String)
					.then(v => (/[0-9]/.test(v) ? v.split('سطح').at(0) : '')),
		),
	).then(v => v.filter(Boolean));

	const villageLevels = await page.locator('#levels').locator('div').all();

	const levels = await Promise.all(
		villageLevels.map(async (item, i) => {
			const level = await item.textContent().then(Number);
			const id = await item
				.getAttribute('class')
				.then(extractNumber)
				.then(id => (id < 39 ? id + 18 : id));

			names.push('اردوگاه', 'دیوار');

			return { level, id, name: names[i] };
		}),
	);

	return levels;
};
