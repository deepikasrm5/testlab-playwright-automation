import { test } from './base';
import { LoginPage } from '../pages/loginPage';
import  { config }  from '../config/config.js';
const credentials = config.valid;

test('Global Setup for the tests - Login', async ({ loginPage }) => {
    await loginPage.navigate(config.baseUrl);
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.page.waitForURL('**/dashboard', { timeout: 10000 });
    await loginPage.page.context().storageState({ path: './storageState.json' });
});