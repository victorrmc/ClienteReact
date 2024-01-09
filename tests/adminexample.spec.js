import { test, expect } from '@playwright/test'
const LOCALHOST_URL = 'http://localhost:5173/'

test.beforeEach(async ({ page }) => {
    await page.goto(LOCALHOST_URL);
    await page.getByLabel('Your email').fill('admin@gmail.com');
    await page.getByLabel('Your password').fill('1')
    await page.getByRole('button', { name: 'Submit' }).click();
    const table = page.getByRole('table')
    await expect(table).toBeVisible()
    await expect(page.getByText('New Product')).toBeVisible();
});

test('login well', async ({ page }) => {
    await page.goto(LOCALHOST_URL);
    await expect(page.getByText('User Table')).toBeVisible();
});

test('log out', async ({ page }) => {
    await page.goto(LOCALHOST_URL);
    await page.getByRole('button', { name: 'Log out' }).click();
    await expect(page.getByLabel('Your email')).toBeVisible();
});


test('New product, delete product', async ({ page }) => {
    //Create
    await page.goto(LOCALHOST_URL);
    await page.getByRole('button', { name: 'New Product' }).click();
    await page.getByLabel('Product ID').fill('0');
    await page.getByLabel('Description').fill('prueba');
    await page.getByLabel('Select Suppliers').selectOption('None');
    await page.getByLabel('Select Price Reduction').selectOption('None');
    await page.getByRole('button', { name: 'New Product' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByRole('table')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'prueba', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: '0', exact: true })).toBeVisible();
    await expect(page.getByTestId('table-row-element').getByRole('cell', { name: 'ACTIVE' })).toBeVisible();
    //Delete
    await page.getByTestId('table-row-element').getByRole('link', { name: 'Delete' }).click()
    await expect(page.getByRole('cell', { name: 'prueba', exact: true })).not.toBeVisible();
});


test('New user, login and delete user', async ({ page }) => {
    //Create
    await page.goto(LOCALHOST_URL);
    await page.getByRole('button', { name: 'User Table' }).click();
    await expect(page.getByRole('cell', { name: 'admin@gmail.com', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'New User' }).click();
    await page.getByLabel('User ID').fill('0');
    await page.getByLabel('User Name').fill('admintest@gmail.com');
    await page.getByLabel('Password').fill('1');
    await page.getByLabel('Country').fill('España');
    await page.getByLabel('Role').selectOption('ADMIN');
    await page.getByRole('button', { name: 'New User' }).click();
    await page.waitForTimeout(500);
    //check
    await expect(page.getByRole('table')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'admintest@gmail.com' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'ADMIN' }).nth(4)).toBeVisible();
    await expect(page.getByRole('cell', { name: 'España' })).toBeVisible();
    await page.getByRole('button', { name: 'Log out' }).click();
    //login with user
    await page.getByLabel('Your email').fill('admintest@gmail.com');
    await page.getByLabel('Your password').fill('1');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'User Table' }).click();

    await expect(page.getByRole('cell', { name: 'admin@gmail.com', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'New User' }).click();
    await page.getByLabel('User ID').fill('0');
    await page.getByLabel('User Name').fill('admintestdelete@gmail.com');
    await page.getByLabel('Password').fill('1');
    await page.getByLabel('Country').fill('España');
    await page.getByLabel('Role').selectOption('ADMIN');
    await page.getByRole('button', { name: 'New User' }).click();

    await page.waitForTimeout(500);

    

    await page.waitForTimeout(500);
    await expect(page.getByRole('cell', { name: 'admintestdelete@gmail.com', exact: true })).toBeVisible();
    
   
    await page.getByRole('row', { name: 'admintestdelete@gmail.com' }).getByRole('link').click();
    await expect(page.getByRole('cell', { name: 'admintestdelete@gmail.com' })).not.toBeVisible(); 

});
