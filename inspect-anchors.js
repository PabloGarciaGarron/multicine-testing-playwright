const { chromium } = require('@playwright/test');
(async()=>{
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ baseURL: 'https://www.multicine.com.bo' });
  const page = await context.newPage();
  await page.goto('/');
  await page.waitForTimeout(5000);
  const anchors = await page.$$eval('a', els => els.map(a=>({text:(a.innerText||a.textContent||'').trim(), href:a.href, cls:a.className, aria:a.getAttribute('aria-label')})).filter(a=>a.text||a.aria).slice(0,100));
  console.log(JSON.stringify(anchors,null,2));
  await browser.close();
})();
