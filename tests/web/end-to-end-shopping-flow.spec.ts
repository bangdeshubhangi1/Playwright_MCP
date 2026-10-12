import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('End-to-end customer shopping flow @master @sanity @regression @web @e2e @end-to-end', async ({
  page,
  homePage,
  registrationPage,
  loginPage,
  accountPage,
  searchResultsPage,
  productPage,
  cartPage,
}) => {
  const firstName = RandomDataUtil.getFirstName();
  const lastName = RandomDataUtil.getLastName();
  const email = `qa-${Date.now()}-${RandomDataUtil.getEmail()}`;
  const telephone = RandomDataUtil.getPhoneNumber();
  const password = RandomDataUtil.getPassword(12);
  const { productName, productQuantity, totalPrice } = Helper.getProductDetails();

  await test.step('1) Open the application', async () => {
    await expect(page).toHaveTitle('Your Store');
    await expect(page).toHaveURL(/tutorialsninja\.com\/demo/);
  });

  await test.step('2) Navigate to customer registration', async () => {
    await homePage.openRegistration();
    expect(await registrationPage.isRegistrationPageDisplayed()).toBeTruthy();
  });

  await test.step('3) Register a new customer with generated data', async () => {
    await registrationPage.register(firstName, lastName, email, telephone, password);
  });

  await test.step('4) Verify successful registration', async () => {
    expect(await registrationPage.isRegistrationSuccessful()).toBeTruthy();
  });

  await test.step('5) Log out and verify signed-out state', async () => {
    await accountPage.logout();
    expect(await accountPage.isLogoutConfirmationDisplayed()).toBeTruthy();
    await accountPage.continueAfterLogout();
    expect(await accountPage.isLoggedOut()).toBeTruthy();
  });

  await test.step('6) Log in again with the new customer credentials', async () => {
    await homePage.openLogin();
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
    await loginPage.login(email, password);
  });

  await test.step('7) Verify successful authentication', async () => {
    expect(await accountPage.isAccountPageDisplayed()).toBeTruthy();
  });

  await test.step('8) Search for the known product', async () => {
    await homePage.searchFor(productName);
    expect(await searchResultsPage.isSearchResultsPageDisplayed()).toBeTruthy();
  });

  await test.step('9) Open and verify product details', async () => {
    await searchResultsPage.openProduct(productName);
    expect(await productPage.isProductPageDisplayed(productName)).toBeTruthy();
    expect(await productPage.getDisplayedPrice(totalPrice)).toBe(totalPrice);
  });

  await test.step('10) Add the product to the cart', async () => {
    await productPage.setQuantity(productQuantity);
    await productPage.addToCart();
    expect(await productPage.isAddedToCartMessageDisplayed(productName)).toBeTruthy();
  });

  await test.step('11) Open the shopping cart', async () => {
    await homePage.openShoppingCart();
    await expect(page).toHaveTitle('Shopping Cart');
  });

  await test.step('12) Verify product, quantity, price, and cart total', async () => {
    expect(await cartPage.isProductInCart(productName)).toBeTruthy();
    expect(await cartPage.getProductQuantity(productName)).toBe(productQuantity);
    expect(await cartPage.getProductUnitPrice(productName)).toBe(totalPrice);
    expect(await cartPage.getProductLineTotal(productName)).toBe(totalPrice);
    expect(await cartPage.getCartTotal()).toBe(totalPrice);
  });

  console.log('End-to-end shopping flow completed successfully.');
});
