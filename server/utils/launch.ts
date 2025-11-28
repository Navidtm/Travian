import { webkit } from 'playwright-core';
import type { H3Event } from 'h3';

export const launchTravian = async (event: H3Event, path: string) => {
    const id = getCookie(event, 'Authorization');

    if (!id) {
        throw createError({
            statusCode: 400,
            message: 'Token Header is required'
        });
    }

    const { email, username, domain, baseURL } = useRuntimeConfig(event);

    const browser = await webkit.launch();
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

    if (page.url().includes('/login')) {
        throw createError({
            statusCode: 401,
            message: 'You Are Not Login'
        });
    }

    return page;
};
