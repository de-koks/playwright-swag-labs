import test, { expect } from '@playwright/test';
import { LoginPage } from '../../pom/LoginPage';
import { ProductsPage } from '../../pom/ProductsPage';

test.describe('Login page inputs validation', () => {
    let loginPage: LoginPage;

    test.beforeEach('Open Login page', async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Should display error message upon "Login" button click with empty "Username"', async () => {
        await loginPage.loginButton.click();
        await expect(loginPage.usernameRequiredErrorMessage).toBeVisible();
    });

    test('Should display error message upon "Login" button click with empty "Password"', async () => {
        await loginPage.inputStandardUserUsername();
        await loginPage.loginButton.click();
        await expect(loginPage.passwordRequiredErrorMessage).toBeVisible();
    });
});

test('Should display error message upon navigating to Products page being unauthorized', async ({
    page,
}) => {
    const productsPage = new ProductsPage(page);
    const loginPage = new LoginPage(page);
    await productsPage.goto();
    await expect(loginPage.notLoggedInErrorMessage).toBeVisible();
});
