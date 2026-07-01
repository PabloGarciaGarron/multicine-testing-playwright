const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  use: {
    headless: process.env.CI ? true : false,
    baseURL: "https://www.multicine.com.bo",
    navigationTimeout: 30000,
    actionTimeout: 15000,
  },
  timeout: 60000,
  retries: process.env.CI ? 1 : 0, // Reintentar en CI si falla
});
