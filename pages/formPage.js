import { DashboardPage } from './dashboard';
import { expect } from '../tests/base';
import testData from '../test_data/constants.json' with { type: 'json' };
const { formsFlow } = testData;
const userData = formsFlow.userDetails;
export class FormPage {
    constructor(page) {
        this.page = page;
        this.dashboard = new DashboardPage(page);

        this.formsTitle = page.getByRole('heading', { name: 'Form Page', level: 1 });
        this.inputLabels = {
            fullName: page.getByText('Full name*'),
            email: page.getByText('Email*'),
            phoneNumber: page.getByText('Phone').first(),
            dateOfBirth: page.getByText('Date of birth'),
            country: page.getByLabel('Country*'),
            preferredContactMethod: page.getByText('Preferred contact method*'),
            interests: page.getByText('Interests*'),
            bio: page.getByText('Bio'),
            profilePicture: page.getByText('Profile picture')
        };
        this.inputFields = {
            fullName: page.getByRole('textbox', { name: 'Full name' }),
            email: page.getByRole('textbox', { name: 'Email' }),
            phoneNumber: page.getByRole('textbox', { name: 'Phone' }),
            dateOfBirth: page.getByRole('textbox', { name: 'Date of birth' }),
            bio: page.getByRole('textbox', { name: 'Bio' }),
            interest: (option) => { return page.getByRole('checkbox', { name: `${option}` }) },
            preferedContactMethod: (method) => { return page.getByRole('radio', { name: `${method}` }) },
            profilePicture: page.getByRole('button', { name: 'Choose a file to upload' }),
            termsAndConditions: page.locator('#form-terms-checkbox')
        };
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.validationMessage = (message) => { return page.getByText(message) };
        this.errorToastMessage = page.locator('#toast-error');
        this.successToastMessage = page.locator('#toast-success');
        this.inlineSuccessMessage = page.getByText('Your profile has been saved.');
    }

    async navigateToForms() {
        await this.dashboard.openDashboard();
        await this.dashboard.clickCard('Form Page');
        await this.formsTitle.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.formsTitle, { message: "Forms page title should be visible" }).toBeVisible({ timeout: 10000 });
    }

    async validateInputLabels() {
        for (const label in this.inputLabels) {
            await expect(this.inputLabels[label], { message: `${label} label should be visible` }).toBeVisible({ timeout: 10000 });
        }
    }

    async validateInputFields() {
        for (const field in this.inputFields) {
            if (field === 'interest' || field === 'preferedContactMethod') {
                continue; // Skip validation for dynamic fields
            }
            await expect(this.inputFields[field], { message: `${field} input field should be visible` }).toBeVisible({ timeout: 10000 });
        }
    }

    async validateButtons() {
        await expect(this.submitButton, { message: "Submit button should be visible" }).toBeVisible({ timeout: 10000 });
        await expect(this.resetButton, { message: "Reset button should be visible" }).toBeVisible({ timeout: 10000 });
    }

    async validateValidationMessage(message) {
        await expect(this.validationMessage(message), { message: `Validation message "${message}" should be visible` }).toBeVisible({ timeout: 10000 });
    }

    async validateErrorToastMessage() {
        await expect(this.errorToastMessage, { message: "Error toast message should be visible" }).toBeVisible({ timeout: 10000 });
    }

    async validateSuccessToastMessage() {
        await expect(this.successToastMessage, { message: "Success toast message should be visible" }).toBeVisible({ timeout: 10000 });
    }

    async validateInlineSuccessMessage() {
        await expect(this.inlineSuccessMessage, { message: "Inline success message should be visible" }).toBeVisible({ timeout: 10000 });
    }

    async fillFullName(name) {
        await this.inputFields.fullName.fill(name);
    }

    async fillEmail(email) {
        await this.inputFields.email.fill(email);
    }

    async fillPhoneNumber(phone) {
        await this.inputFields.phoneNumber.fill(phone);
    }

    async fillDateOfBirth(dob) {
        await this.inputFields.dateOfBirth.fill(dob);
    }

    async selectCountry(country) {
        await this.inputLabels.country.selectOption(country);
    }

    async selectPreferredContactMethod(method) {
        await this.inputFields.preferedContactMethod(method).check();
    }

    async verifyOneContactMethodSelected(selectedMethod) {
        const allMethods = Object.values(userData.preferedContactMethod);

        for (const method of allMethods) {
            if (method === selectedMethod) {
                await expect(this.inputFields.preferedContactMethod(method)).toBeChecked();
            } else {
                await expect(this.inputFields.preferedContactMethod(method)).not.toBeChecked();
            }
        }
    }

    async selectInterests(interests) {
        for (const interest of interests) {
            await this.inputFields.interest(interest).check();
        }
    }

    async validateInterestSelected(interests) {
        for (const interest of interests) {
            await expect(this.inputFields.interest(interest), { message: `${interest} checkbox should be selected` }).toBeChecked({ timeout: 10000 });
        }
    }

    async fillBio(bio) {
        await this.inputFields.bio.fill(bio);
    }

    async uploadProfilePicture(filePath) {
        await this.inputFields.profilePicture.setInputFiles(filePath);
    }

    async acceptTermsAndConditions() {
        await this.inputFields.termsAndConditions.check();
    }

    async clickSubmit() {
        await this.submitButton.click();
    }

    async clickReset() {
        await this.resetButton.click();
    }

    async validateFieldsReset() {
        for (const field in this.inputFields) {
            if (field === 'interest' || field === 'preferedContactMethod' || field === 'termsAndConditions') {
                continue; // Skip validation for dynamic fields
            }
            await expect(this.inputFields[field], { message: `${field} input field should be empty` }).toHaveValue('', { timeout: 10000 });
        }
        const allInterests = ['Automation', 'Performance', 'Security'];
        for (const interest of allInterests) {
            await expect(this.inputFields.interest(interest), { message: `${interest} checkbox should be unchecked` }).not.toBeChecked({ timeout: 10000 });
        }
        const allMethods = ['Email', 'Phone', 'SMS'];
        for (const method of allMethods) {
            await expect(this.inputFields.preferedContactMethod(method), { message: `${method} radio button should be unchecked` }).not.toBeChecked({ timeout: 10000 });
        }
        await expect(this.inputFields.termsAndConditions, { message: "Terms and Conditions checkbox should be unchecked" }).not.toBeChecked({ timeout: 10000 });
    }
}