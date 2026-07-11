import { expect } from "../tests/base";

export class LoginPage {
    constructor(page) {
        this.page = page;

        this.usernameField = page.getByRole('textbox', { name: 'Username' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.errorMessage = page.locator('#login-error-msg');
        this.visibilityToggleButton = page.locator('#login-password-toggle-btn');
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async waitForLoginPageToLoad() {
        await this.usernameField.waitFor({ state: 'visible', timeout: 10000 });
        await this.passwordField.waitFor({ state: 'visible', timeout: 10000 });
        await this.signInButton.waitFor({ state: 'visible', timeout: 10000 });
    }

    async enterUsername(username) {
        await this.usernameField.click();
        await this.usernameField.fill(username);
    }

    async enterPassword(password) {
        await this.passwordField.click();
        await this.passwordField.fill(password);
    }

    async clickSignIn(){
        await this.signInButton.click();
    }

    async login(username, password) {
        if (username !== "" && password !== "") {
            await this.enterUsername(username);
            await this.enterPassword(password);
        }else if (username === "") {
            await this.enterPassword(password);
        }else if (password === "") {
            await this.enterUsername(username);
        }
        await this.clickSignIn();
    }

    async validateErrorMessage() {
        await expect(this.errorMessage).toBeVisible({timeout: 2000});
        await expect(this.errorMessage).toContainText('Invalid username or password');
    }

    async getPasswordFieldType() {
        return this.passwordField.getAttribute('type');
    }

    async clickVisibilityToggle() {
        await this.visibilityToggleButton.click();
    }
}