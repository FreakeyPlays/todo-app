import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:8080',
    env: {
      DB_URL: 'http://localhost:8081'
    }
  }
})
