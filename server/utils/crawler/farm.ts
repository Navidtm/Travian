import { range } from 'es-toolkit';
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
			(await page.locator('#troops tbody tr').all()).map(async row => {
				const key = (await row.locator('img').getAttribute('class'))!.match(
					/u\w+/,
				)![0] as keyof typeof troopMap;

				return [troopMap[key], Number(await row.locator('.num').textContent())];
			}),
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

	const levels = range(14).map(n => ({
		level: +items[n - 1]!,
		slot: n,
		type: farmTypes[n]!,
	}));

	return levels;
};

export const getVillages = async (page: Page) => {
	const villageList = await page.locator('#villageList ul li a').all();

	const villages = await Promise.all(
		villageList.map(async village => {
			const name = (await village.textContent()) ?? '';
			const link = (await village.getAttribute('href')) ?? '';
			const isActive = await village
				.getAttribute('class')
				.then(v => v == 'active')
				.catch(() => false);
			return { name, link, isActive };
		}),
	);
	return villages;
};
