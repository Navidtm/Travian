import { chromium, Page } from 'playwright-core';
import { loginBodySchema } from '~~/server/schema/auth/login';

import { type H3Event } from '#imports';

const login = async (event: H3Event, page: Page) => {
	const { username } = await readValidatedBody(event, loginBodySchema.parse);

	const baseURL = getBaseURL(event);
	const { password, domain } = useRuntimeConfig(event);

	await page.goto(baseURL + '/login.php');

	await page.fill('input[name=user]', username);
	await page.fill('input[name=pw]', password);

	const image = await page.locator('table img').screenshot();
	const code = await recognizeNumber(image);

	await page.fill('input[name=captcha]', String(code));

	await page.locator('button#s1').click();

	await page.waitForEvent('load');

	if (page.url().includes('/login')) {
		throw createError({
			statusCode: 401,
			message: 'Can not login',
		});
	}

	const cookies = await page.context().cookies(`https://${domain}`);

	const token = cookies.find(v => v.name === 'PHPSESSID')?.value;
	if (!token) throw createError({ statusCode: 401, message: 'Session cookie was not returned' });

	setCookie(event, 'token', token, {
		secure: !import.meta.dev,
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 3,
	});
};

const signup = async (event: H3Event, page: Page) => {
	const { username } = await readValidatedBody(event, loginBodySchema.parse);

	const baseURL = getBaseURL(event);
	const { password } = useRuntimeConfig(event);

	await page.goto(baseURL + '/anmelden.php');

	await page.fill('input[name=name]', username);
	await page.fill('input[name=email]', username + '@gmail.com');
	await page.fill('input[name=pw]', password);

	await page.check('input#tribeTeutons');
	await page.check('input#agb');

	const image = await page.locator('center img').screenshot();
	const code = await recognizeNumber(image);

	await page.fill('input[name=captcha]', String(code));

	await page.locator('button#btn_signup').click();

	await page.waitForEvent('load');
};

export default defineEventHandler(async event => {
	const browser = await chromium.launch();

	try {
		const context = await browser.newContext();
		const page = await context.newPage();

		await page.route('**/*', route => {
			if (['stylesheet', 'font'].includes(route.request().resourceType())) route.abort();
			else route.continue();
		});

		try {
			await login(event, page);
		} catch {
			await signup(event, page);
			await login(event, page);
		}
	} finally {
		await browser.close();
	}
});
