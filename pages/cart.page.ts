import { Locator, Page } from '@playwright/test';
import BasePage from './base.page';

export class CartPage extends BasePage {
    items_list_items_names = `[data-test="cart-list"] > .cart_item .inventory_item_name`;
    checkout_button = '[data-test="checkout"]';

    constructor(protected page: Page) {
        super(page);
    }

    async getCartItemsNames(): Promise<string[]> {
        const names: string[] = [];
        const elements: Locator = this.page.locator(
            this.items_list_items_names,
        );
        await elements.first().waitFor();

        const allElements = await elements.all();
        for (const e of allElements) {
            const textContent = await e.textContent();
            if (textContent) names.push(textContent);
        }
        return names;
    }

    async proceedToCheckout(): Promise<void> {
        await this.page.click(this.checkout_button);
    }
}
