import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DefaultUser } from '../test-data/user_default.ts';
import { User } from '../test-data/user.ts';

//test.describe.configure({ mode: 'serial' });

test.describe('Login tests', () => {
  let loginPage;
  
  test.beforeEach(async ({ page }) => {    
    loginPage = new LoginPage(page);
    await page.goto('');

    const NewDefaultUser: User = { username: DefaultUser.username, password: DefaultUser.password}
    loginPage.login(NewDefaultUser);
  });

  test('Should login with correct credentials', async ({ page }) => {
    const expectedLogoText = 'Swag Labs';
    await expect(page.locator('.app_logo')).toHaveText(expectedLogoText);
  });
  
  test('Should login with correct credentials and logout', async ({ page }) => {
    const expectedLogoText = 'Swag Labs';
    await loginPage.logout();
    await expect(page.locator('.login_logo')).toHaveText(expectedLogoText);
  });
})
