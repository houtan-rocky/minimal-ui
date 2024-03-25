import test from '@playwright/test';

test.fixme('test', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await page.waitForSelector('text=Hello Vite + React!');
});
