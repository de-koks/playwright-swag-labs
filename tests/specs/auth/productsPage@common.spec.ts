import test from '@playwright/test';
import { ProductsPage } from '../../pom/ProductsPage';

test.describe('Products page', () => {
    test('Should match page ARIA snapshot when logged in as standard user', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.goto();
        await productsPage.verifyPageAriaSnapshot();
    });
});
