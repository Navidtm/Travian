import { farmPath } from '~~/shared/constants/common';

export default defineEventHandler(async event => {
	const page = await launchTravian(event, farmPath);

	const levels = await getFarms(page);
	const products = await getFarmProducts(page);
	const troops = await getTroops(page);
	const resourses = await getResourses(page);

	await page.close();

	return {
		levels,
		troops,
		products,
		resourses,
		meta: {
			url: page.url(),
			date: Date.now(),
		},
	};
});
