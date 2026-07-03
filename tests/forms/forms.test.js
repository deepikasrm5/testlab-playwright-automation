const { test, expect } = require('../base')
const config = require('../../config/config.json');
const testData = require('../../test_data/constants.json');
const userDetails = testData.formsFlow.userDetails;
const validationMessages = testData.formsFlow.validationMessages;
const browserType = process.env.BROWSER || 'chromium';
const path = require('path');

test.describe(`Forms Tests - ${browserType}`, () => {
    test('[TC-FRM-Add1] Validate whether all input labels are visible on the Forms page', async ({ formPage }) => {
        await formPage.validateInputLabels();
    });
    test('[TC-FRM-Add2] Validate whether all input fields are visible on the Forms page', async ({ formPage }) => {
        await formPage.validateInputFields();
    });
    test('[TC-FRM-Add3] Validate whether Submit and Reset buttons are visible on the Forms page', async ({ formPage }) => {
        await formPage.validateButtons();
    });
    test('[TC-FRM-001] Verify whether the form submits successfully when all required fields are filled with valid data', async ({ formPage }) => {
        await test.step('Fill full name', async () => {
            await formPage.fillFullName(userDetails.fullName);
        });

        await test.step('Fill email', async () => {
            await formPage.fillEmail(userDetails.email);
        });

        await test.step('Select country', async () => {
            await formPage.selectCountry(userDetails.country);
        });

        await test.step('Select interest', async () => {
            await formPage.selectInterests([userDetails.interests.auto]);
        });

        await test.step('Select preferred contact method', async () => {
            await formPage.selectPreferredContactMethod(userDetails.preferedContactMethod.email);
        });

        await test.step('Accept terms and conditions', async () => {
            await formPage.acceptTermsAndConditions();
        });

        await test.step('Click Submit button', async () => {
            await formPage.clickSubmit();
        });

        await test.step('Validate success toast message', async () => {
            await formPage.validateSuccessToastMessage();
        });

        await test.step('Validate inline success message', async () => {
            await formPage.validateInlineSuccessMessage();
        });
    });
    test('[TC-FRM-002] Verify whether the form submits successfully when both required and optional fields are filled with valid data', async ({ formPage }) => {
        await test.step('Fill full name', async () => {
            await formPage.fillFullName(userDetails.fullName);
        });

        await test.step('Fill email', async () => {
            await formPage.fillEmail(userDetails.email);
        });

        await test.step('Fill phone number', async () => {
            await formPage.fillPhoneNumber(userDetails.phoneNumber);
        });

        await test.step('Fill date of birth', async () => {
            await formPage.fillDateOfBirth(userDetails.dateOfBirth);
        });

        await test.step('Select country', async () => {
            await formPage.selectCountry(userDetails.country);
        });

        await test.step('Select interest', async () => {
            await formPage.selectInterests([userDetails.interests.perf]);
        });

        await test.step('Select preferred contact method', async () => {
            await formPage.selectPreferredContactMethod(userDetails.preferedContactMethod.sms);
        });

        await test.step('Fill bio', async () => {
            await formPage.fillBio(userDetails.bio);
        });

        await test.step('Upload profile picture', async () => {
            await formPage.uploadProfilePicture(path.resolve(__dirname, userDetails.profilePicture));
        });

        await test.step('Accept terms and conditions', async () => {
            await formPage.acceptTermsAndConditions();
        });

        await test.step('Click Submit button', async () => {
            await formPage.clickSubmit();
        });

        await test.step('Validate success toast message', async () => {
            await formPage.validateSuccessToastMessage();
        });

        await test.step('Validate inline success message', async () => {
            await formPage.validateInlineSuccessMessage();
        });
    });
    test('[TC-FRM-003] Verify whether the user is able to select multiple checkboxes under Interests (Automation Performance Security)', async ({ formPage }) => {
        await test.step('Select interest - Automation', async () => {
            await formPage.selectInterests([userDetails.interests.auto]);
        });
        await formPage.validateInterestSelected([userDetails.interests.auto]);

        await test.step('Select interest - Security', async () => {
            await formPage.selectInterests([userDetails.interests.sec]);
        });
        await formPage.validateInterestSelected([userDetails.interests.auto, userDetails.interests.sec]);

        await test.step('Select interest - Performance', async () => {
            await formPage.selectInterests([userDetails.interests.perf]);
        });
        await formPage.validateInterestSelected([userDetails.interests.auto, userDetails.interests.sec, userDetails.interests.perf]);
    });
    test('[TC-FRM-004, TC-FRM-005] Verify whether the user is able to select only one radio button under Preferred Contact Method (Email Phone SMS) and selecting a different radio button deselects the previously selected one', async ({ formPage }) => {
        await test.step('Select preferred contact method - Email', async () => {
            await formPage.selectPreferredContactMethod(userDetails.preferedContactMethod.email);
        });
        await formPage.verifyOneContactMethodSelected(userDetails.preferedContactMethod.email);

        await test.step('Select preferred contact method - Phone', async () => {
            await formPage.selectPreferredContactMethod(userDetails.preferedContactMethod.phone);
        });
        await formPage.verifyOneContactMethodSelected(userDetails.preferedContactMethod.phone);

        await test.step('Select preferred contact method - SMS', async () => {
            await formPage.selectPreferredContactMethod(userDetails.preferedContactMethod.sms);
        });
        await formPage.verifyOneContactMethodSelected(userDetails.preferedContactMethod.sms);
    });
    test('[TC-FRM-006] Verify whether the Reset button clears all entered data and returns fields to their default state', async ({ formPage }) => {
        await test.step('Fill full name', async () => {
            await formPage.fillFullName(userDetails.fullName);
        });
        await test.step('Fill email', async () => {
            await formPage.fillEmail(userDetails.email);
        });
        await test.step('Select country', async () => {
            await formPage.selectCountry(userDetails.country);
        });
        await test.step('Select interest', async () => {
            await formPage.selectInterests([userDetails.interests.auto]);
        });
        await test.step('Select preferred contact method', async () => {
            await formPage.selectPreferredContactMethod(userDetails.preferedContactMethod.email);
        });
        await test.step('Click Reset button', async () => {
            await formPage.clickReset();
        });
        await test.step('Validate that all fields are reset to their default state', async () => {
            await formPage.validateFieldsReset();
        });
    });
    test('[TC-FRM-007] Verify whether a success message is displayed after a successful form submission', async ({ formPage }) => {
        await test.step('Fill full name', async () => {
            await formPage.fillFullName(userDetails.fullName);
        });
        await test.step('Fill email', async () => {
            await formPage.fillEmail(userDetails.email);
        });
        await test.step('Select country', async () => {
            await formPage.selectCountry(userDetails.country);
        });
        await test.step('Select interest', async () => {
            await formPage.selectInterests([userDetails.interests.auto]);
        });
        await test.step('Select preferred contact method', async () => {
            await formPage.selectPreferredContactMethod(userDetails.preferedContactMethod.email);
        });
        await test.step('Accept terms and conditions', async () => {
            await formPage.acceptTermsAndConditions();
        });
        await test.step('Click submit button', async () => {
            await formPage.clickSubmit();
        });
        await test.step('Validate inline success message', async () => {
            await formPage.validateInlineSuccessMessage();
        });
    });
    test('[TC-FRM-008, TC-FRM-009] Verify whether an error is shown when the form is submitted with all required fields empty and Verify whether the Please fill all required fields banner appears at the top-right on submitting an incomplete form', async ({ formPage }) => {
        await test.step('Click submit button', async () => {
            await formPage.clickSubmit();
        });
        await test.step('Validate error message', async () => {
            await formPage.validateErrorToastMessage();
        });
        await test.step('Validate validation messages for required fields', async () => {
            await formPage.validateValidationMessage(validationMessages.empty.fullName);
            await formPage.validateValidationMessage(validationMessages.empty.email);
            await formPage.validateValidationMessage(validationMessages.empty.country);
            await formPage.validateValidationMessage(validationMessages.empty.preferedContactMethod);
            await formPage.validateValidationMessage(validationMessages.empty.interests);
            await formPage.validateValidationMessage(validationMessages.empty.terms);
        });
    });
    test('[TC-FRM-010] Verify whether an inline error is shown under the Full name field when left empty on submit', async ({ formPage }) => {
        await test.step('Fill email', async () => {
            await formPage.fillEmail(userDetails.email);
        });
        await test.step('Select country', async () => {
            await formPage.selectCountry(userDetails.country);
        });
        await test.step('Select interest', async () => {
            await formPage.selectInterests([userDetails.interests.auto]);
        });
        await test.step('Select preferred contact method', async () => {
            await formPage.selectPreferredContactMethod(userDetails.preferedContactMethod.email);
        });
        await test.step('Accept terms and conditions', async () => {
            await formPage.acceptTermsAndConditions();
        });
        await test.step('Click submit button', async () => {
            await formPage.clickSubmit();
        });
        await test.step('Validate inline error message for Full Name field', async () => {
            await formPage.validateValidationMessage(validationMessages.empty.fullName);
        });
    });
    test('[TC-FRM-011] Verify whether an inline error is shown under the Email field when left empty on submit', async ({ formPage }) => {
        await test.step('Fill full name', async () => {
            await formPage.fillFullName(userDetails.fullName);
        });
        await test.step('Select country', async () => {
            await formPage.selectCountry(userDetails.country);
        });
        await test.step('Select interest', async () => {
            await formPage.selectInterests([userDetails.interests.auto]);
        });
        await test.step('Select preferred contact method', async () => {
            await formPage.selectPreferredContactMethod(userDetails.preferedContactMethod.email);
        });
        await test.step('Accept terms and conditions', async () => {
            await formPage.acceptTermsAndConditions();
        });
        await test.step('Click submit button', async () => {
            await formPage.clickSubmit();
        });
        await test.step('Validate inline error message for Email field', async () => {
            await formPage.validateValidationMessage(validationMessages.empty.email);
        });
    });
    test('[TC-FRM-012] Verify whether an inline error is shown under the Country dropdown when no country is selected on submit', async ({ formPage }) => {
        await test.step('Fill full name', async () => {
            await formPage.fillFullName(userDetails.fullName);
        });
        await test.step('Fill email', async () => {
            await formPage.fillEmail(userDetails.email);
        });
        await test.step('Select interest', async () => {
            await formPage.selectInterests([userDetails.interests.auto]);
        });
        await test.step('Select preferred contact method', async () => {
            await formPage.selectPreferredContactMethod(userDetails.preferedContactMethod.email);
        });
        await test.step('Accept terms and conditions', async () => {
            await formPage.acceptTermsAndConditions();
        });
        await test.step('Click submit button', async () => {
            await formPage.clickSubmit();
        });
        await test.step('Validate inline error message for Country field', async () => {
            await formPage.validateValidationMessage(validationMessages.empty.country);
        });
    });
    test('[TC-FRM-013] Verify whether an inline error is shown under Preferred contact method when no radio button is selected on submit', async ({ formPage }) => {
        await test.step('Fill full name', async () => {
            await formPage.fillFullName(userDetails.fullName);
        });
        await test.step('Fill email', async () => {
            await formPage.fillEmail(userDetails.email);
        });
        await test.step('Select country', async () => {
            await formPage.selectCountry(userDetails.country);
        });
        await test.step('Select interest', async () => {
            await formPage.selectInterests([userDetails.interests.auto]);
        });
        await test.step('Accept terms and conditions', async () => {
            await formPage.acceptTermsAndConditions();
        });
        await test.step('Click submit button', async () => {
            await formPage.clickSubmit();
        });
        await test.step('Validate inline error message for Preferred contact method field', async () => {
            await formPage.validateValidationMessage(validationMessages.empty.preferedContactMethod);
        });
    });
    test('[TC-FRM-014] Verify whether an inline error is shown under Interests when no checkbox is selected on submit', async ({ formPage }) => {
        await test.step('Fill full name', async () => {
            await formPage.fillFullName(userDetails.fullName);
        });
        await test.step('Fill email', async () => {
            await formPage.fillEmail(userDetails.email);
        });
        await test.step('Select country', async () => {
            await formPage.selectCountry(userDetails.country);
        });
        await test.step('Select preferred contact method', async () => {
            await formPage.selectPreferredContactMethod(userDetails.preferedContactMethod.email);
        });
        await test.step('Accept terms and conditions', async () => {
            await formPage.acceptTermsAndConditions();
        });
        await test.step('Click submit button', async () => {
            await formPage.clickSubmit();
        });
        await test.step('Validate inline error message for Interests field', async () => {
            await formPage.validateValidationMessage(validationMessages.empty.interests);
        });
    });
    test('[TC-FRM-015] Verify whether an inline error is shown under the terms and conditions checkbox when left unchecked on submit', async ({ formPage }) => {
        await test.step('Fill full name', async () => {
            await formPage.fillFullName(userDetails.fullName);
        });
        await test.step('Fill email', async () => {
            await formPage.fillEmail(userDetails.email);
        });
        await test.step('Select country', async () => {
            await formPage.selectCountry(userDetails.country);
        });
        await test.step('Select preferred contact method', async () => {
            await formPage.selectPreferredContactMethod(userDetails.preferedContactMethod.email);
        });
        await test.step('Select interests', async () => {
            await formPage.selectInterests([userDetails.interests.auto]);
        });
        await test.step('Click submit button', async () => {
            await formPage.clickSubmit();
        });
        await test.step('Validate inline error message for Terms and Conditions field', async () => {
            await formPage.validateValidationMessage(validationMessages.empty.terms);
        });
    });
    test('[TC-FRM-016] Verify whether an inline error is shown when the Email field contains an invalid format (missing @ symbol)', async ({ formPage }) => {
        await test.step('Fill full name', async () => {
            await formPage.fillFullName(userDetails.fullName);
        });
        await test.step('Fill email with invalid format', async () => {
            await formPage.fillEmail(userDetails.invalidEmail[0]);
        });
        await test.step('Select country', async () => {
            await formPage.selectCountry(userDetails.country);
        });
        await test.step('Select interest', async () => {
            await formPage.selectInterests([userDetails.interests.auto]);
        });
        await test.step('Select preferred contact method', async () => {
            await formPage.selectPreferredContactMethod(userDetails.preferedContactMethod.email);
        });
        await test.step('Accept terms and conditions', async () => {
            await formPage.acceptTermsAndConditions();
        });
        await test.step('Click submit button', async () => {
            await formPage.clickSubmit();
        });
        await test.step('Validate inline error message for Email field', async () => {
            await formPage.validateValidationMessage(validationMessages.invalid.email);
        });
    });
    test('[TC-FRM-017] Verify whether an inline error is shown when the Email field contains an invalid format (missing domain)', async ({ formPage }) => {
        await test.step('Fill full name', async () => {
            await formPage.fillFullName(userDetails.fullName);
        });
        await test.step('Fill email with invalid format', async () => {
            await formPage.fillEmail(userDetails.invalidEmail[1]);
        });
        await test.step('Select country', async () => {
            await formPage.selectCountry(userDetails.country);
        });
        await test.step('Select interest', async () => {
            await formPage.selectInterests([userDetails.interests.auto]);
        });
        await test.step('Select preferred contact method', async () => {
            await formPage.selectPreferredContactMethod(userDetails.preferedContactMethod.email);
        });
        await test.step('Accept terms and conditions', async () => {
            await formPage.acceptTermsAndConditions();
        });
        await test.step('Click submit button', async () => {
            await formPage.clickSubmit();
        });
        await test.step('Validate inline error message for Email field', async () => {
            await formPage.validateValidationMessage(validationMessages.invalid.email);
        });
    });
});
