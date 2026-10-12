import { Page } from '@playwright/test';

export class HomePage {
  private readonly page: Page;

  // Locators
  private readonly accountMenuLink;
  private readonly searchInput;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.accountMenuLink = page.getByRole('link', { name: /My Account/ }).first();
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
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
   * Opens the full Desktops category from the main navigation.
   */
  async openAllDesktops(): Promise<void> {
    const desktopsMenu = this.page.locator('#menu').getByRole('link', { name: 'Desktops', exact: true });
    await desktopsMenu.hover();
    await this.page.locator('#menu').getByRole('link', { name: /Show All\s*Desktops/ }).click();
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
    const cartDropdown = this.page.locator('#cart');
    await cartDropdown.getByRole('button').click();
    await cartDropdown.getByRole('link', { name: /View Cart/ }).click();
  }
}
