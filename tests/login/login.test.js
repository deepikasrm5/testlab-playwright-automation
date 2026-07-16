import { test, expect } from '../base';
import { config } from '../../config/config.js';
const browserType = process.env.BROWSER || 'chromium';

test.describe(`Login Tests - ${browserType}`, () => {
    test('[TC-LGN-006] Validate error message appears if we try to login with empty username and password fields', async ({ loginPage }) => {
        await loginPage.navigate(config.baseUrl);
        await loginPage.clickSignIn();
        await loginPage.validateErrorMessage();
    });
    test('[TC-LGN-007] Validate error message appears if we try to login with empty password field', async ({ loginPage }) => {
        await loginPage.navigate(config.baseUrl);
        await loginPage.login(config.valid.username, '');
        await loginPage.validateErrorMessage();
    });
    test('[TC-LGN-008] Validate error message appears if we try to login with empty username field', async ({ loginPage }) => {
        await loginPage.navigate(config.baseUrl);
        await loginPage.login('', config.valid.password);
        await loginPage.validateErrorMessage();
    });
    test('[TC-LGN-004] Validate error message appears if we try to login with valid username and invalid password', async ({ loginPage }) => {
        await loginPage.navigate(config.baseUrl);
        await loginPage.login(config.valid.username, config.invalid.password);
        await loginPage.validateErrorMessage();
    });
    test('[TC-LGN-005] Validate error message appears if we try to login with invalid username and valid password', async ({ loginPage }) => {
        await loginPage.navigate(config.baseUrl);
        await loginPage.login(config.invalid.username, config.valid.password);
        await loginPage.validateErrorMessage();
    });
    test('[TC-LGN-002] Validate whether show password toggle is working or not', async ({ loginPage }) => {
        await loginPage.navigate(config.baseUrl);
        await loginPage.enterUsername(config.valid.username);
        await loginPage.enterPassword(config.valid.password);
        await loginPage.clickVisibilityToggle();
        const passwordFieldType = await loginPage.getPasswordFieldType();
        await expect(passwordFieldType).toBe('text');
    });
    test('[TC-LGN-003] Validate whether hide password toggle is working or not', async ({ loginPage }) => {
        await loginPage.navigate(config.baseUrl);
        await loginPage.enterUsername(config.valid.username);
        await loginPage.enterPassword(config.valid.password);
        await loginPage.clickVisibilityToggle(); // Show password
        await loginPage.clickVisibilityToggle();
        const passwordFieldType = await loginPage.getPasswordFieldType();
        await expect(passwordFieldType).toBe('password');
    });
    test('[TC-LGN-001] Validate whether login is successful with valid credentials', async ({ loginPage }) => {
        await loginPage.navigate(config.baseUrl);
        await loginPage.login(config.valid.username, config.valid.password);
        await expect(loginPage.page).toHaveURL(config.baseUrl + 'dashboard');
    });
});