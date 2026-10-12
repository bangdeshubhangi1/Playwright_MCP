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
  const { productName, productQuantity, productPrice, totalPrice } = Helper.getProductDetails();

  await test.step('1) Open the application', async () => {
    await expect(page).toHaveTitle('Your Store');
    await expect(page).toHaveURL(/tutorialsninja\.com\/demo/);
  });

  await test.step('2) Register a new customer using unique generated data', async () => {
    await homePage.openRegistration();
    expect(await registrationPage.isRegistrationPageDisplayed()).toBeTruthy();
    await registrationPage.register(firstName, lastName, email, telephone, password);
  });

  await test.step('3) Verify successful registration', async () => {
    expect(await registrationPage.isRegistrationSuccessful()).toBeTruthy();
  });

  await test.step('4) Log out', async () => {
    await accountPage.logout();
    expect(await accountPage.isLogoutConfirmationDisplayed()).toBeTruthy();
    await accountPage.continueAfterLogout();
    expect(await accountPage.isLoggedOut()).toBeTruthy();
  });

  await test.step('5) Log in with the new credentials', async () => {
    await homePage.openLogin();
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
    await loginPage.login(email, password);
  });

  await test.step('6) Verify successful authentication', async () => {
    expect(await accountPage.isAccountPageDisplayed()).toBeTruthy();
  });

  await test.step('7) Open Shop All Desktops', async () => {
    await homePage.openAllDesktops();
    await expect(page).toHaveTitle('Desktops');
  });

  await test.step('8) Find the in-stock Product 8', async () => {
    expect(await searchResultsPage.isProductDisplayed(productName)).toBeTruthy();
    await searchResultsPage.openProduct(productName);
  });

  await test.step('9) Open Product 8 details', async () => {
    expect(await productPage.isProductPageDisplayed(productName)).toBeTruthy();
    expect(await productPage.isInStock()).toBeTruthy();
    expect(await productPage.getDisplayedPrice(productPrice)).toBe(productPrice);
  });

  await test.step('10) Select the Large size option', async () => {
    await productPage.selectSize('Large (+$18.00)');
  });

  await test.step('11) Add Product 8 to the cart', async () => {
    await productPage.setQuantity(productQuantity);
    await productPage.addToCart();
    expect(await productPage.isAddedToCartMessageDisplayed(productName)).toBeTruthy();
  });

  await test.step('12) Open the shopping cart', async () => {
    await homePage.openShoppingCart();
    await expect(page).toHaveTitle('Shopping Cart');
  });

  await test.step('13) Verify the product and selected size', async () => {
    expect(await cartPage.isProductInCart(productName)).toBeTruthy();
    expect(await cartPage.getProductDetails(productName)).toContain('Size:Large');
  });

  await test.step('14) Verify the quantity', async () => {
    expect(await cartPage.getProductQuantity(productName)).toBe(productQuantity);
  });

  await test.step('15) Verify product price and cart total', async () => {
    expect(await cartPage.getProductUnitPrice(productName)).toBe(totalPrice);
    expect(await cartPage.getProductLineTotal(productName)).toBe(totalPrice);
    expect(await cartPage.getCartTotal()).toBe(totalPrice);
  });

  await test.step('16) Verify the shopping journey completed successfully', async () => {
    expect(await cartPage.isProductInCart(productName)).toBeTruthy();
    console.log('End-to-end shopping flow completed successfully.');
  });
});
