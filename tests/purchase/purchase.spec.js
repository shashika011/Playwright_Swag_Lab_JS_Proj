import { test, expect } from '../../fixtures/testFixtures.js';

test('purchase flow starts from home page', async ({ page, homePage }) => {
  await homePage.goto();
  await expect(page).toHaveTitle(/Playwright/);
  await homePage.openGettingStarted();
  await expect(page).toHaveURL(/playwright.dev/);
});
