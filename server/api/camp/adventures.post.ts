export default defineEventHandler<{
    query: { link: string };
}>(async (event) => {
    const { link } = getQuery(event);
    const page = await launchTravian(event, `/${link}`);

    const button = page.locator('button#btn_ok').first();
    await button.click();

    console.log('Started Adventure!');
    await sleep(1000);

    return;
});
