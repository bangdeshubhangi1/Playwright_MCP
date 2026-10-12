# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\end-to-end-shopping-flow.spec.ts >> End-to-end customer shopping flow @master @sanity @regression @web @e2e @end-to-end
- Location: tests\web\end-to-end-shopping-flow.spec.ts:5:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /tutorialsninja\.com\/demo/
Received string:  "https://awesomeqa.com/ui/"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × locator resolved to <html dir="ltr" lang="en">…</html>
       - unexpected value "https://awesomeqa.com/ui/"

```

```yaml
- navigation:
  - button "$ Currency ":
    - strong: $
    - text: Currency 
  - list:
    - listitem:
      - link "":
        - /url: https://awesomeqa.com/ui/index.php?route=information/contact
      - text: "123456789"
    - listitem:
      - link " My Account":
        - /url: https://awesomeqa.com/ui/index.php?route=account/account
    - listitem:
      - link " Wish List (0)":
        - /url: https://awesomeqa.com/ui/index.php?route=account/wishlist
    - listitem:
      - link " Shopping Cart":
        - /url: https://awesomeqa.com/ui/index.php?route=checkout/cart
    - listitem:
      - link " Checkout":
        - /url: https://awesomeqa.com/ui/index.php?route=checkout/checkout
- banner:
  - link "TheTestingAcademy eCommerce":
    - /url: https://awesomeqa.com/ui/index.php?route=common/home
    - img "TheTestingAcademy eCommerce"
  - textbox "Search"
  - button ""
  - button " 0 item(s) - $0.00"
- navigation:
  - list:
    - listitem:
      - link "Desktops":
        - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=20
    - listitem:
      - link "Laptops & Notebooks":
        - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=18
    - listitem:
      - link "Components":
        - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=25
    - listitem:
      - link "Tablets":
        - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=57
    - listitem:
      - link "Software":
        - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=17
    - listitem:
      - link "Phones & PDAs":
        - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=24
    - listitem:
      - link "Cameras":
        - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=33
    - listitem:
      - link "MP3 Players":
        - /url: https://awesomeqa.com/ui/index.php?route=product/category&path=34
- img "MacBookAir"
- link "iPhone 6":
  - /url: index.php?route=product/product&path=57&product_id=49
  - img "iPhone 6"
- img "MacBookAir"
- link "iPhone 6":
  - /url: index.php?route=product/product&path=57&product_id=49
  - img "iPhone 6"
- text:  
- heading "Featured" [level=3]
- link "MacBook":
  - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=43
  - img "MacBook"
- heading "MacBook" [level=4]:
  - link "MacBook":
    - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=43
- paragraph: Intel Core 2 Duo processor Powered by an Intel Core 2 Duo processor at speeds up to 2.1..
- paragraph: "$602.00 Ex Tax: $500.00"
- button " Add to Cart"
- button ""
- button ""
- link "iPhone":
  - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=40
  - img "iPhone"
- heading "iPhone" [level=4]:
  - link "iPhone":
    - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=40
- paragraph: iPhone is a revolutionary new mobile phone that allows you to make a call by simply tapping a nam..
- paragraph: "$123.20 Ex Tax: $101.00"
- button " Add to Cart"
- button ""
- button ""
- link "Apple Cinema 30\"":
  - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=42
  - img "Apple Cinema 30\""
- heading "Apple Cinema 30\"" [level=4]:
  - link "Apple Cinema 30\"":
    - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=42
- paragraph: The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed sp..
- paragraph: "$110.00 $122.00 Ex Tax: $90.00"
- button " Add to Cart"
- button ""
- button ""
- link "Canon EOS 5D":
  - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=30
  - img "Canon EOS 5D"
- heading "Canon EOS 5D" [level=4]:
  - link "Canon EOS 5D":
    - /url: https://awesomeqa.com/ui/index.php?route=product/product&product_id=30
- paragraph: Canon's press material for the EOS 5D states that it 'defines (a) new D-SLR category', while we'r..
- paragraph: "$98.00 $122.00 Ex Tax: $80.00"
- button " Add to Cart"
- button ""
- button ""
- img "NFL"
- img "RedBull"
- img "Sony"
- img "Starbucks"
- img "Nintendo"
- img "Harley Davidson"
- img "Dell"
- img "Disney"
- img "Coca Cola"
- img "Burger King"
- img "Canon"
- img "NFL"
- img "RedBull"
- img "Sony"
- img "Starbucks"
- img "Nintendo"
- img "Harley Davidson"
- img "Dell"
- img "Disney"
- img "Coca Cola"
- img "Burger King"
- text:  
- contentinfo:
  - heading "Information" [level=5]
  - list:
    - listitem:
      - link "About Us":
        - /url: https://awesomeqa.com/ui/index.php?route=information/information&information_id=4
    - listitem:
      - link "Delivery Information":
        - /url: https://awesomeqa.com/ui/index.php?route=information/information&information_id=6
    - listitem:
      - link "Privacy Policy":
        - /url: https://awesomeqa.com/ui/index.php?route=information/information&information_id=3
    - listitem:
      - link "Terms & Conditions":
        - /url: https://awesomeqa.com/ui/index.php?route=information/information&information_id=5
  - heading "Customer Service" [level=5]
  - list:
    - listitem:
      - link "Contact Us":
        - /url: https://awesomeqa.com/ui/index.php?route=information/contact
    - listitem:
      - link "Returns":
        - /url: https://awesomeqa.com/ui/index.php?route=account/return/add
    - listitem:
      - link "Site Map":
        - /url: https://awesomeqa.com/ui/index.php?route=information/sitemap
  - heading "Extras" [level=5]
  - list:
    - listitem:
      - link "Brands":
        - /url: https://awesomeqa.com/ui/index.php?route=product/manufacturer
    - listitem:
      - link "Gift Certificates":
        - /url: https://awesomeqa.com/ui/index.php?route=account/voucher
    - listitem:
      - link "Affiliate":
        - /url: https://awesomeqa.com/ui/index.php?route=affiliate/login
    - listitem:
      - link "Specials":
        - /url: https://awesomeqa.com/ui/index.php?route=product/special
  - heading "My Account" [level=5]
  - list:
    - listitem:
      - link "My Account":
        - /url: https://awesomeqa.com/ui/index.php?route=account/account
    - listitem:
      - link "Order History":
        - /url: https://awesomeqa.com/ui/index.php?route=account/order
    - listitem:
      - link "Wish List":
        - /url: https://awesomeqa.com/ui/index.php?route=account/wishlist
    - listitem:
      - link "Newsletter":
        - /url: https://awesomeqa.com/ui/index.php?route=account/newsletter
  - separator
  - paragraph:
    - text: Powered By
    - link "OpenCart":
      - /url: http://www.opencart.com
    - text: TheTestingAcademy eCommerce © 2026
