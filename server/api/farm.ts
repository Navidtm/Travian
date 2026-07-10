import { farmPath } from '~~/shared/constants/common';

export default defineEventHandler(async event => {
	const page = await launchTravian(event, farmPath);

	const fields = await getFarmFields(page);
	const production = await getFarmProduction(page);
	const troops = await getTroops(page);
	const resourses = await getResourses(page);

	await page.close();

	return {
		fields,
		troops,
		production,
		resourses,
	};
});
