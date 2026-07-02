const { test, expect } = require('../base')
const config = require('../../config/config.json');
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
            await formPage.fillFullName('John Doe');
        });

        await test.step('Fill email', async () => {
            await formPage.fillEmail('john.doe@gmail.com');
        });

        await test.step('Select country', async () => {
            await formPage.selectCountry('in');
        });

        await test.step('Select interest', async () => {
            await formPage.selectInterests(['Automation']);
        });

        await test.step('Select preferred contact method', async () => {
            await formPage.selectPreferredContactMethod('Email');
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
            await formPage.fillFullName('Jane Smith');
        });

        await test.step('Fill email', async () => {
            await formPage.fillEmail('jane.smith@gmail.com');
        });

        await test.step('Fill phone number', async () => {
            await formPage.fillPhoneNumber('9012345678');
        });

        await test.step('Fill date of birth', async () => {
            await formPage.fillDateOfBirth('1990-01-01');
        });

        await test.step('Select country', async () => {
            await formPage.selectCountry('in');
        });

        await test.step('Select interest', async () => {
            await formPage.selectInterests(['Performance']);
        });

        await test.step('Select preferred contact method', async () => {
            await formPage.selectPreferredContactMethod('SMS');
        });

        await test.step('Fill bio', async () => {
            await formPage.fillBio('This is a sample bio.');
        });

        await test.step('Upload profile picture', async () => {
            await formPage.uploadProfilePicture(path.resolve(__dirname, '../../test_data/images/profile_avatar.jpg'));
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
            await formPage.selectInterests(['Automation']);
        });
        await formPage.validateInterestSelected(['Automation']);

        await test.step('Select interest - Security', async () => {
            await formPage.selectInterests(['Security']);
        });
        await formPage.validateInterestSelected(['Automation', 'Security']);

        await test.step('Select interest - Performance', async () => {
            await formPage.selectInterests(['Performance']);
        });
        await formPage.validateInterestSelected(['Automation', 'Security', 'Performance']);
    });
    test('[TC-FRM-004, TC-FRM-005] Verify whether the user is able to select only one radio button under Preferred Contact Method (Email Phone SMS) and selecting a different radio button deselects the previously selected one', async ({ formPage }) => {
        await test.step('Select preferred contact method - Email', async () => {
            await formPage.selectPreferredContactMethod('Email');
        });
        await formPage.verifyOneContactMethodSelected('Email');

        await test.step('Select preferred contact method - Phone', async () => {
            await formPage.selectPreferredContactMethod('Phone');
        });
        await formPage.verifyOneContactMethodSelected('Phone');

        await test.step('Select preferred contact method - SMS', async () => {
            await formPage.selectPreferredContactMethod('SMS');
        });
        await formPage.verifyOneContactMethodSelected('SMS');
    });
    test('[TC-FRM-006] Verify whether the Reset button clears all entered data and returns fields to their default state', async ({ formPage }) => {
        await test.step('Fill full name', async () => {
            await formPage.fillFullName('John Doe');
        });
        await test.step('Fill email', async () => {
            await formPage.fillEmail('john.doe@example.com');
        });
        await test.step('Select country', async () => {
            await formPage.selectCountry('in');
        });
        await test.step('Select interest', async () => {
            await formPage.selectInterests(['Automation']);
        });
        await test.step('Select preferred contact method', async () => {
            await formPage.selectPreferredContactMethod('Email');
        });
        await test.step('Click Reset button', async () => {
            await formPage.clickReset();
        });
        await test.step('Validate that all fields are reset to their default state', async () => {
            await formPage.validateFieldsReset();
        });
    });
});
