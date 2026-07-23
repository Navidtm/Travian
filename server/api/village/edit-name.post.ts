import { villageNameBodySchema } from '~~/server/schema/village/edit-name.post';

export default defineEventHandler(async event => {
	const { name } = await readValidatedBody(event, villageNameBodySchema.parse);
	const page = await launchTravian(event, '/dorf1.php');
	await page.locator('#villageNameField').dblclick();
	await page.locator('#villageNameInput').fill(name);
	await page.locator('#dialogButtonOk').click();
	await sleep(1000);
	await page.close();
	return { success: true };
});
