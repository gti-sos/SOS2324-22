const { test, expect } = require('@playwright/test');

test('List companies', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'forbes-billonaires' }).click();

  await page.waitForTimeout(2000);

  let companyCount = (await page.getByRole('listitem').all()).length;
  expect(companyCount).toBeGreaterThan(0);

});

test('Create new company', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'forbes-billonaires' }).click();

  await page.getByRole('button', { name: 'Crear'}).click();
  let messageNewPerson = (await page.getByText('Compañia creada con éxito'));
  expect(messageNewPerson).toBeVisible();

});

test('Delete a company', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'forbes-billonaires' }).click();

  await page.locator('listitem').filter({ hasText: /^Apple-45.217 Borrar$/ }).getByRole('button').click();

  let messageDeletedCompany = (await page.getByText('Compañia borrada con éxito'));
  expect(messageDeletedCompany).toBeVisible();

});

test('Delete all', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'forbes-billonaires' }).click();
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Borrar todo'}).click();

  let messageDeletedCompany = (await page.getByText('Compañias borradas con éxito'));
  expect(messageDeletedCompany).toBeVisible();

});