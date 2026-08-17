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
      //
      // `isMobile` is forced off. It is part of the iPhone descriptor and is a
      // WebKit-oriented flag; on Chromium it switches on mobile viewport
      // emulation, and Playwright's click coordinates then stop agreeing with
      // the compositor's hit testing. The symptom is a click on an element in
      // one section being reported as intercepted by an element a thousand
      // pixels away, while `document.elementFromPoint` at the same coordinates
      // returns the correct element. The viewport and touch emulation are what
      // these tests actually need, and both survive.
      use: { ...devices['iPhone 14'], defaultBrowserType: 'chromium', isMobile: false },
    },
  ],
});
