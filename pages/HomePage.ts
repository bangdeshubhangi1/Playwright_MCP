import { Page } from '@playwright/test';

export class HomePage {
  private readonly page: Page;

  // Locators
  private readonly accountMenuLink;
  private readonly searchInput;
  private readonly shoppingCartLink;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.accountMenuLink = page.getByRole('link', { name: /My Account/ }).first();
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.shoppingCartLink = page.getByRole('link', { name: /Shopping Cart/ });
  }

  /**
   * Opens the registration page from the account menu.
   */
  async openRegistration(): Promise<void> {
    await this.accountMenuLink.click();
    await this.page.getByRole('link', { name: 'Register', exact: true }).click();
  }

  /**
   * Opens the login page from the account menu.
   */
  async openLogin(): Promise<void> {
    await this.accountMenuLink.click();
    await this.page.getByRole('link', { name: 'Login', exact: true }).click();
  }

  /**
   * Searches for a product.
   * @param productName - Product name to search for
   */
  async searchFor(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchInput.press('Enter');
  }

  /**
   * Opens the shopping cart.
   */
  async openShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}
