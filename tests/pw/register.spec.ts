import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/auth/register');
  await page.getByPlaceholder('کد ملی (10 رقم)').click();
  await page.getByPlaceholder('کد ملی (10 رقم)').fill('1742400973');
  await page.getByPlaceholder('کد ملی (10 رقم)').press('Tab');
  await page.getByPlaceholder('شماره موبایل  مثلا:').fill('09331116459');
  await page.getByPlaceholder('شماره موبایل  مثلا:').press('Tab');
  await page.getByPlaceholder('کد معرف (اختیاری)').fill('123456');
  await page.getByRole('button', { name: 'ادامه' }).click();
  await page.getByPlaceholder('-').first().click();
  await page.getByPlaceholder('-').first().fill('1');
  await page.getByPlaceholder('-').nth(1).fill('2');
  await page.getByPlaceholder('-').nth(2).fill('3');
  await page.getByPlaceholder('-').nth(3).fill('4');
  await page.getByRole('button', { name: 'تایید' }).click();
  await page.getByPlaceholder('نام کاربری').click();
  await page.getByPlaceholder('نام کاربری').fill('username');
  await page.getByPlaceholder('نام کاربری').press('Tab');
  await page.getByLabel('رمز عبور', { exact: true }).fill('password123@@');
  await page.getByLabel('رمز عبور', { exact: true }).press('Tab');
  await page
    .locator('div')
    .filter({ hasText: /^رمز عبور$/ })
    .getByRole('button')
    .press('Tab');
  await page.getByLabel('تکرار رمز عبور').fill('password123@@');
  await page.getByRole('button', { name: 'ادامه' }).click();
});
