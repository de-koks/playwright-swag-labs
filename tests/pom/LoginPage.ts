import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    readonly notLoggedInErrorMessage: Locator;
    readonly usernameRequiredErrorMessage: Locator;
    readonly passwordRequiredErrorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = this.page.locator('[data-test="username"]');
        this.passwordInput = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.locator('[data-test="login-button"]');
        this.errorMessage = this.page.locator('[data-test="error"]');
        this.notLoggedInErrorMessage = this.errorMessage.getByText(
            "Epic sadface: You can only access '/inventory.html' when you are logged in.",
        );
        this.usernameRequiredErrorMessage = this.errorMessage.getByText(
            'Epic sadface: Username is required',
        );
        this.passwordRequiredErrorMessage = this.errorMessage.getByText(
            'Epic sadface: Password is required',
        );
    }

    // actions
    async goto() {
        await this.page.goto('/');
    }

    private async inputSecret(secret: string, input: Locator) {
        if (!process.env[secret]) {
            throw new Error(`${secret} is not defined in the environment variables`);
        }
        await input.fill(process.env[secret]);
    }

    async inputStandardUserUsername() {
        await this.inputSecret('STANDARD_USER', this.usernameInput);
    }

    async inputStandardUserPassword() {
        await this.inputSecret('PASSWORD', this.passwordInput);
    }
}
