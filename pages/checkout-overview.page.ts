import { Page } from '@playwright/test';

export class CheckoutOverviewPage {
    finish_button = `[data-test="finish"]`;

    constructor(private page: Page) {
        this.page = page;
    }

    async proceedToCompleteOrder(): Promise<void> {
        await this.page.click(this.finish_button);
    }
}
