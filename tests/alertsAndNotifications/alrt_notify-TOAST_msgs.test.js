import { test, expect } from '../base';
import config from '../../config/config.json' with { type: 'json' };
const browserType = process.env.BROWSER || 'chromium';

test.describe(`Alerts & Notifications tests - Toast Messages - ${browserType}`, () => {
    test('[TC-ALT-Add3] Validate whether the toast notifications section is visible', async ({ alertsAndNotificationsPage }) => {
        await alertsAndNotificationsPage.validateToastNotificationSection();
    });
    test('[TC-ALT-066] Verify whether clicking \'Show Success Toast\' button displays a green toast notification at the top-right corner', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Show Success toast\' button', async () => {
            await alertsAndNotificationsPage.clickSuccessToast();
        });
        await alertsAndNotificationsPage.validateSuccessToastMessage();
    });
    test('[TC-ALT-072] Verify whether clicking \'Show Error Toast\' button displays a red toast notification at the top-right corner', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Show Error toast\' button', async () => {
            await alertsAndNotificationsPage.clickErrorToast();
        });
        await alertsAndNotificationsPage.validateErrorToastMessage(); 
    });
    test('[TC-ALT-077] Verify whether clicking \'Show Warning Toast\' button displays a yellow/orange toast notification at the top-right corner', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Show Warning toast\' button', async () => {
            await alertsAndNotificationsPage.clickWarningToast();
        });
        await alertsAndNotificationsPage.validateWarningToastMessage();
    });
})