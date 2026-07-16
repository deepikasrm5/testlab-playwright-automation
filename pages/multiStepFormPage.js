import { expect } from "../tests/base";
import { DashboardPage } from "./dashboard";
export class MultiStepFormPage {
    constructor(page) {
        this.page = page;

        this.dashboard = new DashboardPage(page);

        this.pageTitle = page.getByRole('heading', { name: "Multi-step Form", level: 1 });
        this.stepNo = (number) => { return page.getByText(number) };
        this.stepName = (name) => { return page.getByText(name) };

        this.inputLabels = {
            firstName : page.getByText('First name*'),
            lastName: page.getByText('Last name*'),
            email: page.getByText('Email*'),
            streetAddress : page.getByText('Street address*'),
            city: page.getByText('City*'),
            postalCode: page.getByText('ZIP / Postal code*')
        }
    }

    async navigateToMultiStepFormsPage() {
        await this.dashboard.goToDashboard();
        await this.dashboard.clickCard('Multi-step Form');
        await this.pageTitle.waitFor({ state:'visible', timeout: 10000 });
        await this.page.waitForLoadState('networkidle');
    }
}