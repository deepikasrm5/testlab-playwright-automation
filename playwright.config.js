// @ts-check
/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';
import config from './config/config.json' with { type: 'json' };

const { baseUrl } = config;
/** @type {'chromium' | 'firefox' | 'webkit'} */
// @ts-ignore
const targetedBrowser = process.env.BROWSER || 'chromium';

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const browserDevices = {
  chromium: devices['Desktop Chrome'],
  firefox: devices['Desktop Firefox'],
  webkit: devices['Desktop Safari'],
};

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: true
    }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    ...browserDevices[targetedBrowser],
    baseURL: baseUrl,
    storageState: 'storageState.json',
    headless: process.env.CI === 'true',
    trace: 'on',
    slowMo: process.env.CI === 'true' ? 0 : 800,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: "tests/setup.js",
      use: {
        storageState: undefined
      }
    },
    {
      name: "loginFlow",
      testMatch: "tests/login/*",
    },
    {
      name: "formsFlow",
      testMatch: "tests/forms/*",
      dependencies: ["setup"]
    },
    {
      name: "alertsAndNotificationsFlow",
      testMatch: "tests/alertsAndNotifications/*",
      dependencies: ["setup"]
    }
  ],
});

