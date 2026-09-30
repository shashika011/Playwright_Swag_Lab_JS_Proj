export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.placeOrderButton = page.getByRole('button', { name: 'Place order' });
  }

  async placeOrder() {
    await this.continueButton.click();
    await this.placeOrderButton.click();
  }
}
