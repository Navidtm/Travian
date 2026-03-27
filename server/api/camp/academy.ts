export default defineEventHandler(async (event) => {
    const page = await launchTravian(event, '/build.php?id=28');

    const images = await page.locator('img.unit').all();
    const titles = await Promise.all(
        images.map(async v => await v.getAttribute('alt') ?? '')
    );

    await page.close();
    return titles;
});
