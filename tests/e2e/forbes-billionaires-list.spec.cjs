// @ts-check
const { test, expect } = require('@playwright/test');

test('List people', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'forbes-billionaires-list' }).click();
  
  await page.waitForTimeout(2000);

  let billionaireCount = (await page.locator('.svelte-1316pci').all()).length;
  await expect(billionaireCount).toBeGreaterThan(0);

});

test('Create new person', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'forbes-billionaires-list' }).click();

  await page.getByRole('button', { name: 'Crear'}).click();
  let messageNewPerson = (await page.getByText('Billonario creado con éxito'));
  await expect(messageNewPerson).toBeVisible();

});

test('Delete a person', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'forbes-billionaires-list' }).click();

  await page.locator('ul > div > button').first().click();

  let messageDeletedPerson = (await page.getByText('Billonario borrado con éxito'));
  await expect(messageDeletedPerson).toBeVisible();

});

test('Delete all', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'forbes-billionaires-list' }).click();
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Borrar todo'}).click();

  let messageDeletedBillionaires = (await page.getByText('Ya están todos los billonarios borrados'));
  await expect(messageDeletedBillionaires).toBeVisible();

});

