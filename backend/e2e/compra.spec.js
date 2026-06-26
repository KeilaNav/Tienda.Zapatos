const { test, expect } = require('@playwright/test');

test.setTimeout(60000);

const URL = 'https://tienda-zapatos-8.onrender.com';

test('flujo completo tienda (frontend + backend Flask)', async ({ page }) => {

  // 1. Abrir tienda
  await page.goto(URL);

  // Esperar productos cargados
  await expect(page.locator('.product').first()).toBeVisible({
    timeout: 60000
});

  // 2. Agregar producto
  await page.locator('.product button').first().scrollIntoViewIfNeeded();

  await page.locator('.product button').first().click();

  // 3. Ver carrito
  await expect(page.locator('.cart-item').first()).toBeVisible();

  // 4. Ver total
  await expect(page.locator('#total')).toContainText('Total');


});

test('persistencia del carrito al recargar', async ({ page }) => {

  await page.goto(URL);

  await expect(page.locator('.product').first()).toBeVisible({
    timeout: 60000
  });

  await page.locator('.product button').first().click();

  await page.reload();

  await expect(page.locator('.cart-item').first()).toBeVisible();

});

test('conexion frontend con backend Flask', async ({ page }) => {

  await page.goto(URL);

  await expect(page.locator('.product').first()).toBeVisible({
    timeout: 60000
  });

});

test('calculo de total correcto desde backend', async ({ page }) => {

  await page.goto(URL);

  await expect(page.locator('.product').first()).toBeVisible({
    timeout: 60000
  });

  await page.locator('button:has-text("Agregar")')
    .first()
    .scrollIntoViewIfNeeded();

  await page.locator('button:has-text("Agregar")')
    .first()
    .click();

  await expect(page.locator('#total')).toContainText('$');

});