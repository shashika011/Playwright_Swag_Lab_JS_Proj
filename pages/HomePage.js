export class HomePage {
  constructor(page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.searchButton = page.getByRole('button', { name: /Search/i });
    this.searchInput = page.getByRole('searchbox', { name: 'Search' });
  }

  async goto() {
    await this.page.goto('https://playwright.dev/');
  }

  async openGettingStarted() {
    await this.getStartedLink.click();
  }

  async search(keyword) {
    await this.searchButton.click();
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
  }
}
