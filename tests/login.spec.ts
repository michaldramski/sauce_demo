import { test, expect } from '@playwright/test';
import { DefaultUser, LockedOutUser } from '../test-data/user-default.ts';
import { UserModel } from '../models/user.model.ts';
import { prepareRandomUser } from '../factories/users.factory.ts';
import { messages } from '../test-data/messages.json';
import PagesManager from '../pages/pages-manager.ts';

let pm: PagesManager;

test.describe.configure({ mode: 'serial' });

test.describe('Login tests - correct credentials', () => {
    test.beforeEach(async ({ page }) => {
        // Arrange
        pm = new PagesManager(page);
        // Act
        await pm.loginPage.open();
        await pm.loginPage.login(DefaultUser);
    });

    test('Should login with correct credentials', async () => {
        // Arrange
        const expectedLogoText = 'Swag Labs';
        // Assert
        await expect(pm.productPage.application_logo).toHaveText(
            expectedLogoText,
        );
    });

    test('Should logout after login with correct credentials', async () => {
        // Arrange
        const expectedLogoText = 'Swag Labs';
        // Act
        await pm.loginPage.logout();
        // Assert
        await expect(pm.loginPage.application_login_logo).toHaveText(
            expectedLogoText,
        );
    });
});

test.describe('Login tests - unable to login', () => {
    test.beforeEach(async ({ page }) => {
        // Arrange
        pm = new PagesManager(page);
        await pm.loginPage.open();
    });

    test('Should not be able to login with random credentials', async () => {
        // Arrange
        const randomUser: UserModel = prepareRandomUser();
        // Act
        await pm.loginPage.login(randomUser);
        // Assert
        await expect(pm.loginPage.error_message).toHaveText(
            messages.login_page.unknown_user_error,
        );
    });

    test('Should not be able to login with locked out user', async () => {
        // Act
        await pm.loginPage.login(LockedOutUser);
        // Assert
        await expect(pm.loginPage.error_message).toHaveText(
            messages.login_page.locked_out_error,
        );
    });
});

test.afterAll(async () => {
    // Act
    await pm.loginPage.close();
});
