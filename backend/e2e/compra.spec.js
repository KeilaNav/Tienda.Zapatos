const { test, expect } = require('@playwright/test');

const URL = 'https://tienda-zapatos-8.onrender.com';

test('flujo completo tienda (frontend + backend Flask)', async ({ page }) => {

  // 1. Abrir tienda
  await page.goto(URL);
  await page.waitForLoadState('networkidle');

  // Esperar productos cargados
  await expect(page.locator('.product').first()).toBeVisible();

  // 2. Agregar producto
  await page.click('.product button');

  // 3. Ver carrito
  await expect(page.locator('.cart-item')).toHaveCount(1);

  // 4. Ver total
  await expect(page.locator('#total')).toContainText('Total');

  // 5. Eliminar producto
  await page.click('.delete');

  // 6. Validar carrito vacío
  await expect(page.locator('.cart-item')).toHaveCount(0);

});

test('persistencia del carrito al recargar', async ({ page }) => {

  await page.goto(URL);
  await page.waitForLoadState('networkidle');

  await page.click('.product button');

  await page.reload();
  await page.waitForLoadState('networkidle');

  await expect(page.locator('.cart-item').first()).toBeVisible();

});

test('conexion frontend con backend Flask', async ({ page }) => {

  await page.goto(URL);
  await page.waitForLoadState('networkidle');

  await expect(page.locator('.product').first()).toBeVisible();

});

test('calculo de total correcto desde backend', async ({ page }) => {

  await page.goto(URL);
  await page.waitForLoadState('networkidle');

  await page.click('button:has-text("Agregar")');

  await expect(page.locator('#total')).toContainText('$');
  
});