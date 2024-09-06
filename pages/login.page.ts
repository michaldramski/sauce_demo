import { Page } from '@playwright/test';
import { UserModel } from '../models/user.model.ts';

export class LoginPage {
    private page: Page;

    username_field = '[data-test="username"]';
    password_field = '[data-test="password"]';
    login_button = '[data-test="login-button"]';

    burger_menu = '#react-burger-menu-btn';
    logout_link = '#logout_sidebar_link';

    error_message = '[data-test="error"]';

    constructor(page: Page) {
        this.page = page;
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
