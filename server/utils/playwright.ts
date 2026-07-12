import { Locator, Page } from 'playwright-core';

export const getTextLocator = async (el: Locator | Page, selector: string) =>
	(await el.locator(selector).textContent().then(String)).trim();

export const getFirstTextLocator = async (el: Locator | Page, selector: string) =>
	(await el.locator(selector).first().textContent().then(String)).trim();
