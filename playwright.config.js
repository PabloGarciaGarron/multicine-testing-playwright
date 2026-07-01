const { defineConfig } = require("@playwright/test");

const isCI = !!process.env.CI;

module.exports = defineConfig({
  use: {
    headless: true, // ✅ SIEMPRE headless en CI/CD
    baseURL: "https://www.multicine.com.bo",
    navigationTimeout: 30000,
    actionTimeout: 15000,
  },
  timeout: 60000,
  retries: isCI ? 1 : 0,
});
