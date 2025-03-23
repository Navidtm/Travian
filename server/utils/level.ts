import type { Page } from 'playwright-core';
import { emptyBuilding, farmLevelsId, FarmPath, farmTypes, numOfFarmsItems, villagePath, withoutBuilding } from '../constants/consts';
import type { FarmItem, FarmLevel } from '~~/shared/types/farm';
import { villageAddress } from '~~/shared/constants/village';

export const getFarmLevels = async (page: Page, baseURL: string) => {
    const farmURL = baseURL + FarmPath;

    if (page.url() != farmURL) {
        await page.goto(farmURL);
    }

    const village = page.locator(farmLevelsId).first();

    const items = await village.locator('.level').all();

    const farmLevels = await Promise.all(items.map(v => v.textContent()));

    const levels = farmLevels.map<FarmItem>((v, i) => ({
        level: +`${v}` as FarmLevel,
        id: i + 1 as FarmId,
        type: farmTypes[i + 1] ?? 'clay'
    }));

    return levels;
};

export const getVillageLevels = async (page: Page, baseURL: string) => {
    const VillageURL = baseURL + villagePath;

    if (page.url() != VillageURL) {
        await page.goto(VillageURL);
    }

    const villageLevelsTag = await page.locator(`img[class~="building"]`).all();

    const levelElements = await Promise.all(villageLevelsTag.map(v => v.getAttribute('alt')));

    const isEmpty = (v: string) => v == emptyBuilding;
    const extractNumber = (v: string) => Number(v.match(/[0-9]/g)?.join(''));
    const extractName = (v: string) => v.split('سطح').at(0);

    const levels = levelElements.map(v => v ?? '').map((v, i) => ({
        level: isEmpty(v) ? 0 : extractNumber(v),
        name: isEmpty(v) ? withoutBuilding : extractName(v),
        id: i + numOfFarmsItems + 1,
        isEmpty: isEmpty(v)
    }));

    const elLevels = page.locator('#levels');

    const camp = await elLevels.locator('.l39').first().textContent();
    const wall = await elLevels.locator('.aid40').first().textContent();

    return [
        ...levels,
        {
            level: Number(camp),
            name: 'اردوگاه',
            id: villageAddress['Camp'],
            isEmpty: isNaN(Number(camp))
        },
        {
            level: Number(wall),
            name: 'دیوار',
            id: villageAddress['Wall'],
            isEmpty: isNaN(Number(wall))
        }
    ];
};
