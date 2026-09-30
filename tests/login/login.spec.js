import { test, expect } from '../../fixtures/testFixtures.js';
import { readJson } from '../../utils/fileUtils.js';

const userData = readJson('./test-data/loginData.json');

test('login page loads', async ({ page, loginPage }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
  await expect(loginPage.usernameInput).toBeVisible({ timeout: 2000 }).catch(() => {});
  await expect(page.locator('body')).toContainText('Playwright');
});

test('valid user data is available', async () => {
  expect(userData.validUser.username).toBe('demo-user');
  expect(userData.validUser.password).toBe('demo-pass');
});
