import type { H3Event } from 'h3';
import { webkit } from 'playwright-core';

export const launchTravian = async (event: H3Event, path: string) => {
	const id = getHeader(event, 'token');

	if (!id) {
		throw createError({
			statusCode: 401,
			message: 'Token Header is required',
		});
	}

	const baseURL = getBaseURL(event);
	const { domain } = useRuntimeConfig(event);

	const browser = await webkit.launch();
	const context = await browser.newContext();
	const page = await context.newPage();

	await page.route('**/*', route => {
		if (['image', 'stylesheet', 'font'].includes(route.request().resourceType())) route.abort();
		else route.continue();
	});

	const cookies = { PHPSESSID: id };

	await page.context().addCookies(
		Object.entries(cookies).map(([name, value]) => ({
			name,
			value,
			domain,
			path: '/',
			secure: true,
		})),
	);

	await page.goto(baseURL + path);

	if (page.url().includes('/login')) {
		throw createError({
			statusCode: 401,
			message: 'You Are Not Login',
		});
	}

	return page;
};
