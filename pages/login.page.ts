import { Locator, Page } from '@playwright/test';
import { UserModel } from '../models/user.model.ts';
import BasePage from './base.page.ts';

export class LoginPage extends BasePage {
    username_field = '[data-test="username"]';
    password_field = '[data-test="password"]';
    login_button = '[data-test="login-button"]';

    burger_menu = '#react-burger-menu-btn';
    logout_link = '#logout_sidebar_link';

    application_login_logo: Locator = this.page.locator('.login_logo');
    error_message: Locator = this.page.locator('[data-test="error"]');

    constructor(protected page: Page) {
        super(page);
    }

    async login(user: UserModel): Promise<void> {
        const { username, password } = user;
        await this.page.fill(this.username_field, username);
        await this.page.fill(this.password_field, password);
        await this.page.click(this.login_button);
    }

    async logout(): Promise<void> {
        await this.page.click(this.burger_menu);
        await this.page.click(this.logout_link);
    }
}
