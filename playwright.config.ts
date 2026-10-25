import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  workers: 2,
  use: { baseURL: 'http://127.0.0.1:4317', browserName: 'chromium', colorScheme: 'light' },
  webServer: {
    command: 'pnpm dev --host 127.0.0.1 --port 4317',
    url: 'http://127.0.0.1:4317/components/button',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
