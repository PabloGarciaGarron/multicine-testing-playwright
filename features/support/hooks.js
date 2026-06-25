const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

setDefaultTimeout(60 * 1000);

Before(async function () {
  this.browser = await chromium.launch({ headless: false, slowMo: 250 });
  this.page = await this.browser.newPage();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
