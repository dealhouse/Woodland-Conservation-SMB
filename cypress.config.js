const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "u22hgi",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
