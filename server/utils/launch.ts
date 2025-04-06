import { chromium } from 'playwright-core';
import type { H3Event } from 'h3';

export const launchTravian = async (event: H3Event, path: string) => {
    const id = getHeader(event, 'Token');

    if (!id) {
        throw createError({
            statusCode: 400,
            message: 'Token Header is required'
        });
    }

    const { email, username, domain, baseURL } = useRuntimeConfig(event);

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const cookies = {
        COOKEMAIL: email,
        COOKUSR: username,
        PHPSESSID: id
    };

    await page.context().addCookies(Object.entries(cookies).map(([name, value]) => ({
        name,
        value,
        domain,
        path: '/',
        secure: true
    })));

    await page.goto(baseURL + path);

    const closeBrowser = async () => {
        await browser.close();
    };

    if (page.url().includes('/login')) {
        throw createError({
            statusCode: 401,
            message: 'You Are Not Login'
        });
    }

    return { page, closeBrowser };
};
