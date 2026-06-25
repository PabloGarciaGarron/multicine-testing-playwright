const { chromium } = require("@playwright/test");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.multicine.com.bo");
  await page.waitForTimeout(5000);
  const els = await page.$$eval(".dorpdownItem", (els) =>
    els.map((el) => el.textContent.trim()),
  );
  console.log("count", els.length);
  console.log(els);
  await browser.close();
})();
