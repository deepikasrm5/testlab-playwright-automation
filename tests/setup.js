import { test } from './base';
import { LoginPage } from '../pages/loginPage';
import  configs  from '../config/config.json' with { type: 'json' };
const credentials = configs.valid;

test('Global Setup for the tests - Login', async ({ loginPage }) => {
    await loginPage.navigate(configs.baseUrl);
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.page.waitForURL('**/dashboard', { timeout: 10000 });
    await loginPage.page.context().storageState({ path: './storageState.json' });
})