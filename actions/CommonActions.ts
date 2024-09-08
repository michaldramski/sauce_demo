import { Page } from '@playwright/test';

export default class CommonActions {
    constructor(private page: Page) {
        this.page = page;
    }
    async fill(selector: string, value: string): Promise<void> {
        let actualValue: string | undefined;
        while (actualValue !== value) {
            await this.page.fill(selector, value);
            actualValue = await this.page.locator(selector).inputValue();
        }
    }
}
