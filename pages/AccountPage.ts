import { Page } from '@playwright/test';

export class AccountPage {
  private readonly page: Page;

  // Locators
  private readonly logoutLink;
  private readonly continueLink;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.logoutLink = page.getByRole('link', { name: 'Logout', exact: true }).first();
    this.continueLink = page.getByRole('link', { name: 'Continue', exact: true });
  }

  /**
   * Verifies the customer account dashboard is displayed.
   * @returns true when the account heading is visible
   */
  async isAccountPageDisplayed(): Promise<boolean> {
    return this.page.locator('#content').getByRole('heading', { name: 'My Account', exact: true }).isVisible();
  }

  /**
   * Logs out the current customer.
   */
  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  /**
   * Verifies the logout confirmation page is displayed.
   * @returns true when the logout heading is visible
   */
  async isLogoutConfirmationDisplayed(): Promise<boolean> {
    return this.page.getByRole('heading', { name: 'Account Logout' }).isVisible();
  }

  /**
   * Verifies the logout action is no longer available.
   * @returns true when no logout link is visible
   */
  async isLoggedOut(): Promise<boolean> {
    return !(await this.page.getByRole('link', { name: 'Logout', exact: true }).isVisible());
  }

  /**
   * Continues from the logout confirmation to the storefront.
   */
  async continueAfterLogout(): Promise<void> {
    await this.continueLink.click();
  }
}
