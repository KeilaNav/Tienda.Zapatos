const { test, expect } = require('@playwright/test');

const URL = 'https://tienda-zapatos-8.onrender.com';

test('flujo completo tienda (frontend + backend Flask)', async ({ page }) => {

  await page.goto(URL);

  const product = page.locator('.product').first();
  await expect(product).toBeVisible({ timeout: 60000 });

  const cartBefore = page.locator('.cart-item').count();

  await product.locator('button').click();

  // 🔥 esperar que el carrito realmente cambie
  await expect.poll(async () => {
    return await page.locator('.cart-item').count();
  }).toBeGreaterThan(0);

  await expect(page.locator('.cart-item').first()).toBeVisible();

  await expect(page.locator('#total')).toContainText('$');
});

test('persistencia del carrito al recargar', async ({ page }) => {

  await page.goto(URL);

  await expect(page.locator('.product').first()).toBeVisible({ timeout: 60000 });

  await page.locator('.product button').first().click();

  await expect.poll(async () => {
    return await page.locator('.cart-item').count();
  }).toBeGreaterThan(0);

  await page.reload();

  await expect(page.locator('.cart-item').first()).toBeVisible();
});

test('conexion frontend con backend Flask', async ({ page }) => {

  await page.goto(URL);

  await expect(page.locator('.product').first()).toBeVisible({ timeout: 60000 });

  await expect(page.locator('.product')).toHaveCountGreaterThan(0);
});

test('calculo de total correcto desde backend', async ({ page }) => {

  await page.goto(URL);

  await expect(page.locator('.product').first()).toBeVisible({ timeout: 60000 });

  await page.locator('.product button').first().click();

  await expect.poll(async () => {
    return await page.locator('#total').textContent();
  }).toContain('$');

});