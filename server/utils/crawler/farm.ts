import type { Page } from 'playwright-core';
import { farmPath, farmTypes } from '~~/shared/constants/common';
import { troopMap } from '~~/shared/constants/village';
import { Farm } from '~~/shared/types/farm';

const RESOURCES = ['wood', 'clay', 'iron', 'crop', 'population'] as const;
type Resourse = Farm | 'population';

type TroopKey = (typeof troopMap)[keyof typeof troopMap];

type Production = {
	wood: number;
	clay: number;
	iron: number;
	crop: number;
};
export const getFarmProduction = async (page: Page) => {
	const values = await page.locator('#production .num').allTextContents();

	const production = Object.fromEntries(RESOURCES.map((k, i) => [k, Number(values[i])]));
	return production as Production;
};

export const getTroops = async (page: Page) => {
	const troopsEl = await page.locator('#troops tbody tr:has(td.num)').all();

	const entries = (
		await Promise.all(
			troopsEl.map(async row => {
				const attr = await row.locator('img').getAttribute('class');
				const key = attr?.match(/u\w+/)?.[0] as keyof typeof troopMap | undefined;

				if (!key) return null;

				return [troopMap[key], Number(await row.locator('.num').textContent())] as const;
			}),
		)
	).filter((entry): entry is readonly [TroopKey, number] => entry !== null);

	const troops: Partial<Record<TroopKey, number>> = Object.fromEntries(entries);

	return troops;
};

export const getResourses = async (page: Page) => {
	const values = await page.locator('#res .value').allTextContents();

	const resourseList = RESOURCES.map((k, i) => {
		const [value, capacity] = values[i]!.split('/').map(Number) as [number, number];
		return [k, { value, capacity }];
	});

	const resourses = Object.fromEntries(resourseList);
	return resourses as Record<Resourse, { value: number; capacity: number }>;
};

export const getFarmLevels = async (page: Page) => {
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
			const href = await village.getAttribute('href')!;
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
