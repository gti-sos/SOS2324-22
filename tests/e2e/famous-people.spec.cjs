// @ts-check
const { test, expect } = require('@playwright/test');

test('List people', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'famous-people' }).click();
  
  await page.waitForTimeout(2000);

  let personCount = (await page.locator('.svelte-1316pci').all()).length;
  expect(personCount).toBeGreaterThan(0);
});

test('Create new person', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'famous-people' }).click();

  await page.getByRole('button', { name: 'Crear'}).click();
  let messageNewPerson = (await page.getByText('Persona creada con éxito'));
  expect(messageNewPerson).toBeVisible();
});

test('Delete a person', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'famous-people' }).click();

  await page.locator('div').filter({ hasText: /^Louis Armstrong- Male Borrar$/ }).getByRole('button').click();

  let messageDeletedPerson = (await page.getByText('Persona borrada con éxito'));
  expect(messageDeletedPerson).toBeVisible();
});

test('Delete all', async ({ page }) => {
  await page.goto('http://localhost:10000');

  await page.getByRole('navigation').getByRole('link', { name: 'famous-people' }).click();
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Borrar todo'}).click();

  let messageDeletedPerson = (await page.getByText('Personas borradas con éxito'));
  expect(messageDeletedPerson).toBeVisible();
});