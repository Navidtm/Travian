import { villagePath } from '~~/shared/constants/common';
import { BuildingList, max5Levels, villageAddress, villageId } from '~~/shared/constants/village';

export default defineEventHandler(async event => {
	const { baseURL } = useRuntimeConfig(event);
	const page = await launchTravian(event, villagePath);

	const levels = await getVillageLevels(page);

	const toLevel = 20;

	for (const name of BuildingList) {
		const id = villageAddress[name];

		let currentLevel = levels.find(v => v.id === id)?.level ?? 0;
		const template = `${name}(id: ${id})`;
		console.log(`Started upgrading ${template} from ${currentLevel} to ${toLevel}`);

		while (currentLevel < toLevel) {
			if (max5Levels.includes(name) && currentLevel == 5) break;

			await page.goto(`${baseURL}/build.php?id=${id}`);

			if (currentLevel == 0) {
				const buttons = await page.locator('button.build').all();

				for (const button of buttons) {
					const onclickAttr = await button.getAttribute('onclick');

					const id = onclickAttr?.split(/'/)[1].match(/a=(\d+)/)?.[1] ?? 0;

					if (villageId[name] == id) {
						console.log(`Building ${template}`);
						await button.click();
						break;
					}
				}
			} else {
				if (name == 'Embassy') break;

				const button = page.locator('button.build').first();
				const sec = await getSecFromClock(page);

				await button.click();
				await sleep(sec * 1000);

				console.log(`Upgrading ${name} to ${currentLevel + 1}(${sec} sec)`);
			}

			if (page.url().includes('/dorf2')) {
				currentLevel++;
			}
		}
	}

	console.log('Finished upgrading');
	await page.close();

	return {};
});
