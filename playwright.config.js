const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  use: {
    headless: false,
    baseURL: "https://www.multicine.com.bo",
  },
});
