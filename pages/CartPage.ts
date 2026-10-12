import { Locator, Page } from '@playwright/test';

export class CartPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private productRow(productName: string): Locator {
    return this.page.getByRole('row').filter({ hasText: productName });
  }

  /**
   * Verifies the requested product is present in the cart.
   * @param productName - Product name to find
   * @returns true when a matching cart row is visible
   */
  async isProductInCart(productName: string): Promise<boolean> {
    return this.productRow(productName).isVisible();
  }

  /**
   * Reads the quantity for a cart product.
   * @param productName - Product name in the cart
   * @returns the quantity entered in the cart row
   */
  async getProductQuantity(productName: string): Promise<string> {
    return this.productRow(productName).getByRole('textbox').inputValue();
  }

  /**
   * Reads the unit price for a cart product.
   * @param productName - Product name in the cart
   * @returns the unit-price cell text
   */
  async getProductUnitPrice(productName: string): Promise<string> {
    const cells = this.productRow(productName).getByRole('cell');
    return cells.nth(4).innerText();
  }

  /**
   * Reads the line total for a cart product.
   * @param productName - Product name in the cart
   * @returns the line-total cell text
   */
  async getProductLineTotal(productName: string): Promise<string> {
    const cells = this.productRow(productName).getByRole('cell');
    return cells.nth(5).innerText();
  }

  /**
   * Reads the cart total.
   * @returns the total value from the cart summary
   */
  async getCartTotal(): Promise<string> {
    const totalRow = this.page.getByRole('row').filter({ hasText: 'Total:' });
    return totalRow.getByRole('cell').last().innerText();
  }
}
