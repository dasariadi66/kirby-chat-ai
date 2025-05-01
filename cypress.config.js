const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://dasariadi66.github.io/kirby-chat-ai/',
    setupNodeEvents(on, config) {
    },
  },
});