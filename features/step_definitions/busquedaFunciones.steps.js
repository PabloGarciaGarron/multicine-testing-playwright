const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("abro la página principal de Multicine", async function () {
  await this.page.goto("https://www.multicine.com.bo", {
    // Cambiamos a domcontentloaded para que no se quede colgado esperando analíticas lentas en CI
    waitUntil: "domcontentloaded",
  });
});

When("selecciono la ciudad {string}", async function (city) {
  // 👇 Quitamos ".is-mobile" para asegurar compatibilidad en Desktop y Mobile
  const selector = ".navselectwrap.is-location";

  await this.page.waitForSelector(selector, {
    state: "visible",
    timeout: 30000,
  });
  await this.page.click(selector);

  // Esperamos a que se abra el contenedor del dropdown
  await this.page.waitForSelector(".dropdownBody.open", { timeout: 15000 });

  // Buscamos la opción que contenga el texto de la ciudad de forma dinámica
  const optionLocator = this.page
    .locator(".dropdownBody.open .dropdownItem", { hasText: city })
    .first();

  await optionLocator.waitFor({ state: "visible", timeout: 15000 });
  await optionLocator.click({ force: true });
});

Then(
  "debería ver la opción de {string} en el filtro de ubicación",
  async function (city) {
    // Damos un breve instante para que la interfaz se actualice tras el click
    await this.page.waitForTimeout(1000);

    // 👇 Usamos un selector CSS mucho más limpio y menos propenso a romperse que la ruta absoluta de divs
    const selectionText = await this.page.textContent(
      ".navselectwrap.is-location",
    );

    expect(selectionText).toContain(city);
  },
);
