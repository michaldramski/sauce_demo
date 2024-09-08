import { Page } from '@playwright/test';

export default class BasePage {
    constructor(protected page: Page) {
        this.page = page;
    }

    async open(): Promise<void> {
        await this.page.goto('');
    }

    async getUrl(): Promise<string> {
        return this.page.url();
    }

    async close(): Promise<void> {
        await this.page.close();
    }
}
