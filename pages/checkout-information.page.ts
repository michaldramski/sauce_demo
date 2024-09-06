import { Page } from '@playwright/test';
import { fill_input } from '../actions/fill';

export class CheckoutInformationPage {
    first_name_input = `[data-test="firstName"]`;
    last_name_input = `[data-test="lastName"]`;
    postal_code_input = `[data-test="postalCode"]`;
    continue_button = `[data-test="continue"]`;
    error_message = `[data-test="error"]`;
    checkout_title = `[data-test="title"]`;
    checkout_title_locator = this.page.locator(this.checkout_title);

    constructor(private page: Page) {
        this.page = page;
    }

    async pageReady(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('load');
    }

    async fillFirstName(firstName: string): Promise<void> {
        await fill_input(this.page, this.first_name_input, firstName);
    }

    async fillLastName(lastName: string): Promise<void> {
        await fill_input(this.page, this.last_name_input, lastName);
    }

    async fillPostalCode(postalCode: string): Promise<void> {
        await fill_input(this.page, this.postal_code_input, postalCode);
    }

    async proceedToOverview(): Promise<void> {
        await this.page.click(this.continue_button);
    }

    async getErrorMessage(): Promise<string> {
        const errorMessage: string = await this.page
            .locator(this.error_message)
            .innerText();
        return errorMessage;
    }
}
