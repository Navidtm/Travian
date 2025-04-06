import { chromium } from 'playwright-core';
import { loginPath } from '~~/server/constants/consts';

export default defineEventHandler(async (event) => {
    const { username, baseURL, password, domain } = useRuntimeConfig(event);

    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(baseURL + loginPath);

    await page.fill('input[name=user]', username);
    await page.fill('input[name=pw]', password);

    await page.waitForURL(/dorf1/);

    const cookies = await page.context().cookies(`https://${domain}`);

    const token = cookies.find(v => v.name == 'PHPSESSID')?.value ?? '';

    page.close();

    return {
        token
    };
});
