import { test, expect } from '@playwright/test';

function timeToMilliseconds(timeString: string) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

test('visits the app root url', async ({ page }) => {
  await page.context().addCookies([
    {
      name: 'COOKEMAIL',
      value: '123%40gmail.com',
      domain: 'travianwars.ir',
      path: '/',
      secure: true,
    },
    {
      name: 'COOKUSR',
      value: 'navidt',
      domain: 'travianwars.ir',
      path: '/',
      secure: true,
    },
    {
      name: 'PHPSESSID',
      value: '7cbaeb588fb9f555791451e8dc5fcab8',
      domain: 'travianwars.ir',
      path: '/',
      secure: true,
    },
  ]);

  await page.goto(`https://travianwars.ir/ts2/build.php?id=${1}`);
  // for (let i = 3; i <= 18; i++) {
  //   for (let j = 0; j < 6; j++) {
  //     try {
  //       await page.goto(`https://travianwars.ir/ts2/build.php?id=${i}`);
  //       // await page.goto(`https://threedify.org`);

  //       const text = await page.locator('.clocks').textContent();

  //       await page.locator(`button[value="Upgrade level"]`).click();

  //       // eslint-disable-next-line playwright/no-conditional-in-test
  //       if (text) {
  //         // eslint-disable-next-line playwright/no-wait-for-timeout
  //         await page.waitForTimeout(timeToMilliseconds(text) / 2);
  //       }
  //     } catch (error) {}
  //   }
  // }

  expect(2 + 2).toBe(4);
});
