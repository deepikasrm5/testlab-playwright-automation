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

        this.modal = (modalType) => { return page.locator(`#${modalType}-modal`) };
        this.modalTitle = (modalType) => { return this.modal(modalType).locator(`#${modalType}-modal-title`) };
        this.modalDescription = (modalType) => { return this.modal(modalType).locator(`#${modalType}-modal-desc`) };
        this.nickNameField = page.getByRole('textbox', { name: 'Nickname'});
        this.closeButton = (modalType) => { return this.modal(modalType).locator(`#${modalType}-modal-close-btn`) };
        this.actionButton = (button) => { return page.getByRole('button', { name: `${button}` }) }

        this.lastDialogResult = page.locator('#dialog-result-msg');

        // toast notifications locators
        this.toastNotificationsTitle = page.getByRole('heading', { name: 'Toast notifications' })
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
        await this.page.waitForLoadState('networkidle');
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
        const dialogPromise = this.page.waitForEvent('dialog');
        this.jsAlertButton.click().catch(() => {});
        this.currentDialog = await dialogPromise;
    }

 
    /** Registers dialog listener BEFORE clicking JS Confirm */
    async clickJSConfirmButton() {
        this.currentType = 'jsConfirm';
        const dialogPromise = this.page.waitForEvent('dialog');
        this.jsConfirmButton.click().catch(() => {});
        this.currentDialog = await dialogPromise;
    }
 
    /** Registers dialog listener BEFORE clicking JS Prompt */
    async clickJSPromptButton() {
        this.currentType = 'jsPrompt';
        const dialogPromise = this.page.waitForEvent('dialog');
        this.jsPromptButton.click().catch(() => {});
        this.currentDialog = await dialogPromise;
    }
 
    /**
     * Accepts the current native dialog.
     * For prompt — passes this.enteredName (set by enterNameInAlert) to dialog.accept().
     */
    async clickOK() {
        await this.currentDialog.accept(
            this.currentDialog.type() === 'prompt' ? (this.enteredName ?? '') : undefined
        );
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
        await this.page.waitForTimeout(500);
        expect(this.currentDialog).not.toBeNull();
    }
 
    /**
     * @param {string} expectedMessage - Expected message from constants.json
     * Asserts the dialog message text and accepts the dialog to unblock the page.
     */
    async validateTheAlertMessage(expectedMessage) {
        await this.page.waitForTimeout(500);
        expect(this.currentDialog.message()).toBe(expectedMessage);
        await this.currentDialog.accept();
    }
 
    /** Asserts the page is unblocked after dialog dismissal by checking lastDialogResult is visible */
    async validateAlertDismissed() {
        await expect(this.lastDialogResult).toBeVisible({ timeout: 10000 });
    }
 
    /**
     * @param {string} expectedMessage - Expected text from constants.json
     * For jsPrompt.ok — uses toContainText() since the name is dynamic.
     * For all others — uses toHaveText() for exact match.
     */
    async validateTheLastDialogResult(expectedMessage) {
        if (this.currentType === 'jsPrompt' && this.enteredName) {
            await expect(this.lastDialogResult).toContainText(expectedMessage);
            await expect(this.lastDialogResult).toContainText(this.enteredName);
        } else {
            await expect(this.lastDialogResult).toHaveText(expectedMessage);
        }
    }

    /**
     * Validation function to check whether all custom modal buttons are available or not
     */
    async validateModalDialogSection() {
        await expect(this.customModalAlertsTitle, { message: 'Title should be visible' }).toBeVisible({ timeout: 10000 });

        await expect(this.infoModalButton, { message: 'Info Modal Button should be visible' }).toBeVisible({ timeout: 10000 });

        await expect(this.confirmModalButton, { message: 'Confirm Modal Button should be visible' }).toBeVisible({ timeout: 10000 });

        await expect(this.formModalButton, { message: 'Form Modal Button should be visible' }).toBeVisible({ timeout: 10000 });
    }

    async openInfoModal() {
        await this.infoModalButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.infoModalButton.click();
    }

    async openConfirmModal() {
        await this.confirmModalButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.confirmModalButton.click();
    }

    async openFormModal() {
        await this.formModalButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.formModalButton.click();
    }

    async enterNickName(name) {
        await this.nickNameField.waitFor({ state: 'visible', timeout: 10000 });
        await this.nickNameField.fill(name);
    }

    async validateTheModalOpened(type) {
        await expect(this.modal(type), { message: `${type} modal should be visible` }).toBeVisible({ timeout: 10000 });
    }

    async validateModalDisappeared(type) {
        await expect(this.modal(type), { message: `${type} modal should be disappeared` }).not.toBeVisible({ timeout: 10000 });
    }

    async validateModalTitle(type) {
        await expect(this.modalTitle(type), { message: `${type} modal title should be visible` }).toBeVisible({ timeout: 10000 });
    }

    async validateInlineErrorMessage(message) {
        await expect(this.validationMessage(message), { message: `Inline error message - '${message}' should be visible` }).toBeVisible({ timeout: 10000 });
    }

    async validateModalWarningText(text) {
        await expect(this.modalDescription('confirm')).toBeVisible({ timeout: 10000 });
        await expect(this.modalDescription('confirm')).toContainText(text,{ timeout: 10000 });
    }

    async validateSuccessToastMessage(message) {
        await expect(this.successToast).toBeVisible({ timeout: 10000 });
        await expect(this.successToast).toContainText(message, { timeout: 10000 });
    }

    async validateErrorToastMessage(message) {
        await expect(this.errorToast).toBeVisible({ timeout: 10000 });
        await expect(this.errorToast).toContainText(message, { timeout: 10000 });
    }

    async validateWarningToastMessage(message) {
        await expect(this.warningToast).toBeVisible({ timeout: 10000 });
        await expect(this.warningToast).toContainText(message, { timeout: 10000 });
    }

    async clickGotIt() {
        await this.actionButton('Got it').waitFor({ state: 'visible', timeout: 10000 });
        await this.actionButton('Got it').click();
    }

    async closeDialog(type) {
        await this.closeButton(type).waitFor({ state: 'visible', timeout: 10000 });
        await this.closeButton(type).click();
    }

    async clickDelete() {
        await this.actionButton('Delete').waitFor({ state: 'visible', timeout: 10000 });
        await this.actionButton('Delete').click();
    }

    async clickCancel() {
        await this.actionButton('Cancel').waitFor({ state: 'visible', timeout: 10000 });
        await this.actionButton('Cancel').click();
    }

    async clickSave() {
        await this.actionButton('Save').waitFor({ state:'visible', timeout: 10000 });
        await this.actionButton('Save').click();
    }

    async validateToastNotificationSection() {
        await expect(this.toastNotificationsTitle).toBeVisible({ timeout: 10000 });

        await expect(this.successToastButton).toBeVisible({ timeout: 10000 });

        await expect(this.errorToastButton).toBeVisible({ timeout: 10000 });

        await expect(this.warningToastButton).toBeVisible({ timeout: 10000 });
    }

    async clickSuccessToast() {
        await this.successToastButton.waitFor({ state:'visible', timeout: 10000 });

        await this.successToastButton.click(); 
    }

    async clickErrorToast() {
        await this.errorToastButton.waitFor({ state:'visible', timeout: 10000 });

        await this.errorToastButton.click(); 
    }

    async clickWarningToast() {
        await this.warningToastButton.waitFor({ state:'visible', timeout: 10000 });

        await this.warningToastButton.click(); 
    }
}