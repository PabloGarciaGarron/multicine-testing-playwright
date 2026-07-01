const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("@playwright/test");

Given("abro la página principal de Multicine", async function () {
  await this.page.goto("https://www.multicine.com.bo", {
    waitUntil: "networkidle",
  });
});

When("selecciono la ciudad {string}", async function (city) {
  // En CI/CD, marcar como pendiente

  if (process.env.CI) {
    return "pending";
  }

  const selector = ".navselectwrap.is-location.is-mobile";

  await this.page.waitForSelector(selector, { timeout: 60000 });

  await this.page.click(selector);

  await this.page.waitForSelector(".dropdownBody.open", { timeout: 10000 });

  const optionLocator = this.page

    .locator(".dropdownBody.open .dropdownItem", { hasText: city })

    .first();

  await optionLocator.waitFor({ state: "visible", timeout: 10000 });

  await optionLocator.click({ force: true });
});

Then(
  "debería ver la opción de {string} en el filtro de ubicación",

  async function (city) {
    if (process.env.CI) {
      return "pending";
    }

    const selectionText = await this.page.textContent(
      "body > div.page-wrap-container > div.nav > div > div.bottom-nav_container > div > div > div.locationDropdown.undefined",
    );

    expect(selectionText).toContain(city);
  },
);
