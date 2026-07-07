import type { Page } from 'playwright-core';
import { farmPath, farmTypes } from '~~/shared/constants/common';
import { RESOURCES } from '~~/shared/constants/farm';
import { troopMap } from '~~/shared/constants/village';

type Troop = (typeof troopMap)[keyof typeof troopMap];

export const getFarmProducts = async (page: Page) => {
	if (!page.url().includes(farmPath)) return [];

	const values = await page.locator('#production .num').allTextContents();

	return Object.fromEntries(RESOURCES.map((k, i) => [k, Number(values[i])]));
};

export const getTroops = async (page: Page) => {
	if (!page.url().includes(farmPath)) return [];

	const troops = Object.fromEntries(
		await Promise.all(
			(await page.locator('#troops tbody tr:has(td.num)').all()).map(async row => {
				const attr = await row.locator('img').getAttribute('class');
				const key = attr?.match(/u\w+/)![0] as keyof typeof troopMap | null;
				return key ? [troopMap[key], Number(await row.locator('.num').textContent())] : [];
			}) ?? [],
		),
	) as Partial<Record<Troop, number>>;

	return troops;
};

export const getResourses = async (page: Page) => {
	if (!page.url().includes(farmPath)) return [];

	const values = await page.locator('#res .value').allTextContents();

	return Object.fromEntries(
		[RESOURCES, 'population'].map((k, i) => {
			const [value, maxValue] = values[i]!.split('/').map(Number);
			return [k, { value, maxValue }];
		}),
	) as Record<'wood' | 'clay' | 'iron' | 'crop', number>;
};

export const getFarms = async (page: Page) => {
	if (!page.url().includes(farmPath)) return [];

	const items = await page.locator('#village_map .level').allTextContents();

	const levels = items.map((level, n) => ({
		level: +level,
		slot: n + 1,
		type: farmTypes[n + 1]!,
	}));

	return levels;
};

export const getVillages = async (page: Page) => {
	const villageList = await page.locator('#villageList ul li a').all();

	const villages = await Promise.all(
		villageList.map(async village => {
			const name = (await village.textContent()) ?? '';
			const href = await page.locator('#currentVillage').getAttribute('href');
			const isActive = await village
				.getAttribute('class')
				.then(v => v == 'active')
				.catch(() => false);

			const id = Number(href?.match(/newdid=(\d+)/)?.[1] ?? -1);
			return { name, id, isActive };
		}),
	);
	return villages;
};
