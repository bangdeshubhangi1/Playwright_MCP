import { Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  // Locators
  private readonly emailInput;
  private readonly passwordInput;
  private readonly loginButton;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  /**
   * Verifies the login form is displayed.
   * @returns true when the returning-customer form is visible
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    return this.page.getByText('I am a returning customer', { exact: true }).isVisible();
  }

  /**
   * Logs in with the supplied customer credentials.
   * @param email - Customer email address
   * @param password - Customer password
   */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
