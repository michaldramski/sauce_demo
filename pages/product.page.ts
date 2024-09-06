import { Locator, Page } from '@playwright/test';
import { CartMenu } from './cart-menu.component';
import { SortOptionsType, SortOptionsEnum } from '../support/types';

export class ProductPage {
    cart_menu = new CartMenu(this.page);

    sort_dropdownlist = `[data-test="product-sort-container"]`;
    inventory_items_names = `[data-test="inventory-item-name"]`;
    inventory_items_prices = `[data-test="inventory-item-price"]`;

    add_product_button = (product: string): Locator =>
        this.page
            .locator('[data-test="inventory-item"]')
            .filter({ hasText: product })
            .getByRole('button', { name: 'Add to cart' });

    constructor(private page: Page) {
        this.page = page;
    }

    async addProductIntoBasket(product: string): Promise<void> {
        await this.add_product_button(product).click();
    }

    async sortProducts(
        option: SortOptionsType | SortOptionsEnum,
    ): Promise<void> {
        await this.page.selectOption(this.sort_dropdownlist, option);
    }

    async getInventoryItemsNames(): Promise<string[]> {
        const names: string[] = [];
        const elements: Locator = this.page.locator(this.inventory_items_names);
        await elements.first().waitFor();

        const allElements = await elements.all();
        for (const e of allElements) {
            const textContent = await e.textContent();
            if (textContent) names.push(textContent);
        }
        return names;
    }

    async getInventoryItemsPrices(): Promise<number[]> {
        const prices: number[] = [];
        const elements: Locator = this.page.locator(
            this.inventory_items_prices,
        );
        await elements.first().waitFor();

        const allElements: Locator[] = await elements.all();
        for (const e of allElements) {
            const text: string = (await e.textContent()) || '';
            const price = parseFloat(text.trim().replace('$', ''));
            prices.push(price);
        }
        return prices;
    }
}
