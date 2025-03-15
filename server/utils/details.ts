import type { Page } from 'playwright-core';
import { FarmPath } from '../constants/consts';

export const getFarmProducts = async (page: Page, baseURL: string) => {
    const farmURL = baseURL + FarmPath;

    if (page.url() != farmURL) {
        await page.goto(farmURL);
    }

    const detailsTable = page.locator('#production');
    const titlesLocator = await detailsTable.locator('.res').all();
    const amountsLocator = await detailsTable.locator('.num').all();

    const titles = await Promise.all(titlesLocator.map(v => v.innerText()));
    const amounts = await Promise.all(amountsLocator.map(v => v.innerText()));

    const products = Array.from({ length: 4 }).map((_, i) => ({
        name: titles[i].replace(':', ''),
        amount: +amounts[i]
    }));

    return products;
};
