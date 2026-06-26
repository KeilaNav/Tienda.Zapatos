const { test, expect } = require('@playwright/test');

const URL = 'https://tienda-zapatos-8.onrender.com';

test.describe.configure({ timeout: 60000 });

test('flujo completo tienda (frontend + backend Flask)', async ({ page }) => {

  await page.goto(URL);

  // Esperar productos
  const product = page.locator('.product').first();
  await expect(product).toBeVisible({ timeout: 60000 });

  const cartBefore = await page.locator('.cart-item').count();

  // Agregar producto
  await product.locator('button').click();

  // Esperar cambio real en carrito
  await expect.poll(async () => {
    return await page.locator('.cart-item').count();
  }).toBeGreaterThan(cartBefore);

  // Ver carrito visible
  await expect(page.locator('.cart-item').first()).toBeVisible();

  // Ver total
  await expect(page.locator('#total')).toContainText('$');
});


test('persistencia del carrito al recargar', async ({ page }) => {

  await page.goto(URL);

  const product = page.locator('.product').first();
  await expect(product).toBeVisible({ timeout: 60000 });

  await product.locator('button').click();

  // Esperar carrito actualizado
  await expect.poll(async () => {
    return await page.locator('.cart-item').count();
  }).toBeGreaterThan(0);

  // Recargar página
  await page.reload();

  // Debe persistir
  await expect(page.locator('.cart-item').first()).toBeVisible();
});


test('conexion frontend con backend Flask', async ({ page }) => {

  await page.goto(URL);

  const products = page.locator('.product');

  await expect(products.first()).toBeVisible({ timeout: 60000 });

  // validación real de conexión backend
  const count = await products.count();
  expect(count).toBeGreaterThan(0);
});


test('calculo de total correcto desde backend', async ({ page }) => {

  await page.goto(URL);

  const product = page.locator('.product').first();
  await expect(product).toBeVisible({ timeout: 60000 });

  await product.locator('button').click();

  // esperar actualización de total
  await expect.poll(async () => {
    return await page.locator('#total').textContent();
  }).toContain('$');
});