import { Page } from '@playwright/test';

export class RegistrationPage {
  private readonly page: Page;

  // Locators
  private readonly firstNameInput;
  private readonly lastNameInput;
  private readonly emailInput;
  private readonly telephoneInput;
  private readonly passwordInput;
  private readonly passwordConfirmInput;
  private readonly privacyPolicyCheckbox;
  private readonly continueButton;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.getByPlaceholder('E-Mail');
    this.telephoneInput = page.getByPlaceholder('Telephone');
    this.passwordInput = page.getByPlaceholder('Password', { exact: true });
    this.passwordConfirmInput = page.getByPlaceholder('Password Confirm');
    this.privacyPolicyCheckbox = page.getByRole('checkbox');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  /**
   * Verifies the registration form is displayed.
   * @returns true when the registration heading is visible
   */
  async isRegistrationPageDisplayed(): Promise<boolean> {
    const registrationHeading = this.page.getByRole('heading', { name: 'Register Account' });
    await registrationHeading.waitFor({ state: 'visible' });
    return registrationHeading.isVisible();
  }

  /**
   * Registers a customer with the supplied details.
   * @param firstName - Customer first name
   * @param lastName - Customer last name
   * @param email - Customer email address
   * @param telephone - Customer telephone number
   * @param password - Customer password
   */
  async register(
    firstName: string,
    lastName: string,
    email: string,
    telephone: string,
    password: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.telephoneInput.fill(telephone);
    await this.passwordInput.fill(password);
    await this.passwordConfirmInput.fill(password);
    await this.privacyPolicyCheckbox.check();
    await this.continueButton.click();
  }

  /**
   * Verifies that registration succeeded.
   * @returns true when the account-created heading is visible
   */
  async isRegistrationSuccessful(): Promise<boolean> {
    return this.page.getByRole('heading', { name: 'Your Account Has Been Created!' }).isVisible();
  }
}
