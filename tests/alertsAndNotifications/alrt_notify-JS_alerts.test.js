import { test, expect } from '../base';
const browserType = process.env.BROWSER || 'chromium';
import testData  from '../../test_data/constants.json' with { type: 'json' };
const alerts = testData.alertsAndNotificationsFlow;
const messages = alerts.alertMessages;
const lastResult = alerts.lastDialogResult;
const promptInput = alerts.promptInput;

test.describe(`Alerts & Notifications tests - JS Alerts & Modals - ${browserType}`, () => {
    test('[TC-FRM-Add1] Validate whether all the JS Alerts buttons are visible', async ({ alertsAndNotificationsPage }) => {
        await alertsAndNotificationsPage.validateNativeJSDialogSection();
    });
    test('[TC-ALT-001] Verify whether clicking the JS Alert button triggers a native browser alert dialog', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click JS Alert Button', async () => {
            await alertsAndNotificationsPage.clickJSAlertButton();
        });
        await alertsAndNotificationsPage.validateTheAlertTrigger();
    });
    test('[TC-ALT-002] Verify whether the JS Alert dialog displays the correct message \'This is a native JavaScript alert.\' ', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click JS Alert Button', async () => {
            await alertsAndNotificationsPage.clickJSAlertButton();
        });
        await alertsAndNotificationsPage.validateTheAlertMessage(messages.jsAlert);
    });
    test('[TC-ALT-003] Verify whether clicking OK on the JS Alert dialog dismisses it successfully', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click JS Alert Button', async () => {
            await alertsAndNotificationsPage.clickJSAlertButton();
        });
        await test.step('Click OK after alert appears', async () => {
            await alertsAndNotificationsPage.clickOK();
        });
        await alertsAndNotificationsPage.validateAlertDismissed();
    });
    test('[TC-ALT-004] Verify whether the LAST DIALOG RESULT updates to \'Alert dialog was acknowledged.\' after accepting the JS Alert', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click JS Alert Button', async () => {
            await alertsAndNotificationsPage.clickJSAlertButton();
        });
        await test.step('Click OK Button', async () => {
            await alertsAndNotificationsPage.clickOK();
        });
        await alertsAndNotificationsPage.validateTheLastDialogResult(lastResult.jsAlert.ok);
    });
    test('[TC-ALT-008] Verify whether clicking the JS Confirm button triggers a native browser confirm dialog', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click JS Confirm Button', async () => {
            await alertsAndNotificationsPage.clickJSConfirmButton();
        });
        await alertsAndNotificationsPage.validateTheAlertTrigger();
    });
    test('[TC-ALT-009] Verify whether the JS Confirm dialog displays the correct message \'Do you want to proceed with this action? \'', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click JS Confirm Button', async () => {
            await alertsAndNotificationsPage.clickJSConfirmButton();
        });
        await alertsAndNotificationsPage.validateTheAlertMessage(messages.jsConfirm);
    });
    test('[TC-ALT-011] Verify whether clicking OK on the JS Confirm dialog updates LAST DIALOG RESULT to \'Confirm: user clicked OK.\'', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click JS Confirm Button', async () => {
            await alertsAndNotificationsPage.clickJSConfirmButton();
        });
        await test.step('Click OK Button', async () => {
            await alertsAndNotificationsPage.clickOK();
        });
        await alertsAndNotificationsPage.validateTheLastDialogResult(lastResult.jsConfirm.ok);
    });
    test('[TC-ALT-012] Verify whether clicking Cancel on the JS Confirm dialog updates LAST DIALOG RESULT to \'Confirm: user clicked Cancel.\'', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click JS Confirm Button', async () => {
            await alertsAndNotificationsPage.clickJSConfirmButton();
        });
        await test.step('Click Cancel Button', async () => {
            await alertsAndNotificationsPage.clickCancel('jsConfirm.cancel');
        });
        await alertsAndNotificationsPage.validateTheLastDialogResult(lastResult.jsConfirm.cancel);
    });
    test('[TC-ALT-016] Verify whether clicking the JS Prompt button triggers a native browser prompt dialog', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click JS Prompt Button', async () => {
            await alertsAndNotificationsPage.clickJSPromptButton();
        });
        await alertsAndNotificationsPage.validateTheAlertTrigger();
    });
    test('[TC-ALT-017] Verify whether the JS Prompt dialog displays the correct message \'What is your name?\'', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click JS Prompt Button', async () => {
            await alertsAndNotificationsPage.clickJSPromptButton();
        });
        await alertsAndNotificationsPage.validateTheAlertMessage(messages.jsPrompt);
    });
    test('[TC-ALT-019] Verify whether entering a valid name and clicking OK updates LAST DIALOG RESULT to \'Prompt: user entered [name].\'', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click JS Prompt Button', async () => {
            await alertsAndNotificationsPage.clickJSPromptButton();
        });
        await test.step('Enter a name', async () => {
            await alertsAndNotificationsPage.enterNameInAlert(promptInput.validName);
        });
        await test.step('Click OK Button', async () => {
            await alertsAndNotificationsPage.clickOK();
        });
        await alertsAndNotificationsPage.validateTheLastDialogResult(lastResult.jsPrompt.ok);
    });
    test('[TC-ALT-020] Verify whether clicking Cancel on the JS Prompt dialog updates LAST DIALOG RESULT to reflect cancellation', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click JS Prompt Button', async () => {
            await alertsAndNotificationsPage.clickJSPromptButton();
        });
        await test.step('Click Cancel Button', async () => {
            await alertsAndNotificationsPage.clickCancel('jsPrompt.cancel');
        });
        await alertsAndNotificationsPage.validateTheLastDialogResult(lastResult.jsPrompt.cancel);
    });
})