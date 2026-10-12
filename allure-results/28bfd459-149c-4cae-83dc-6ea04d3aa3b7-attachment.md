# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\end-to-end-shopping-flow.spec.ts >> End-to-end customer shopping flow @master @sanity @regression @web @e2e @end-to-end
- Location: tests\web\end-to-end-shopping-flow.spec.ts:5:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.isVisible: Target page, context or browser has been closed
```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | 
  3  | export class RegistrationPage {
  4  |   private readonly page: Page;
  5  | 
  6  |   // Locators
  7  |   private readonly firstNameInput;
  8  |   private readonly lastNameInput;
  9  |   private readonly emailInput;
  10 |   private readonly telephoneInput;
  11 |   private readonly passwordInput;
  12 |   private readonly passwordConfirmInput;
  13 |   private readonly privacyPolicyCheckbox;
  14 |   private readonly continueButton;
  15 | 
  16 |   constructor(page: Page) {
  17 |     this.page = page;
  18 | 
  19 |     // Initialize locators with CSS selectors
  20 |     this.firstNameInput = page.getByPlaceholder('First Name');
  21 |     this.lastNameInput = page.getByPlaceholder('Last Name');
  22 |     this.emailInput = page.getByPlaceholder('E-Mail');
  23 |     this.telephoneInput = page.getByPlaceholder('Telephone');
  24 |     this.passwordInput = page.getByPlaceholder('Password', { exact: true });
  25 |     this.passwordConfirmInput = page.getByPlaceholder('Password Confirm');
  26 |     this.privacyPolicyCheckbox = page.getByRole('checkbox');
  27 |     this.continueButton = page.getByRole('button', { name: 'Continue' });
  28 |   }
  29 | 
  30 |   /**
  31 |    * Verifies the registration form is displayed.
  32 |    * @returns true when the registration heading is visible
  33 |    */
  34 |   async isRegistrationPageDisplayed(): Promise<boolean> {
  35 |     const registrationHeading = this.page.getByRole('heading', { name: 'Register Account' });
  36 |     await registrationHeading.waitFor({ state: 'visible' });
  37 |     return registrationHeading.isVisible();
  38 |   }
  39 | 
  40 |   /**
  41 |    * Registers a customer with the supplied details.
  42 |    * @param firstName - Customer first name
  43 |    * @param lastName - Customer last name
  44 |    * @param email - Customer email address
  45 |    * @param telephone - Customer telephone number
  46 |    * @param password - Customer password
  47 |    */
  48 |   async register(
  49 |     firstName: string,
  50 |     lastName: string,
  51 |     email: string,
  52 |     telephone: string,
  53 |     password: string,
  54 |   ): Promise<void> {
  55 |     await this.firstNameInput.fill(firstName);
  56 |     await this.lastNameInput.fill(lastName);
  57 |     await this.emailInput.fill(email);
  58 |     await this.telephoneInput.fill(telephone);
  59 |     await this.passwordInput.fill(password);
  60 |     await this.passwordConfirmInput.fill(password);
  61 |     await this.privacyPolicyCheckbox.check();
  62 |     await this.continueButton.click();
  63 |   }
  64 | 
  65 |   /**
  66 |    * Verifies that registration succeeded.
  67 |    * @returns true when the account-created heading is visible
  68 |    */
  69 |   async isRegistrationSuccessful(): Promise<boolean> {
> 70 |     return this.page.getByRole('heading', { name: 'Your Account Has Been Created!' }).isVisible();
     |                                                                                       ^ Error: locator.isVisible: Target page, context or browser has been closed
  71 |   }
  72 | }
  73 | 
```