import { test, expect } from '@playwright/test'
const LOCALHOST_URL = 'http://localhost:5173/'

test.beforeEach(async ({ page }) => {
  await page.goto(LOCALHOST_URL);
  await page.getByLabel('Your email').fill('prueba@gmail.com');
  await page.getByLabel('Your password').fill('1')
  await page.getByRole('button', { name: 'Submit' }).click();
  const table = page.getByRole('table')
  await expect(table).toBeVisible()
  await expect(page.getByText('New Product')).toBeVisible();
});

test('login well', async ({ page }) => {
  await page.goto(LOCALHOST_URL);
  await expect(page.getByText('New Product')).toBeVisible();
});

test('log out', async ({ page }) => {
  await page.goto(LOCALHOST_URL);
  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(page.getByLabel('Your email')).toBeVisible();
});

test('New product', async ({ page }) => {
  await page.goto(LOCALHOST_URL);
  await page.getByRole('button', { name: 'New Product' }).click();
  await page.getByLabel('Product ID').fill('0');
  await page.getByLabel('Description').fill('prueba');
  await page.getByLabel('Select Suppliers').selectOption('None');
  await page.getByLabel('Select Price Reduction').selectOption('None');
  await page.getByRole('button', { name: 'New Product' }).click();
  await expect(page.getByRole('table')).toBeVisible();
});