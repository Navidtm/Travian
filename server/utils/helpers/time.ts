import { sum } from "es-toolkit";
import type { Locator, Page } from "playwright-core";

export const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const getSecFromClock = async (locator: Locator | Page) => {
    const clock = await locator.locator('.clocks').first().innerText();

    return sum(clock.split(':')
        .reverse()
        .map((v, i) => +v * Math.pow(60, i))
    );
};
