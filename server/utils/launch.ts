import { chromium } from 'playwright-core';
import type { H3Event } from 'h3';

export const launchTravian = async (event: H3Event) => {
    const { email, username, id, domain } = useRuntimeConfig(event);

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

    return page;
};
