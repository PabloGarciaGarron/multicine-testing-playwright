const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    locale: "es-BO",
    viewport: { width: 1280, height: 800 },
    javaScriptEnabled: true,
  });

  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
    Object.defineProperty(navigator, "languages", {
      get: () => ["es-BO", "es", "en"],
    });
    Object.defineProperty(navigator, "plugins", { get: () => [1, 2, 3, 4, 5] });
    window.chrome = { runtime: {} };
  });

  const page = await context.newPage();
  const response = await page.goto("https://www.multicine.com.bo", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  console.log("response status", response && response.status());
  console.log("title", await page.title());
  const body = await page.content();
  console.log("content length", body.length);
  console.log("body snippet:", body.slice(0, 1200));

  await page.screenshot({ path: "multicine-page.png", fullPage: false });
  console.log("screenshot saved to multicine-page.png");

  await browser.close();
})();
