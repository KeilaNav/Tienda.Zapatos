const { test, expect } = require('@playwright/test');

const URL = 'http://127.0.0.1:5500'; 


test('flujo completo tienda (frontend + backend Flask)', async ({ page }) => {

  // =========================
  // 1. ABRIR TIENDA
  // =========================
  await page.goto(URL);

  // esperar productos cargados desde /products
  await expect(page.locator('.product')).toHaveCountGreaterThan(0);

  // =========================
  // 2. AGREGAR PRODUCTO AL CARRITO
  // =========================
  await page.click('.product button');

  // =========================
  // 3. VER CARRITO
  // =========================
  await expect(page.locator('.cart-item')).toHaveCount(1);

  // =========================
  // 4. VER TOTAL (GET /cart/total)
  // =========================
  await expect(page.locator('#total')).toContainText('Total');

  // =========================
  // 5. ELIMINAR PRODUCTO
  // =========================
  await page.click('.delete');

  // =========================
  // 6. VALIDAR CARRITO VACÍO O ACTUALIZADO
  // =========================
  await expect(page.locator('.cart-item')).toHaveCount(0);
});


test('persistencia del carrito al recargar', async ({ page }) => {

  await page.goto(URL);

  await page.click('.product button');

  await page.reload();

  await page.waitForTimeout(500);

  await page.click('#cart');

  await expect(page.locator('.cart-item')).toHaveCountGreaterThan(0);
});

test('conexion frontend con backend Flask', async ({ page }) => {

  await page.goto(URL);

  // productos vienen de GET /products
  const products = page.locator('.product');

  await expect(products.first()).toBeVisible();

});

test('calculo de total correcto desde backend', async ({ page }) => {

  await page.goto(URL);

  await page.click('button:has-text("Agregar")');

  const total = page.locator('#total');

  await expect(total).toContainText('$');
});

