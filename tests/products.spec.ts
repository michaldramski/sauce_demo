import { test, expect } from '@playwright/test';
import { DefaultUser } from '../test-data/user-default.ts';
import PagesManager from '../pages/pages-manager.ts';
import { SortOptionsEnum } from '../support/types.ts';

let pm: PagesManager;

test.describe.configure({ mode: 'serial' });

test.describe('Products tests - sorting items', () => {
    test.beforeAll(async ({ browser }) => {
        // Arrange
        const context = await browser.newContext();
        const page = await context.newPage();
        pm = new PagesManager(page);
        await page.goto('');
        // Act
        await pm.loginPage.login(DefaultUser);
    });

    test('Should sort products names alphabetical Z to A', async () => {
        // Act
        await pm.productPage.sortProducts(SortOptionsEnum.ZA);
        const names = await pm.productPage.getInventoryItemsNames();
        const sortedNames = [...names].sort().reverse();
        // Assert
        expect(names).toEqual(sortedNames);
    });

    test('Should sort products names alphabetical A to Z', async () => {
        // Act
        await pm.productPage.sortProducts(SortOptionsEnum.AZ);
        const names = await pm.productPage.getInventoryItemsNames();
        const sortedNames = [...names].sort();
        // Assert
        expect(names).toEqual(sortedNames);
    });

    test('Should sort products prices from high to low', async () => {
        // Act
        await pm.productPage.sortProducts(SortOptionsEnum.HighToLow);
        const prices = await pm.productPage.getInventoryItemsPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        // Assert
        expect(prices).toEqual(sortedPrices);
    });

    test('Should sort products prices from low to high', async () => {
        // Act
        await pm.productPage.sortProducts(SortOptionsEnum.LowToHigh);
        const prices = await pm.productPage.getInventoryItemsPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        // Assert
        expect(prices).toEqual(sortedPrices);
    });
});
