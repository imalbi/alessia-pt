import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = ['/', '/privacy'];

for (const url of PAGES) {
  test(`a11y: ${url} has no serious or critical violations`, async ({ page }) => {
    await page.goto(url);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    const failures = result.violations.filter((v) =>
      ['serious', 'critical'].includes(v.impact ?? ''),
    );
    expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
  });
}
