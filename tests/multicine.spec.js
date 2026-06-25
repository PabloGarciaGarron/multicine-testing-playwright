require("dotenv").config();
const { test, expect } = require("@playwright/test");

const EMAIL = process.env.MULTICINE_EMAIL;
const PASSWORD = process.env.MULTICINE_PASSWORD;
if (!EMAIL || !PASSWORD) {
  throw new Error("Missing MULTICINE_EMAIL or MULTICINE_PASSWORD in .env");
}

test("navegar a multicine.com.bo", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/https:\/\/www\.multicine\.com\.bo\/?/);
  await expect(page).toHaveTitle(/Multicine/i);
});

test("login", async ({ page }) => {
  await page.goto("/");
  const loginLink = page
    .locator('a[aria-label="Iniciar sesión"], a:has-text("Iniciar sesión")')
    .first();
  await expect(loginLink).toBeVisible({ timeout: 10000 });
  await loginLink.click();

  const emailInput = page.locator('form input[name="email"]').first();
  const passwordInput = page.locator('form input[name="password"]').first();
  await expect(emailInput).toBeVisible({ timeout: 10000 });
  await expect(passwordInput).toBeVisible({ timeout: 10000 });

  await emailInput.fill(EMAIL);
  await passwordInput.fill(PASSWORD);

  const captchaCheckbox = page
    .frameLocator('iframe[title="reCAPTCHA"][width="304"]')
      .locator(".recaptcha-checkbox")
    .first();
    await captchaCheckbox.click({ force: true });
  await page.waitForTimeout(10000);

  const submitButton = page.locator(
    'button:has-text("Acceso"), button:has-text("Iniciar"), button:has-text("Ingresar"), input[type="submit"]',
  );
  await expect(submitButton.first()).toBeVisible({ timeout: 10000 });
  await submitButton.first().click();

  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(/https:\/\/www\.multicine\.com\.bo\//);

  const myAccountLink = page
    .locator('a:has-text("Mi cuenta"), text=Mi cuenta')
    .first();
  await expect(myAccountLink).toBeVisible({ timeout: 20000 });
});
