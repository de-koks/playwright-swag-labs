import test, { expect } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';

test.describe('Login page', () => {
    let loginPage: LoginPage;

    test.beforeEach('Open Login page', async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Should display error message upon "Login" button click with empty "Username"', async ({
        page,
    }) => {
        await loginPage.loginButton.click();
        await expect(loginPage.usernameRequiredErrorMessage).toBeVisible();
    });

    test('Should display error message upon "Login" button click with empty "Password"', async ({
        page,
    }) => {
        await loginPage.inputStandardUserUsername();
        await loginPage.loginButton.click();
        await expect(loginPage.passwordRequiredErrorMessage).toBeVisible();
    });
});
