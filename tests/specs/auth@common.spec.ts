import { test as setup } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';
import { ProductsPage } from '../pom/ProductsPage';
import path from 'path';

const authFile = path.join(__dirname, '../../playwright/.auth/standard_user.json');

setup('Log in as standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.inputStandardUserUsername();
    await loginPage.inputStandardUserPassword();
    await loginPage.loginButton.click();

    const productsPage = new ProductsPage(page);
    await productsPage.waitUntilLoaded();
    await page.context().storageState({ path: authFile });
});
