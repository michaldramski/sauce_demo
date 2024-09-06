import { Page } from '@playwright/test';

export async function fill_input(
    page: Page,
    selector: string,
    value: string,
): Promise<void> {
    let actualValue: string = '';
    while (actualValue !== value) {
        await page.fill(selector, value);
        actualValue = await page.locator(selector).inputValue();
    }
}
