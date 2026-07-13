import { test, expect } from '../base';
const browserType = process.env.BROWSER || 'chromium';
import testData from '../../test_data/constants.json' with { type: 'json' };
const alerts = testData.alertsAndNotificationsFlow;
const lastResult = alerts.lastDialogResult;
const messages = alerts.alertMessages;
const promptInput = alerts.promptInput;

test.describe(`Alerts & Notifications tests - Custom Alerts & Modals - ${browserType}`, () => {
    test('[TC-FRM-Add2] Validate whether all the Custom Alerts buttons are visible', async ({ alertsAndNotificationsPage }) => {
        await alertsAndNotificationsPage.validateModalDialogSection();
    });
    test('[TC-ALT-024] Verify whether clicking \'Open Info Modal\' button opens the Info modal dialog', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Info Modal\' Button', async () => {
            await alertsAndNotificationsPage.openInfoModal();
        });
        await alertsAndNotificationsPage.validateTheModalOpened('info');
    });
    test('[TC-ALT-025] Verify whether the Info modal displays the title \'About this page\'', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Info Modal\' Button', async () => {
            await alertsAndNotificationsPage.openInfoModal();
        });
        await alertsAndNotificationsPage.validateModalTitle('info');
    });
    test('[TC-ALT-027] Verify whether clicking the \'Got it\' button closes the Info modal', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Info Modal\' Button', async () => {
            await alertsAndNotificationsPage.openInfoModal();
        });
        await test.step('Click Got it', async () => {
            await alertsAndNotificationsPage.clickGotIt();
        });
        await alertsAndNotificationsPage.validateModalDisappeared('info');
    });
    test('[TC-ALT-028] Verify whether LAST DIALOG RESULT updates to \'Info modal acknowledged.\' after closing the Info modal via Got it button', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Info Modal\' Button', async () => {
            await alertsAndNotificationsPage.openInfoModal();
        });
        await test.step('Click Got it', async () => {
            await alertsAndNotificationsPage.clickGotIt();
        });
        await alertsAndNotificationsPage.validateTheLastDialogResult(lastResult.infoModal.ok);
    });
    test('[TC-ALT-029] Verify whether clicking the X (close) button on the Info modal closes it and the LAST DIALOG RESULT updates to \'Info modal closed.\' ', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Info Modal\' Button', async () => {
            await alertsAndNotificationsPage.openInfoModal();
        });
        await test.step('Close the dialog', async () => {
            await alertsAndNotificationsPage.closeDialog('info');
        });
        await alertsAndNotificationsPage.validateModalDisappeared('info');
        await alertsAndNotificationsPage.validateTheLastDialogResult(lastResult.infoModal.closed);
    });
    test('[TC-ALT-035] Verify whether clicking \'Open Confirm Modal\' button opens the Confirm modal dialog', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Confirm Modal\' button', async () => {
            await alertsAndNotificationsPage.openConfirmModal();
        });
        await alertsAndNotificationsPage.validateTheModalOpened('confirm');
    });
    test('[TC-ALT-036] Verify whether the Confirm modal displays the title \'Delete item?\'', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Confirm Modal\' button', async () => {
            await alertsAndNotificationsPage.openConfirmModal();
        });
        await alertsAndNotificationsPage.validateModalTitle('confirm');
    });
    test('[TC-ALT-037] Verify whether the Confirm modal displays the warning text \'This action cannot be undone. Are you sure you want to permanently delete this item?\'', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Confirm Modal\' button', async () => {
            await alertsAndNotificationsPage.openConfirmModal();
        });
        await alertsAndNotificationsPage.validateModalWarningText(messages.confirmModal);
    });
    test('[TC-ALT-039] Verify whether clicking the Delete button closes the Confirm modal', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Confirm Modal\' button', async () => {
            await alertsAndNotificationsPage.openConfirmModal();
        });
        await test.step('Click Delete', async () => {
            await alertsAndNotificationsPage.clickDelete();
        });
        await alertsAndNotificationsPage.validateModalDisappeared('confirm');
    });
    test('[TC-ALT-040] Verify whether clicking the Delete button updates LAST DIALOG RESULT to \'Modal confirm: item deleted.\'', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Confirm Modal\' button', async () => {
            await alertsAndNotificationsPage.openConfirmModal();
        });
        await test.step('Click Delete', async () => {
            await alertsAndNotificationsPage.clickDelete();
        });
        await alertsAndNotificationsPage.validateTheLastDialogResult(lastResult.confirmModal.ok);
    });
    test('[TC-ALT-041] Verify whether clicking the Delete button triggers a Success toast displaying \'Item deleted successfully.\'', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Confirm Modal\' button', async () => {
            await alertsAndNotificationsPage.openConfirmModal();
        });
        await test.step('Click Delete', async () => {
            await alertsAndNotificationsPage.clickDelete();
        });
        await alertsAndNotificationsPage.validateSuccessToastMessage('Item deleted successfully.');
    });
    test('[TC-ALT-042] Verify whether clicking the Cancel button closes the Confirm modal without performing any action', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Confirm Modal\' button', async () => {
            await alertsAndNotificationsPage.openConfirmModal();
        });
        await test.step('Click cancel', async () => {
            await alertsAndNotificationsPage.clickCancel();
        });
        await alertsAndNotificationsPage.validateModalDisappeared('confirm');
    });
    test('[TC-ALT-043] Verify whether clicking Cancel updates LAST DIALOG RESULT to \'Modal form: cancelled.\'', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Confirm Modal\' button', async () => {
            await alertsAndNotificationsPage.openConfirmModal();
        });
        await test.step('Click cancel', async () => {
            await alertsAndNotificationsPage.clickCancel();
        });
        await alertsAndNotificationsPage.validateTheLastDialogResult(lastResult.confirmModal.cancel);
    });
    test('[TC-ALT-044] Verify whether clicking the X button closes the Confirm modal', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Confirm Modal\' button', async () => {
            await alertsAndNotificationsPage.openConfirmModal();
        });
        await test.step('Close the modal by clicking the X', async () => {
            await alertsAndNotificationsPage.closeDialog('confirm');
        });
        await alertsAndNotificationsPage.validateModalDisappeared('confirm');
    });
    test('[TC-ALT-049] Verify whether clicking \'Open Form Modal\' button opens the Form modal dialog', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Form Modal\' button', async () =>{
            await alertsAndNotificationsPage.openFormModal();
        });
        await alertsAndNotificationsPage.validateTheModalOpened('form');
    });
    test('[TC-ALT-050] Verify whether the Form modal displays the title \'Set a nickname\'', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Form Modal\' button', async () => {
            await alertsAndNotificationsPage.openFormModal();
        });
        await alertsAndNotificationsPage.validateModalTitle('form');
    });
    test('[TC-ALT-053] Verify whether entering a valid nickname and clicking Save closes the modal successfully', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Form Modal\' button', async () => {
            await alertsAndNotificationsPage.openFormModal();
        });
        await test.step('Enter Nickname', async () => {
            await alertsAndNotificationsPage.enterNickName(promptInput.validName);
        });
        await test.step('Click Save', async () => {
            await alertsAndNotificationsPage.clickSave();
        });
        await alertsAndNotificationsPage.validateModalDisappeared('form');
    });
    test.only('[TC-ALT-054] Verify whether LAST DIALOG RESULT updates to \'Modal form: saved nickname [name].\' after saving a valid nickname', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Form Modal\' button', async () => {
            await alertsAndNotificationsPage.openFormModal();
        });
        await test.step('Enter Nickname', async () => {
            await alertsAndNotificationsPage.enterNickName(promptInput.validName);
        });
        await test.step('Click Save', async () => {
            await alertsAndNotificationsPage.clickSave();
        });
        await alertsAndNotificationsPage.validateTheLastDialogResult(lastResult.formModal.ok+` \"${promptInput.validName}\".`);
    });
    test('[TC-ALT-055] Verify whether saving a valid nickname triggers a Success toast displaying \'Saved nickname: [name]\'', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Form Modal\' button', async () => {
            await alertsAndNotificationsPage.openFormModal();
        });
        await test.step('Enter Nickname', async () => {
            await alertsAndNotificationsPage.enterNickName(promptInput.validName);
        });
        await test.step('Click Save', async () => {
            await alertsAndNotificationsPage.clickSave();
        });
        await alertsAndNotificationsPage.validateSuccessToastMessage(`Saved nickname: ${promptInput.validName}`);
    });
    test('[TC-ALT-056] Verify whether clicking Save with the Nickname field empty shows a validation error', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Form Modal\' button', async () => {
            await alertsAndNotificationsPage.openFormModal();
        });
        await test.step('Click Save', async () => {
            await alertsAndNotificationsPage.clickSave();
        });
        await alertsAndNotificationsPage.validateInlineErrorMessage('Nickname is required.');
    });
    test('[TC-ALT-060] Verify whether clicking Cancel on the Form modal closes it without saving any data', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Form Modal\' button', async () => {
            await alertsAndNotificationsPage.openFormModal();
        });
        await test.step('Click cancel', async () => {
            await alertsAndNotificationsPage.clickCancel();
        });
        await alertsAndNotificationsPage.validateModalDisappeared('form');
    });
    test('[TC-ALT-061] Verify whether clicking Cancel updates LAST DIALOG RESULT to \'Modal form: cancelled.\'', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Form Modal\' button', async () => {
            await alertsAndNotificationsPage.openFormModal();
        });
        await test.step('Click cancel', async () => {
            await alertsAndNotificationsPage.clickCancel();
        });
        await alertsAndNotificationsPage.validateTheLastDialogResult(lastResult.formModal.cancel);
    });
    test('[TC-ALT-062] Verify whether clicking the X button on the Form modal closes it without saving', async ({ alertsAndNotificationsPage }) => {
        await test.step('Click \'Open Form Modal\' button', async () => {
            await alertsAndNotificationsPage.openFormModal();
        });
        await test.step('Close the form dialog', async () => {
            await alertsAndNotificationsPage.closeDialog('form');
        });
        await alertsAndNotificationsPage.validateModalDisappeared('form');
    });
});