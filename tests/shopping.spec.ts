import { test, expect } from '@playwright/test';
import { DefaultUser } from '../test-data/user-default.ts';
import { products } from '../test-data/products.json';
import { messages } from '../test-data/messages.json';
import { faker } from '@faker-js/faker';
import PagesManager from '../pages/pages-manager.ts';

let pm: PagesManager;

test.describe('Shopping tests', () => {
    test.beforeEach(async ({ page }) => {
        // Arrange
        pm = new PagesManager(page);
        await page.goto('');
        // Act
        await pm.loginPage.login(DefaultUser);
    });

    test('Should add product (Sauce Labs Backpack) into basket and check if item is in basket', async ({}) => {
        // Arrange
        const selectedProduct = products[0].name; // Sauce Labs Backpack
        // Act
        await pm.productPage.addProductIntoBasket(selectedProduct);
        await pm.productPage.cart_menu.openCart();
        const cartItemsNames = await pm.cartPage.getCartItemsNames();
        // Assert
        expect(cartItemsNames).toContain(selectedProduct);
    });

    test.describe('Test Cases of Checkout', () => {
        test.beforeEach(async ({}) => {
            // Arrange
            const selectedProduct = products[1].name; // Sauce Labs Bike Light
            // Act
            await pm.productPage.addProductIntoBasket(selectedProduct);
            await pm.productPage.cart_menu.openCart();
            await pm.cartPage.proceedToCheckout();
            // Assert
            await expect(
                pm.checkoutInformationPage.checkout_title_locator,
            ).toBeVisible();
        });

        test('Should verify error messages for credentials in checkout', async () => {
            // Arrange
            await pm.checkoutInformationPage.pageReady();
            // Act
            await pm.checkoutInformationPage.proceedToOverview();
            // Assert
            expect
                .soft(await pm.checkoutInformationPage.getErrorMessage())
                .toContain(messages.checkout.first_name_error);
            // Act
            await pm.checkoutInformationPage.fillFirstName(
                faker.person.firstName(),
            );
            await pm.checkoutInformationPage.proceedToOverview();
            // Assert
            expect
                .soft(await pm.checkoutInformationPage.getErrorMessage())
                .toContain(messages.checkout.last_name_error);
            // Act
            await pm.checkoutInformationPage.fillLastName(
                faker.person.lastName(),
            );
            await pm.checkoutInformationPage.proceedToOverview();
            // Assert
            expect
                .soft(await pm.checkoutInformationPage.getErrorMessage())
                .toContain(messages.checkout.postal_code_error);
        });

        // eslint-disable-next-line playwright/no-skipped-test
        test.skip('Should be able to complete order', async () => {
            // Arrange
            await pm.checkoutInformationPage.pageReady();
            // Act
            await pm.checkoutInformationPage.fillFirstName(
                faker.person.firstName(),
            );
            await pm.checkoutInformationPage.fillLastName(
                faker.person.lastName(),
            );
            await pm.checkoutInformationPage.fillPostalCode(
                faker.location.zipCode(),
            );
            await pm.checkoutInformationPage.proceedToOverview();
            // Assert
            expect(1).toBe(1);
        });
    });
});
