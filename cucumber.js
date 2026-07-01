module.exports = {
  default: {
    require: ["features/support/**/*.js", "features/step_definitions/**/*.js"],
    format: ["progress", "json:test-results/cucumber-report.json"],
    parallel: 2,
  },
};
