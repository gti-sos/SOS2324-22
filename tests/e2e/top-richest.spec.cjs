// @ts-check
const { test, expect } = require('@playwright/test');


test('Create new millionaire', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'top-richest' }).click();

  await page.getByRole('button', { name: 'Crear'}).click();
  let messageNewmillionaire = (await page.getByText('El millonario ya existe'));
  await expect(messageNewmillionaire).toBeVisible();

});

test('Delete a millionaire', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'top-richest' }).click();

  await page.locator('div').filter({ hasText: /^Elon Musk South Africa Borrar$/ }).getByRole('button').click();

  let messageDeletedmillionaire = (await page.getByText('Millonario borrado con éxito'));
  await expect(messageDeletedmillionaire).toBeVisible();

});

test('Delete all', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'top-richest' }).click();
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Borrar todo'}).click();

  let messageDeletedmillionaire = (await page.getByText('Millonarios borrados con éxito'));
  await expect(messageDeletedmillionaire).toBeVisible();

});

