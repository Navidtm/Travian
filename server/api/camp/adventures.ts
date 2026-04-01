import { calculateSec } from "~~/server/utils/helpers/time";

export default defineEventHandler(async (event) => {
    const page = await launchTravian(event, '/hero_adventure.php');
    const adventuresEl = await page.locator('tbody tr').all();
    const adventures = await Promise.all(adventuresEl.map(async (v) => {
        const moveTime = await v.locator('.moveTime').textContent() ?? '';
        const link = await v.locator('.gotoAdventure.arrow').getAttribute('href') ?? '';
        const difficultyEl = await v.locator('.difficulty').locator('img').getAttribute('class') ?? '';
        const difficulty: 'hard' | 'normal' = difficultyEl == 'adventureDifficulty0' ? 'hard' : 'normal';
        return { moveTime: calculateSec(moveTime), link, difficulty };
    }));

    return adventures.sort((a, b) => a.moveTime - b.moveTime);
});
