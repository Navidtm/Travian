import { webkit } from 'playwright-core';
import { loginBodySchema } from '~~/server/schema/auth/login';
import { loginPath } from '~~/shared/constants/common';

export default defineEventHandler(async event => {
	const { username } = await readValidatedBody(event, loginBodySchema.parse);

	const baseURL = getBaseURL(event);
	const { password, domain } = useRuntimeConfig(event);

	const browser = await webkit.launch();

	try {
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
			throw createError({
				statusCode: 401,
				message: 'Can not login',
			});
		}

		const cookies = await page.context().cookies(`https://${domain}`);

		const token = cookies.find(v => v.name === 'PHPSESSID')?.value;
		if (!token) throw createError({ statusCode: 401, message: 'Session cookie was not returned' });

		setCookie(event, 'token', token, {
			httpOnly: true,
			secure: !import.meta.dev,
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 3,
		});
	} finally {
		await browser.close();
	}
});
