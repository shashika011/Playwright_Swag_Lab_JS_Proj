# Playwright Automation Framework

A scalable **Playwright JavaScript automation framework** designed for web UI automation, API testing, test-data management, reporting, cross-browser testing, and CI/CD integration.

---

## 📁 Project Structure

```text
playwright-automation/
│
├── tests/
│   ├── login/
│   │   └── login.spec.js
│   ├── purchase/
│   │   └── purchase.spec.js
│   └── ...
│
├── pages/
│   ├── LoginPage.js
│   ├── HomePage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── fixtures/
│   └── testFixtures.js
│
├── utils/
│   ├── excelReader.js
│   ├── apiUtils.js
│   ├── dateUtils.js
│   ├── fileUtils.js
│   └── logger.js
│
├── test-data/
│   ├── loginData.json
│   ├── users.json
│   └── testData.xlsx
│
├── config/
│   ├── qa.config.js
│   └── staging.config.js
│
├── playwright.config.js
├── package.json
├── .env
├── .gitignore
│
└── .github/
    └── workflows/
        └── playwright.yml
```

---

# 1. Framework Overview

This framework uses **Playwright with JavaScript** and follows industry-standard automation practices.

### Key Features

- Page Object Model (POM)
- Reusable page classes
- JSON/Excel test-data management
- Dynamic test-data generation
- Custom utilities
- Multiple environment support
- `.env` configuration
- HTML and Allure reporting
- Screenshots and video on failure
- API testing using Playwright Request
- Custom fixtures
- Hooks and test lifecycle management
- Chromium, Firefox, and WebKit testing
- Parallel execution
- GitHub Actions CI/CD
- Jenkins/Azure DevOps integration capability
- API mocking
- Performance testing integration
- AI-assisted test development

---

# 2. Page Object Model (POM)

The framework follows the **Page Object Model design pattern**.

Page-specific locators and actions are encapsulated inside reusable page classes.

### Example

```javascript
// pages/SearchPage.js

class SearchPage {

    constructor(page) {
        this.page = page;
        this.searchBox = page.getByPlaceholder('Search');
        this.searchButton = page.getByRole('button', {
            name: 'Search'
        });
    }

    async search(keyword) {
        await this.searchBox.fill(keyword);
        await this.searchButton.click();
    }
}

module.exports = { SearchPage };
```

The test can then use:

```javascript
await searchPage.search('JavaScript');
```

### Benefits

- Reduces code duplication
- Improves maintainability
- Separates test logic from UI implementation
- Makes locator maintenance easier
- Allows reusable business actions
- Improves readability of test cases

---

# 3. Test Data Management

Test data is maintained separately from test scripts.

Supported data sources include:

- JSON
- CSV
- Excel
- Environment variables
- Dynamically generated data

### Example JSON

```json
{
    "validUser": {
        "username": "testuser",
        "password": "Password123"
    },
    "invalidUser": {
        "username": "invaliduser",
        "password": "InvalidPassword"
    }
}
```

Tests can consume the data without hard-coding values.

```javascript
const loginData = require('../test-data/loginData.json');

await loginPage.login(
    loginData.validUser.username,
    loginData.validUser.password
);
```

---

## Dynamic Test Data

Dynamic test data can be generated using libraries such as:

```bash
npm install @faker-js/faker
```

Example:

```javascript
const { faker } = require('@faker-js/faker');

const email = faker.internet.email();
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
```

This is useful for:

- User registration
- Customer creation
- Orders
- Addresses
- Random search data
- Negative testing

---

