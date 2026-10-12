import { Locator, Page } from '@playwright/test';

export class SearchResultsPage {
  private readonly page: Page;

  // Locators
  private readonly productSearchHeading;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.productSearchHeading = page.getByRole('heading', { name: /^Search - / });
  }

  /**
   * Verifies a product search results page is displayed.
   * @returns true when a search-results heading is visible
   */
  async isSearchResultsPageDisplayed(): Promise<boolean> {
    return this.productSearchHeading.isVisible();
  }

  /**
   * Verifies an exact product is available in the current product listing.
   * @param productName - Product name to find
   * @returns true when a matching product link is visible
   */
  async isProductDisplayed(productName: string): Promise<boolean> {
    return this.productLink(productName).isVisible();
  }

  /**
   * Opens an exact product result.
   * @param productName - Product name to open
   */
  async openProduct(productName: string): Promise<void> {
    await this.productLink(productName).click();
  }

  private productLink(productName: string): Locator {
    return this.page
      .locator('#content .product-thumb h4')
      .filter({ hasText: productName })
      .getByRole('link', { name: productName, exact: true });
  }
}
