import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.goto('http://localhost:8080/dashboard');
  await page.goto('http://localhost:8080/auth/login?returnTo=%2Fdashboard');
  await page.getByPlaceholder('نام کاربری').click();
  await page.getByPlaceholder('نام کاربری').press('Meta+a');
  await page.getByPlaceholder('نام کاربری').fill('username');
  await page.getByPlaceholder('نام کاربری').press('Tab');
  await page.getByPlaceholder('رمز عبور').fill('password');
  await page.getByRole('button', { name: 'ورود' }).click();
  await page.getByRole('button', { name: 'آگاه آگاه logo' }).click();
});
