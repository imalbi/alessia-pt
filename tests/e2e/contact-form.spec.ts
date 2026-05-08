import { test, expect } from '@playwright/test';

test('contact form submit succeeds and shows success toast', async ({ page }) => {
  // Stub the API route to avoid hitting Resend/Telegram in e2e
  await page.route('**/api/contact', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto('/');

  // Scroll to the contact section
  await page.locator('#contact').scrollIntoViewIfNeeded();

  await page.getByLabel(/^nome$/i).fill('Marta Rossi');
  await page.getByLabel(/^email$/i).fill('marta@example.com');
  await page.getByLabel(/^messaggio$/i).fill('Vorrei lavorare sulla postura cronica.');
  // The goal <select> defaults to "" which fails zod's z.enum(GOALS).optional()
  // (empty string is neither a valid enum value nor undefined). Pick a real goal
  // so the form passes client-side validation.
  await page.getByLabel(/^obiettivo$/i).selectOption('postura');
  await page.getByLabel(/acconsento/i).check();
  await page.getByRole('button', { name: /^invia$/i }).click();

  await expect(page.getByText(/messaggio ricevuto/i)).toBeVisible({ timeout: 5000 });
});

test('contact form validation: empty submit shows aria-invalid on name', async ({ page }) => {
  await page.goto('/');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: /^invia$/i }).click();

  // react-hook-form should mark the empty name input invalid
  await expect(page.getByLabel(/^nome$/i)).toHaveAttribute('aria-invalid', 'true');
});
