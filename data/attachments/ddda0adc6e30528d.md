# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: setup.js >> Global Setup for the tests - Login
- Location: tests/setup.js:6:1

# Error details

```
TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/dashboard" until "load"
  navigated to "https://playwrighttestlab.netlify.app/?username=admin&password=password123"
============================================================
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - img [ref=e6]
        - heading "Sign in to TestLab" [level=1] [ref=e8]
        - paragraph [ref=e9]: Test automation practice playground
      - generic [ref=e11]:
        - generic [ref=e12]:
          - generic [ref=e13]: Username
          - textbox "Username" [ref=e14]:
            - /placeholder: admin
        - generic [ref=e15]:
          - generic [ref=e16]: Password
          - generic [ref=e17]:
            - textbox "Password" [ref=e18]:
              - /placeholder: ••••••••
            - button "Show password" [ref=e19]:
              - img [ref=e20]
        - button "Sign in" [ref=e23]
      - paragraph [ref=e24]: "Demo credentials: admin / password123"
  - region "Notifications"
  - alert [ref=e25]
```

# Test source

```ts
  1  | import { test } from './base';
  2  | import { LoginPage } from '../pages/loginPage';
  3  | import  { config }  from '../config/config.js';
  4  | const credentials = config.valid;
  5  | 
  6  | test('Global Setup for the tests - Login', async ({ loginPage }) => {
  7  |     await loginPage.navigate(config.baseUrl);
  8  |     await loginPage.login(credentials.username, credentials.password);
> 9  |     await loginPage.page.waitForURL('**/dashboard', { timeout: 10000 });
     |                          ^ TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
  10 |     await loginPage.page.context().storageState({ path: './storageState.json' });
  11 | });
```