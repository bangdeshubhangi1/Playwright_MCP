import { Page } from '@playwright/test';

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
   * Opens an exact product result.
   * @param productName - Product name to open
   */
  async openProduct(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName, exact: true }).first().click();
  }
}
