const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 800 });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    locale: "es-BO",
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();
  const response = await page.goto("https://www.multicine.com.bo", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  console.log("response status", response && response.status());

  await page.waitForTimeout(8000);
  const selector =
    "body > div.page-wrap-container > div.nav > div > div.bottom-nav_container > div > div > div.locationDropdown.undefined > div.navselectwrap.is-location.is-mobile";
  const count = await page.locator(selector).count();
  console.log("selector count", count);
  if (count > 0) {
    const html = await page
      .locator(selector)
      .first()
      .evaluate((el) => el.outerHTML);
    console.log("outerHTML:", html.slice(0, 800));
    const optionTexts = await page.locator(selector + " *").allTextContents();
    console.log("child text snippets:", optionTexts.slice(0, 20));

    await page.locator(selector).click();
    await page.waitForTimeout(12000);
    const cityCandidates = await page.evaluate(() => {
      const terms = ["Santa Cruz", "La Paz", "El Alto"];
      return Array.from(document.querySelectorAll("*"))
        .map((el) => {
          const text = el.textContent
            ? el.textContent.trim().replace(/\s+/g, " ")
            : "";
          return {
            tag: el.tagName,
            className: el.className ? el.className.toString() : "",
            id: el.id || "",
            text,
            visible: !!(
              el.offsetWidth ||
              el.offsetHeight ||
              el.getClientRects().length
            ),
          };
        })
        .filter((item) => terms.some((term) => item.text.includes(term)))
        .slice(0, 40);
    });
    console.log("city candidates:", JSON.stringify(cityCandidates, null, 2));
  }

  await browser.close();
})();
