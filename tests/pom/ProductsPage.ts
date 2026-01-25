import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    private readonly endpoint: string;
    private readonly cartLink: Locator;

    constructor(page: Page) {
        super(page);
        this.endpoint = '/inventory.html';
        this.cartLink = this.page.locator('[data-test="shopping-cart-link"]');
    }

    // actions
    async goto() {
        await this.page.goto(this.endpoint);
    }

    async waitUntilLoaded() {
        await this.page.waitForURL(this.endpoint);
        await expect(this.cartLink).toBeVisible();
    }

    // assertions
    async verifyPageAriaSnapshot() {
        await expect(this.page.locator('body')).toMatchAriaSnapshot({ name: 'productsPage.yml' });
    }
}
