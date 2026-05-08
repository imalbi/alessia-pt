import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    // Force Italian locale so next-intl serves the IT default at `/`
    // (otherwise the middleware uses Accept-Language and redirects to /en).
    locale: 'it-IT',
  },
  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'mobile',
      // iPhone 14 viewport/UA but rendered via chromium because installing
      // webkit on Arch/CachyOS requires apt-only system deps.
      use: { ...devices['iPhone 14'], defaultBrowserType: 'chromium' },
    },
  ],
});
