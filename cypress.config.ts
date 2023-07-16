import { defineConfig } from 'cypress'
export default defineConfig({
  e2e: {
    // Configure your E2E tests here
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    baseUrl: "http://165.227.93.41/lojinha-web/v2",
  },

})