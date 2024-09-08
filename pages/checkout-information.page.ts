import { Page } from '@playwright/test';
import CommonActions from '../actions/CommonActions';
import BasePage from './base.page';

export class CheckoutInformationPage extends BasePage {
    actions: CommonActions;

    first_name_input = `[data-test="firstName"]`;
    last_name_input = `[data-test="lastName"]`;
    postal_code_input = `[data-test="postalCode"]`;
    continue_button = `[data-test="continue"]`;
    error_message = `[data-test="error"]`;
    checkout_title = `[data-test="title"]`;
    checkout_title_locator = this.page.locator(this.checkout_title);

    constructor(protected page: Page) {
        super(page);
        this.actions = new CommonActions(this.page);
    }

    async fillFirstName(firstName: string): Promise<void> {
        await this.actions.fill(this.first_name_input, firstName);
    }

    async fillLastName(lastName: string): Promise<void> {
        await this.actions.fill(this.last_name_input, lastName);
    }

    async fillPostalCode(postalCode: string): Promise<void> {
        await this.actions.fill(this.postal_code_input, postalCode);
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
