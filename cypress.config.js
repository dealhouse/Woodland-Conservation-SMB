const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "u22hgi",

  // ---------------------
  // E2E Tests
  // ---------------------
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  // ---------------------
  // Component Tests
  // ---------------------
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
