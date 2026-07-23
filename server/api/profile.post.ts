import { profileBodySchema } from '~~/server/schema/profile.post';

export default defineEventHandler<{
	body: {
		townNames: string[];
	};
}>(async event => {
	const { townNames } = await readValidatedBody(event, profileBodySchema.parse);
	const page = await launchTravian(event, '/spieler.php?s=1');

	const textarea1 = page.locator('textarea[name=be1]');
	const textareaValue = await textarea1.inputValue();
	if (!textareaValue.includes('[#0]')) {
		await textarea1.clear();
		await textarea1.fill('[#0]');
	}

	const inputs = await page.locator('#villages tbody tr').all();
	await Promise.all(
		inputs.map(async (v, i) => {
			const input = v.locator('input').first();
			await input.clear();

			await input.fill(townNames[i]!);
			return;
		}),
	);

	await page.locator('button#btn_ok').click();

	await page.close();
	return;
});
