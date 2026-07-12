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

    }

    async navigateToAlertsAndNotifications() {
        await this.dashboard.openDashboard();
        await this.dashboard.clickCard('Alerts & Notifications');
        await this.alertsTitle.waitFor({ state: 'visible', timeout: 10000 });
    }
}