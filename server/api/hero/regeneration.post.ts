export default defineEventHandler(async (event) => {
    const page = await launchTravian(event, '/hero_inventory.php?r=1');
    console.log('Regenerating Hero...');
    await sleep(4000);
    console.log('Regenerated Hero!');
    await page.close();
    return;
});
