import { chromium } from 'playwright-core';
import type { H3Event } from 'h3';

export const launchTravian = async (event: H3Event, path: string) => {
    const id = getHeader(event, 'Token');

    if (!id) {
        throw createError({
            statusCode: 401,
            message: 'You Are Not Login'
        });
    }

    const { email, username, domain, baseURL } = useRuntimeConfig(event);

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.context().addCookies([
        {
            name: 'COOKEMAIL',
            value: email,
            domain,
            path: '/',
            secure: true
        },
        {
            name: 'COOKUSR',
            value: username,
            domain,
            path: '/',
            secure: true
        },
        {
            name: 'PHPSESSID',
            value: id,
            domain,
            path: '/',
            secure: true
        }
    ]);

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
