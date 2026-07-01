const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

// Aumentar de 60s a 180s (3 minutos)
setDefaultTimeout(180 * 1000);

Before(async function () {
  const headless = process.env.CI === "true" ? true : false;

  this.browser = await chromium.launch({
    headless: headless,
    slowMo: process.env.CI ? 0 : 250,
  });
  this.page = await this.browser.newPage();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
