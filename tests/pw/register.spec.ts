import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/auth/register');
  await page.getByPlaceholder('کد ملی (10 رقم)').click();
  await page.getByPlaceholder('کد ملی (10 رقم)').fill('1970332232');
  await page.getByPlaceholder('شماره موبایل  مثلا:').click();
  await page.getByPlaceholder('شماره موبایل  مثلا:').fill('09332225465');
  await page.getByPlaceholder('کد معرف (اختیاری)').click();
  await page.getByPlaceholder('کد معرف (اختیاری)').fill('12345');
  await page.getByRole('button', { name: 'ادامه' }).click();
  await page.getByPlaceholder('-').first().fill('1');
  await page.getByPlaceholder('-').nth(1).fill('2');
  await page.getByPlaceholder('-').nth(2).fill('3');
  await page.getByPlaceholder('-').nth(3).fill('4');
  await page.getByRole('button', { name: 'تایید' }).click();
  await page.getByPlaceholder('نام کاربری').click();
  await page.getByPlaceholder('نام کاربری').fill('abcd');
  await page.getByLabel('رمز عبور', { exact: true }).click();
  await page.getByLabel('رمز عبور', { exact: true }).click();
  await page.getByLabel('رمز عبور', { exact: true }).fill('abcdefgHIJ1234');
  await page.getByLabel('رمز عبور', { exact: true }).click();
  await page.getByLabel('رمز عبور', { exact: true }).press('Meta+a');
  await page.getByLabel('رمز عبور', { exact: true }).press('Meta+c');
  await page
    .locator('div')
    .filter({ hasText: /^رمز عبور$/ })
    .getByRole('button')
    .click();
  await page
    .locator('div')
    .filter({ hasText: /^رمز عبور$/ })
    .getByRole('button')
    .press('Meta+a');
  await page.getByLabel('رمز عبور', { exact: true }).click();
  await page.getByLabel('رمز عبور', { exact: true }).click();
  await page.getByLabel('رمز عبور', { exact: true }).press('Meta+a');
  await page.getByLabel('رمز عبور', { exact: true }).press('Meta+c');
  await page
    .locator('div')
    .filter({ hasText: /^تکرار رمز عبور$/ })
    .getByRole('button')
    .click();
  await page.getByLabel('تکرار رمز عبور').click();
  await page.getByLabel('تکرار رمز عبور').fill('abcdefgHIJ1234');
  await page.getByRole('button', { name: 'ادامه' }).click();
  await page.getByLabel('رمز عبور', { exact: true }).click();
  await page.getByLabel('رمز عبور', { exact: true }).press('Meta+a');
  await page.getByLabel('رمز عبور', { exact: true }).fill('abcd1234@@');
  await page.getByLabel('رمز عبور', { exact: true }).press('Meta+a');
  await page.getByLabel('رمز عبور', { exact: true }).press('Meta+c');
  await page.getByLabel('تکرار رمز عبور').click();
  await page.getByLabel('تکرار رمز عبور').press('Meta+a');
  await page.getByLabel('تکرار رمز عبور').press('Meta+c');
  await page.getByLabel('تکرار رمز عبور').fill('abcdefgHIJ1234');
  await page
    .locator('div')
    .filter({ hasText: /^رمز عبور$/ })
    .getByRole('button')
    .click();
  await page.getByLabel('رمز عبور', { exact: true }).click();
  await page.getByLabel('رمز عبور', { exact: true }).press('Meta+a');
  await page.getByLabel('رمز عبور', { exact: true }).press('Meta+c');
  await page.getByLabel('رمز عبور', { exact: true }).fill('abcd1234@@');
  await page.getByLabel('تکرار رمز عبور').click();
  await page.getByLabel('تکرار رمز عبور').fill('abcdefgHIJ1234abcd1234@@');
  await page.getByLabel('تکرار رمز عبور').press('Meta+a');
  await page.getByLabel('تکرار رمز عبور').fill('abcd1234@@');
  await page
    .getByRole('main')
    .locator('div')
    .filter({ hasText: 'تعیین رمز عبوررمز عبور باید شامل حداقل 8' })
    .nth(2)
    .click();
  await page.getByRole('button', { name: 'ادامه' }).click();
  await page.getByRole('button', { name: 'analytics' }).click();
});
