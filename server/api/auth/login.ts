import { webkit } from 'playwright-core';
import { loginPath } from '~~/shared/constants/common';

export default defineEventHandler(async event => {
	const { username } = await readBody(event);

	const baseURL = getBaseURL(event);
	const { password, domain } = useRuntimeConfig(event);

	const browser = await webkit.launch();

	const context = await browser.newContext();
	const page = await context.newPage();

	await page.route('**/*', route => {
		if (['stylesheet', 'font'].includes(route.request().resourceType())) route.abort();
		else route.continue();
	});

	await page.goto(baseURL + loginPath);

	await page.fill('input[name=user]', username);
	await page.fill('input[name=pw]', password);

	const image = await page.locator('table img').screenshot();
	const code = await recognizeNumber(image);

	await page.fill('input[name=captcha]', String(code));

	await page.locator('.button-container').first().click();

	await page.waitForEvent('load');

	if (page.url().includes('/login')) {
		page.close();
		createError({
			statusCode: 401,
			message: 'Can not login',
		});
	}

	const cookies = await page.context().cookies(`https://${domain}`);

	const token = cookies.find(v => v.name === 'PHPSESSID')?.value ?? '';

	page.close();

	return { token };
});
