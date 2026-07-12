import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { FormPage } from "../pages/formPage";
import { DashboardPage } from "../pages/dashboard";
import { AlertsAndNotificationsPage } from "../pages/alertsPage";
import config from "../config/config.json" with { type: "json" };
const { baseUrl } = config;
export const test = base.extend({

    loginPage: [async ({ browser }, use) => {

        const context = await browser.newContext({
            storageState: undefined
        });

        const page = await context.newPage();
        const loginPage = new LoginPage(page);

        await use(loginPage);

        await context.close();

    }, { scope: 'worker' }],

    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },

    formPage: async ({ page }, use) => {
        const formPage = new FormPage(page);
        await formPage.navigateToForms();
        await use(formPage);
        
    },


    alertsAndNotificationsPage: async ({ page }, use) => {
        const alertsAndNotificationsPage = new AlertsAndNotificationsPage(page);
        await alertsAndNotificationsPage.navigateToAlertsAndNotifications();
        await use(alertsAndNotificationsPage);
    },

    multiStepFormPage: async ({ page }, use) => {
        const multiStepFormPage = new MultiStepFormPage(page);
        await use(multiStepFormPage);
    },


    tablePage: async ({ page }, use) => {
        const tablePage = new TablePage(page);
        await use(tablePage);
    },

    dynamicDataPage: async ({ page }, use) => {
        const dynamicDataPage = new DynamicDataPage(page);
        await use(dynamicDataPage);
    },

});
export { expect } from '@playwright/test';