const eslintPluginCucumber = require("eslint-plugin-cucumber");

module.exports = [
  {
    files: ["**/*.{js,cjs,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    plugins: {
      cucumber: eslintPluginCucumber,
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];
