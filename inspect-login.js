const { chromium } = require('@playwright/test');
(async()=>{
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ baseURL: 'https://www.multicine.com.bo' });
  const page = await context.newPage();
  await page.goto('/');
  await page.waitForTimeout(3000);
  const loginLink = page.locator('a[aria-label="Iniciar sesión"], a:has-text("Iniciar sesión")').first();
  console.log('loginLink count', await loginLink.count());
  try {
    await loginLink.click();
  } catch (e) {
    console.error('click failed', e.message);
  }
  await page.waitForTimeout(3000);
  const html = await page.content();
  console.log('Mi cuenta index', html.indexOf('Mi cuenta'));
  console.log('No soy robot index', html.indexOf('No soy robot'));
  console.log('recaptcha index', html.indexOf('recaptcha'));
  console.log('g-recaptcha index', html.indexOf('g-recaptcha'));
  console.log('form count', await page.locator('form').count());
  const inputs = await page.$$eval('input', els => els.map(i=>({name:i.name,type:i.type,placeholder:i.placeholder,visible:i.offsetParent!==null})).slice(0,20));
  console.log(JSON.stringify(inputs,null,2));
  await browser.close();
})();
