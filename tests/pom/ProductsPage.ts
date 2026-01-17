import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // actions
    async goto() {
        await this.page.goto('/inventory.html');
    }
}
