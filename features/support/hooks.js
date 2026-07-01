const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

setDefaultTimeout(60 * 1000);

Before(async function () {
  // Forzar headless en CI, pero permitir headless: false localmente si quieres
  const headless = process.env.CI === "true" ? true : false;

  this.browser = await chromium.launch({
    headless: headless,
    slowMo: process.env.CI ? 0 : 250, // Sin slowMo en CI
  });
  this.page = await this.browser.newPage();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
