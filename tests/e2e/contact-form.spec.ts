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

  // Labels are anchored at the start only. Every required field appends a "*"
  // carrying an "obbligatorio" aria-label, so the accessible name is
  // "Nome obbligatorio" and a `$` anchor never matches.
  await page.getByLabel(/^nome/i).fill('Marta Rossi');
  await page.getByLabel(/^telefono/i).fill('+39 333 1234567');
  await page.getByLabel(/^email/i).fill('marta@example.com');
  await page.getByLabel(/^messaggio/i).fill('Vorrei lavorare sulla postura cronica.');
  // The goal field is now a Radix Select combobox: click trigger, click option.
  await page.getByLabel(/^obiettivo/i).click();
  await page.getByRole('option', { name: /postura/i }).click();
  await page.getByLabel(/acconsento/i).check();
  await page.getByRole('button', { name: /^invia il messaggio$/i }).click();

  await expect(page.getByText(/messaggio ricevuto/i)).toBeVisible({ timeout: 5000 });
});

test('contact form validation: empty submit shows aria-invalid on name', async ({ page }) => {
  await page.goto('/');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: /^invia il messaggio$/i }).click();

  // react-hook-form should mark the empty name input invalid
  await expect(page.getByLabel(/^nome/i)).toHaveAttribute('aria-invalid', 'true');
});
