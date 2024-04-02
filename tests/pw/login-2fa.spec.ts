import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/auth/login?scenario=has2fa');
  await page.getByPlaceholder('نام کاربری').click();
  await page.getByPlaceholder('نام کاربری').press('Meta+a');
  await page.getByPlaceholder('نام کاربری').fill('username');
  await page.getByPlaceholder('نام کاربری').press('Tab');
  await page.getByPlaceholder('رمز عبور').fill('password');
  await page.getByRole('button', { name: 'ورود' }).click();
  await page.getByPlaceholder('-').first().fill('1');
  await page.getByPlaceholder('-').nth(1).fill('2');
  await page.getByPlaceholder('-').nth(2).fill('3');
  await page.getByPlaceholder('-').nth(3).fill('4');
  await page.getByRole('button', { name: 'تایید' }).click();
  await page.getByRole('button', { name: 'آگاه آگاه logo' }).click();
});
