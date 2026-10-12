import { Page } from '@playwright/test';

export class ProductPage {
  private readonly page: Page;

  // Locators
  private readonly quantityInput;
  private readonly addToCartButton;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.quantityInput = page.getByRole('textbox', { name: 'Qty' });
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
  }

  /**
   * Verifies the requested product page is displayed.
   * @param productName - Product name expected in the page heading
   * @returns true when the product heading is visible
   */
  async isProductPageDisplayed(productName: string): Promise<boolean> {
    const productHeading = this.page.getByRole('heading', { name: productName, exact: true });
    await productHeading.waitFor({ state: 'visible' });
    return productHeading.isVisible();
  }

  /**
   * Reads the displayed product price.
   * @param price - Exact displayed price
   * @returns the matching price text
   */
  async getDisplayedPrice(price: string): Promise<string> {
    return this.page.getByText(price, { exact: true }).innerText();
  }

  /**
   * Sets the requested product quantity.
   * @param quantity - Quantity to add
   */
  async setQuantity(quantity: string): Promise<void> {
    await this.quantityInput.fill(quantity);
  }

  /**
   * Adds the product to the cart.
   */
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  /**
   * Verifies the product-added confirmation is visible.
   * @param productName - Product name in the confirmation
   * @returns true when the confirmation is visible
   */
  async isAddedToCartMessageDisplayed(productName: string): Promise<boolean> {
    const confirmationMessage = this.page.getByText(
      `Success: You have added ${productName} to your shopping cart!`,
    );
    await confirmationMessage.waitFor({ state: 'visible' });
    return confirmationMessage.isVisible();
  }
}
