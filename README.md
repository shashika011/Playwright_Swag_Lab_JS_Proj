# Playwright JavaScript Test Framework

This project is a Playwright JavaScript automation framework for web UI testing. It is organized around the Page Object Model, reusable fixtures and utilities, external test data, environment configuration, reporting, and CI/CD execution.

## Framework Requirements

The framework includes:

- A clear and maintainable folder structure
- Page Object Model (POM)
- Test data stored outside test scripts
- Reusable utility functions
- Environment and configuration support
- Logging and test reporting
- CI/CD execution support
- Playwright features such as browser projects, retries, parallel workers, traces, screenshots, and videos

## Project Structure

```text
Playwright_Js_SwagLab/
├── tests/
│   ├── login/
│   │   └── login.spec.js
│   └── purchase/
│       └── purchase.spec.js
├── pages/
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── HomePage.js
│   ├── LoginPage.js
│   └── Test01.js
├── fixtures/
│   └── testFixtures.js
├── utils/
│   ├── dateUtils.js
│   ├── fileUtils.js
│   └── logger.js
├── test-data/
│   ├── loginData.json
│   └── users.json
├── config/
│   ├── qa.config.js
│   └── staging.config.js
├── playwright.config.js
├── package.json
├── framework.js
└── framework.md
```

## Page Object Model

Page objects keep locators and page actions together. Tests use business actions instead of duplicating selector and interaction logic.

```js
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

Benefits include reduced duplication, simpler locator maintenance, reusable workflows, and more readable tests.

## External Test Data

Test data is maintained in `test-data/` instead of being embedded in test logic.

```js
import loginData from '../../test-data/loginData.json' with { type: 'json' };

await loginPage.login(
  loginData.validUser.username,
  loginData.validUser.password,
);
```

JSON files are currently supported. Additional data sources such as CSV or Excel can be added through utilities when required.

## Fixtures

`fixtures/testFixtures.js` extends Playwright's test object with reusable page objects such as `homePage`, `loginPage`, and `test01`.

```js
import { test, expect } from '../../fixtures/testFixtures.js';

test('user can log in', async ({ loginPage }) => {
  await loginPage.login('username', 'password');
});
```

Fixtures provide a consistent setup point for page objects, authentication, test data, and shared test context.

## Utilities

Reusable helper functions belong in `utils/`. The framework currently includes date, file, and logging utilities.

Example:

```js
import { getTodayDate } from '../utils/dateUtils.js';

const today = getTodayDate();
```

Utilities should contain shared behavior rather than page-specific locators or assertions.

## Configuration and Environments

Environment-specific configuration is available through:

- `config/qa.config.js`
- `config/staging.config.js`
- `playwright.config.js`

The base URL can be supplied with the `BASE_URL` environment variable. When it is not supplied, the configuration uses its default URL.

Example in PowerShell:

```powershell
$env:BASE_URL = 'https://qa.example.com'
npm test
```

Environment files must not contain committed credentials or secrets. Keep local secret values in an ignored `.env` file or in CI/CD secret variables.

## Playwright Configuration

The main configuration provides:

- `tests/` as the test directory
- A 60-second test timeout
- CI retries through `CI`
- HTML reporting in `my-report/`
- Screenshots and videos on failure
- Traces on retry
- A Chromium project enabled by default

Playwright also supports Firefox, WebKit, parallel workers, and mobile projects. These are configured as projects in `playwright.config.js` when needed. The current configuration intentionally uses one worker, so tests run sequentially by default.

## Logging and Reporting

Test execution can be run with the list output and an HTML report. Failure artifacts are captured according to the Playwright configuration.

```powershell
npm test
npm run report
```

Reports and generated artifacts should remain outside source control. Add report folders to `.gitignore` where appropriate.

## CI/CD Integration

The framework is designed to run in GitHub Actions, Jenkins, Azure DevOps, or another CI platform.

A CI pipeline should:

1. Check out the repository.
2. Install Node.js dependencies with `npm ci`.
3. Install Playwright browsers with `npx playwright install --with-deps`.
4. Run `npm test`.
5. Publish `my-report/` and failure artifacts.

The `CI` environment variable enables retry behavior configured in `playwright.config.js`.

## Common Commands

```powershell
npm install
npx playwright install
npm test
npm run test:headed
npm run test:qa
npm run test:staging
npx playwright test tests/login/login.spec.js
npx playwright test --project=chromium
npm run report
```

## Test Design Principles

Tests should follow Arrange, Act, Assert and should be:

- Independent and repeatable
- Readable and maintainable
- Based on page objects and fixtures
- Driven by external test data
- Free from unnecessary hard waits
- Easy to diagnose through logs and Playwright artifacts

## Future Extensions

The framework can be extended with additional browser projects, API tests, API mocking, authentication state, database validation, visual regression, accessibility checks, and richer CI notifications. These capabilities should be added only when the project needs them and documented after implementation.
