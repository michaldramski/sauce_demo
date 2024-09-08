import { Page } from '@playwright/test';
import BasePage from './base.page';

export class CheckoutOverviewPage extends BasePage {
    finish_button = `[data-test="finish"]`;

    constructor(protected page: Page) {
        super(page);
    }

    async proceedToCompleteOrder(): Promise<void> {
        await this.page.click(this.finish_button);
    }
}
