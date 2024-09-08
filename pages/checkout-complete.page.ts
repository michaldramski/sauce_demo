import { Page } from '@playwright/test';
import BasePage from './base.page';

export class CheckoutCompletePage extends BasePage {
    complete_header = `[data-test="complete-header"]`;
    complete_text = `[data-test="complete-text"]`;

    constructor(protected page: Page) {
        super(page);
    }

    async getOrderCompleteHeaderText(): Promise<string> {
        const text = await this.page
            .locator(this.complete_header)
            .textContent();
        return text || 'Header not found';
    }

    async getOrderCompleteText(): Promise<string> {
        const text = await this.page.locator(this.complete_text).textContent();
        return text || 'Text not found';
    }
}
