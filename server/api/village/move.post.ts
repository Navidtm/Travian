import { villageMoveBodySchema } from '~~/server/schema/village/move.post';

export default defineEventHandler(async event => {
	const { id } = await readValidatedBody(event, villageMoveBodySchema.parse);
	const page = await launchTravian(event, `/dorf1.php?newdid=${id}`);
	await page.close();
	return;
});
