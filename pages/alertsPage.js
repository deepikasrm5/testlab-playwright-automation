import { expect } from "../tests/base";
import { DashboardPage } from "./dashboard";
export class AlertsAndNotificationsPage {
    constructor(page) {
        this.page = page;

        this.dashboard = new DashboardPage(page);

        this.alertsTitle = page.getByRole('heading', { name: 'Alerts & Notifications', level: 1 });

        // Javascript alerts locators
        this.jsAlertTitle = page.getByRole('heading', { name: 'Native JS dialogs' });
        this.jsAlertButton = page.getByRole('button', { name: 'JS Alert' });
        this.jsConfirmButton = page.getByRole('button', { name: 'JS Confirm' });
        this.jsPromptButton = page.getByRole('button', { name: 'JS Prompt' });

        // Custom modal alerts locators
        this.customModalAlertsTitle = page.getByRole('heading', { name: 'Modal dialogs' });
        this.infoModalButton = page.getByRole('button', { name: 'Open Info Modal' });
        this.confirmModalButton = page.getByRole('button', { name: 'Open Confirm Modal' });
        this.formModalButton = page.getByRole('button', { name: 'Open Form Modal' });
        this.validationMessage = (message) => { return page.getByText(message) }

        this.modalDescription = (modalType) => { return page.locator(`${modalType}-modal-desc`) };
        this.closeButton = (modalType) => { return page.locator(`#${modalType}-modal-close-btn`) };
        this.actionButton = (button) => { return page.getByRole('button', { name: button }) }

        this.lastDialogueResult = page.locator('#dialogue-result-msg');

        // toast notifications locators
        this.successToastButton = page.getByRole('button', { name: 'Show Success Toast' });
        this.errorToastButton = page.getByRole('button', { name: 'Show Error Toast' });
        this.warningToastButton = page.getByRole('button', { name: 'Show Warning Toast' });
        this.successToast = page.locator('#toast-success');
        this.errorToast = page.locator('#toast-error');
        this.warningToast = page.locator('#toast-warning');


        // Dialog state — stored on 'this' so all methods share the same captured dialog.
        // Each test gets its own fixture instance so parallel runs are safe.
        this.currentDialog = null;
        this.currentType   = null;
        this.enteredName   = null;
    }

    /** Navigates to Alerts & Notifications page via Dashboard */
    async navigateToAlertsAndNotifications() {
        await this.dashboard.openDashboard();
        await this.dashboard.clickCard('Alerts & Notifications');
        await this.alertsTitle.waitFor({ state: 'visible', timeout: 10000 });
    }
 
    /** Asserts the Native JS dialogs section title and all 3 buttons are visible */
    async validateNativeJSDialogSection() {
        await expect(this.jsAlertTitle).toBeVisible();
        await expect(this.jsAlertButton).toBeVisible();
        await expect(this.jsConfirmButton).toBeVisible();
        await expect(this.jsPromptButton).toBeVisible();
    }
 
    /**
     * Registers dialog listener BEFORE clicking JS Alert.
     * Listener must be set up before the click — native dialogs fire instantly.
     */
    async clickJSAlertButton() {
        this.currentType = 'jsAlert';
        const dialogPromise = new Promise(resolve => {
            this.page.once('dialog', dialog => resolve(dialog));
        });
        await this.jsAlertButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.jsAlertButton.click();
        this.currentDialog = await dialogPromise;
    }
 
    /** Registers dialog listener BEFORE clicking JS Confirm */
    async clickJSConfirmButton() {
        this.currentType = 'jsConfirm';
        const dialogPromise = new Promise(resolve => {
            this.page.once('dialog', dialog => resolve(dialog));
        });
        await this.jsConfirmButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.jsConfirmButton.click();
        this.currentDialog = await dialogPromise;
    }
 
    /** Registers dialog listener BEFORE clicking JS Prompt */
    async clickJSPromptButton() {
        this.currentType = 'jsPrompt';
        const dialogPromise = new Promise(resolve => {
            this.page.once('dialog', dialog => resolve(dialog));
        });
        await this.jsPromptButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.jsPromptButton.click();
        this.currentDialog = await dialogPromise;
    }
 
    /**
     * Accepts the current native dialog.
     * For prompt — passes this.enteredName (set by enterNameInAlert) to dialog.accept().
     */
    async clickOK() {
        const isPrompt = this.currentDialog.type() === 'prompt';
        await this.currentDialog.accept(isPrompt ? (this.enteredName ?? '') : undefined);
    }
 
    /**
     * @param {string} type - e.g. 'jsConfirm.cancel', 'jsPrompt.cancel', 'confirmModal.cancel'
     * Dismisses native dialog if type starts with 'js', else clicks DOM Cancel button.
     */
    async clickCancel(type) {
        this.currentType = type;
        if (type.startsWith('js')) {
            await this.currentDialog.dismiss();
        } else {
            await this.actionButton('Cancel').click();
        }
    }
 
    /**
     * @param {string} name - Name to enter in the prompt. Stored for use in clickOK().
     */
    async enterNameInAlert(name) {
        this.enteredName = name;
    }
 
    /** Asserts the captured dialog is not null — confirms dialog was triggered */
    async validateTheAlertTrigger() {
        expect(this.currentDialog).not.toBeNull();
        expect(this.currentDialog).toBeDefined();
    }
 
    /**
     * @param {string} expectedMessage - Expected message from constants.json
     * Asserts the dialog message text and accepts the dialog to unblock the page.
     */
    async validateTheAlertMessage(expectedMessage) {
        expect(this.currentDialog.message()).toBe(expectedMessage);
        await this.currentDialog.accept();
    }
 
    /** Asserts the page is unblocked after dialog dismissal by checking lastDialogueResult is visible */
    async validateAlertDismissed() {
        await expect(this.lastDialogueResult).toBeVisible({ timeout: 5000 });
    }
 
    /**
     * @param {string} expectedMessage - Expected text from constants.json
     * For jsPrompt.ok — uses toContainText() since the name is dynamic.
     * For all others — uses toHaveText() for exact match.
     */
    async validateTheLastDialogResult(expectedMessage) {
        if (this.currentType === 'jsPrompt' && this.enteredName) {
            await expect(this.lastDialogueResult).toContainText(expectedMessage);
            await expect(this.lastDialogueResult).toContainText(this.enteredName);
        } else {
            await expect(this.lastDialogueResult).toHaveText(expectedMessage);
        }
    }
}