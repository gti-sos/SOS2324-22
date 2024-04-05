// @ts-check
const { test, expect } = require('@playwright/test');

test('List people', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'top-richest' }).click();

  await page.waitForTimeout(2000);

  let millionaireCount = (await page.locator('.svelte-1316pci').all()).length;
  expect(millionaireCount).toBeGreaterThan(0);

});

test('Create new millionaire', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'top-richest' }).click();

  await page.getByRole('button', { name: 'Crear'}).click();
  let messageNewmillionaire = (await page.getByText('Millonarios creados con éxito'));
  expect(messageNewmillionaire).toBeVisible();

});

test('Delete a millionaire', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'top-richest' }).click();

  await page.locator('div').filter({ hasText: /^Elon Musk- 240 Borrar$/ }).getByRole('button').click();

  let messageDeletedmillionaire = (await page.getByText('Millonario borrado con éxito'));
  expect(messageDeletedmillionaire).toBeVisible();

});

test('Delete all', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'top-richest' }).click();
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Borrar todo'}).click();

  let messageDeletedmillionaire = (await page.getByText('Millonarios borrados con éxito'));
  expect(messageDeletedmillionaire).toBeVisible();

});
