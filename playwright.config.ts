import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests/specs',
    /* Run tests in files in parallel */
    expect: {
        // toHaveScreenshot: {
        //   pathTemplate: '{testDir}/screenshots/{projectName}/{testFilePath}/{arg}{ext}',
        // },
        toMatchAriaSnapshot: {
            pathTemplate: '{testDir}/snapshots/{projectName}/{testFilePath}/{arg}{ext}',
        },
    },
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        baseURL: 'https://www.saucedemo.com',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        screenshot: 'on-first-failure',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'Desktop Chrome non-auth',
            use: { ...devices['Desktop Chrome'] },
            testMatch: '/non-auth/*@(common|desktop).spec.ts',
        },
        // {
        //     name: 'Mobile Safari non-auth',
        //     use: { ...devices['iPhone 15'] },
        //     testMatch: '/non-auth/*@(common|mobile).spec.ts',
        // },
        {
            name: 'Desktop Chrome auth',
            use: {
                ...devices['Desktop Chrome'],
                storageState: 'playwright/.auth/standard_user.json',
            },
            testMatch: '/auth/*@(common|desktop).spec.ts',
            dependencies: ['auth'],
        },
        // {
        //     name: 'Mobile Safari auth',
        //     use: {
        //         ...devices['iPhone 15'],
        //         storageState: 'playwright/.auth/standard_user.json',
        //     },
        //     testMatch: '/auth/*@(common|mobile).spec.ts',
        //     dependencies: ['auth'],
        // },
        {
            name: 'auth',
            testMatch: 'tests/specs/auth@common.spec.ts',
        },
    ],
});
