export default defineEventHandler(async (event) => {
    await launchTravian(event, '/hero_inventory.php?r=1');
    console.log('Regenerating Hero...');
    await sleep(4000);
    console.log('Regenerated Hero!');
    return;
});