```

# Test source

```ts
  1  | import { test, expect } from '../../fixtures/pageFixtures';
  2  | import { RandomDataUtil } from '../../utils/dataGenerator';
  3  | import { Helper } from '../../utils/helper';
  4  | 
  5  | test('End-to-end customer shopping flow @master @sanity @regression @web @e2e @end-to-end', async ({
  6  |   page,
  7  |   homePage,
  8  |   registrationPage,
  9  |   loginPage,
  10 |   accountPage,
  11 |   searchResultsPage,
  12 |   productPage,
  13 |   cartPage,
  14 | }) => {
  15 |   const firstName = RandomDataUtil.getFirstName();
  16 |   const lastName = RandomDataUtil.getLastName();
  17 |   const email = `qa-${Date.now()}-${RandomDataUtil.getEmail()}`;
  18 |   const telephone = RandomDataUtil.getPhoneNumber();
  19 |   const password = RandomDataUtil.getPassword(12);
  20 |   const { productName, productQuantity, totalPrice } = Helper.getProductDetails();
  21 | 
  22 |   await test.step('1) Open the application', async () => {
  23 |     await expect(page).toHaveTitle('Your Store');
> 24 |     await expect(page).toHaveURL(/tutorialsninja\.com\/demo/);
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  25 |   });
  26 | 
  27 |   await test.step('2) Navigate to customer registration', async () => {
  28 |     await homePage.openRegistration();
  29 |     expect(await registrationPage.isRegistrationPageDisplayed()).toBeTruthy();
  30 |   });
  31 | 
  32 |   await test.step('3) Register a new customer with generated data', async () => {
  33 |     await registrationPage.register(firstName, lastName, email, telephone, password);
  34 |   });
  35 | 
  36 |   await test.step('4) Verify successful registration', async () => {
  37 |     expect(await registrationPage.isRegistrationSuccessful()).toBeTruthy();
  38 |   });
  39 | 
  40 |   await test.step('5) Log out and verify signed-out state', async () => {
  41 |     await accountPage.logout();
  42 |     expect(await accountPage.isLogoutConfirmationDisplayed()).toBeTruthy();
  43 |     await accountPage.continueAfterLogout();
  44 |     expect(await accountPage.isLoggedOut()).toBeTruthy();
  45 |   });
  46 | 
  47 |   await test.step('6) Log in again with the new customer credentials', async () => {
  48 |     await homePage.openLogin();
  49 |     expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  50 |     await loginPage.login(email, password);
  51 |   });
  52 | 
  53 |   await test.step('7) Verify successful authentication', async () => {
  54 |     expect(await accountPage.isAccountPageDisplayed()).toBeTruthy();
  55 |   });
  56 | 
  57 |   await test.step('8) Search for the known product', async () => {
  58 |     await homePage.searchFor(productName);
  59 |     expect(await searchResultsPage.isSearchResultsPageDisplayed()).toBeTruthy();
  60 |   });
  61 | 
  62 |   await test.step('9) Open and verify product details', async () => {
  63 |     await searchResultsPage.openProduct(productName);
  64 |     expect(await productPage.isProductPageDisplayed(productName)).toBeTruthy();
  65 |     expect(await productPage.getDisplayedPrice(totalPrice)).toBe(totalPrice);
  66 |   });
  67 | 
  68 |   await test.step('10) Add the product to the cart', async () => {
  69 |     await productPage.setQuantity(productQuantity);
  70 |     await productPage.addToCart();
  71 |     expect(await productPage.isAddedToCartMessageDisplayed(productName)).toBeTruthy();
  72 |   });
  73 | 
  74 |   await test.step('11) Open the shopping cart', async () => {
  75 |     await homePage.openShoppingCart();
  76 |     await expect(page).toHaveTitle('Shopping Cart');
  77 |   });
  78 | 
  79 |   await test.step('12) Verify product, quantity, price, and cart total', async () => {
  80 |     expect(await cartPage.isProductInCart(productName)).toBeTruthy();
  81 |     expect(await cartPage.getProductQuantity(productName)).toBe(productQuantity);
  82 |     expect(await cartPage.getProductUnitPrice(productName)).toBe(totalPrice);
  83 |     expect(await cartPage.getProductLineTotal(productName)).toBe(totalPrice);
  84 |     expect(await cartPage.getCartTotal()).toBe(totalPrice);
  85 |   });
  86 | 
  87 |   console.log('End-to-end shopping flow completed successfully.');
  88 | });
  89 | 
```