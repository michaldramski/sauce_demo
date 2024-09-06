import { Page } from '@playwright/test';

export class CartMenu {
    cart_button = `[data-test="shopping-cart-link"]`;
    cart_badge = `[data-test="shopping-cart-badge"]`;

    constructor(private page: Page) {
        this.page = page;
    }

    async openCart(): Promise<void> {
        await this.page.click(this.cart_button);
    }
}
