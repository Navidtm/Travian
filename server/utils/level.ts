import type { Page } from 'playwright-core';
import { emptyBuilding, farmLevelsId, FarmPath, numOfFarmsItems, villagePath, withoutBuilding } from '../constants/consts';

export const getFarmLevels = async (page: Page, baseURL: string) => {
    const farmURL = baseURL + FarmPath;

    if (page.url() != farmURL) {
        await page.goto(farmURL);
    }

    const village = page.locator(farmLevelsId).first();

    const items = await village.locator('.level').all();

    const levels = await Promise.all(items.map(v => v.textContent()));

    return {
        levels: levels.map(Number)
    };
};

export const getVillageLevels = async (page: Page, baseURL: string) => {
    const VillageURL = baseURL + villagePath;

    if (page.url() != VillageURL) {
        await page.goto(VillageURL);
    }

    const villageLevelsTag = await page.locator(`img[class~="building"]`).all();

    const levelElements = await Promise.all(villageLevelsTag.map(v => v.getAttribute('alt')));

    const isEmpty = (v: string) => v == emptyBuilding;
    const extractNumber = (v: string) => v.match(/[0-9]/g)?.join('');
    const extractName = (v: string) => v.split('سطح').at(0);

    const levels = levelElements.map(v => v ?? '').map((v, i) => ({
        level: isEmpty(v) ? 0 : extractNumber(v),
        name: isEmpty(v) ? withoutBuilding : extractName(v),
        id: i + numOfFarmsItems + 1
    }));

    return { levels };
};
