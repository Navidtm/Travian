import { test, expect, chromium } from '@playwright/test';

// const s = await chromium.connect('');
// const sx = await s.newPage();

// See here how to get started:
// https://playwright.dev/docs/intro

function timeToMilliseconds(timeString: string) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

test('visits the app root url', async ({ page }) => {
  await page.context().addCookies([
    {
      name: 'COOKEMAIL',
      value: 'navidt81%40gmail.com',
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
      value: 'a7b9e3c73ac76e2d87f23e983f9aaf3b',
      domain: 'travianwars.ir',
      path: '/',
      secure: true,
    },
  ]);

  for (let i = 16; i <= 18; i++) {
    for (let j = 0; j < 8; j++) {
      try {
        await page.goto(`https://travianwars.ir/ts1/build.php?id=${i}`);

        const text = await page.locator('.clocks').textContent();
        await page.locator(`button[value="Upgrade level"]`).click();

        // eslint-disable-next-line playwright/no-conditional-in-test
        if (text) {
          // eslint-disable-next-line playwright/no-wait-for-timeout
          await page.waitForTimeout(timeToMilliseconds(text));
        }
      } catch (error) {}
    }
  }

  expect(2 + 2).toBe(4);
});
