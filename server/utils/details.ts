import type { Page } from 'playwright-core';
import { FarmPath } from '../constants/consts';

export const getFarmProducts = async (page: Page) => {
    if (!page.url().includes(FarmPath)) {
        return [];
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

export const getTroops = async (page: Page) => {
    if (!page.url().includes(FarmPath)) {
        return [];
    }

    const detailsTable = page.locator('#troops');

    const numbersLocator = await detailsTable.locator('.num').all();
    const titlesLocator = await detailsTable.locator('.un').all();

    const titles = await Promise.all(titlesLocator.map(v => v.innerText()));
    const numbers = await Promise.all(numbersLocator.map(v => v.innerText()));

    const troops = Array.from({ length: titles.length }).map((_, i) => ({
        name: titles[i],
        amount: +numbers[i]
    }));

    return troops;
};

export const getResourses = async (page: Page) => {
    if (!page.url().includes(FarmPath)) {
        return [];
    }

    const resoursesLocator = page.locator('#res');

    const resourseOrders: Resourse[] = ['wood', 'clay', 'iron', 'wheat', 'population'];

    const resourseText = await Promise.all(resourseOrders.map((_, i) => resoursesLocator.locator(`#l${i + 1}`).innerText()));

    const resourses = resourseText.map((v, i) => ({
        name: resourseOrders[i] ?? 'clay',
        amount: +v.split('/')[0],
        max: +v.split('/')[1]
    }));

    return resourses;
};
