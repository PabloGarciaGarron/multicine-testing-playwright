import { test, expect } from "@playwright/test";
import { registerSelectCity } from "./selectCity.js";

test("deberia seleccionar la ciudad mediante selectCity", async ({ page }) => {
  await registerSelectCity(page);

  await page.goto("https://multicine.com.bo", { waitUntil: "networkidle" });
  await page.waitForSelector(
    "body > div.page-wrap-container > div.nav > div > div.bottom-nav_container > div > div > div.locationDropdown.undefined > div.navselectwrap.is-location.is-mobile",
    { timeout: 20000 },
  );

  const selectedCity = "Santa Cruz";

  const exists = await page.evaluate(
    () => typeof window.selectCity === "function",
  );
  expect(exists).toBe(true);

  const result = await page.evaluate(
    (city) => window.selectCity(city),
    selectedCity,
  );
  expect(result).toBeTruthy();
});

test("deberia seleccionar la ciudad mediante selectCityRefactored", async ({
  page,
}) => {
  await registerSelectCity(page);

  await page.goto("https://multicine.com.bo", { waitUntil: "networkidle" });
  await page.waitForSelector(
    "body > div.page-wrap-container > div.nav > div > div.bottom-nav_container > div > div > div.locationDropdown.undefined > div.navselectwrap.is-location.is-mobile",
    { timeout: 20000 },
  );

  const selectedCity = "Sucre";

  const exists = await page.evaluate(
    () => typeof window.selectCityRefactored === "function",
  );
  expect(exists).toBe(true);

  const result = await page.evaluate(
    (city) => window.selectCityRefactored(city),
    selectedCity,
  );
  expect(result).toBeTruthy();
});
