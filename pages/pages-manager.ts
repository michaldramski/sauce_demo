import { Page } from '@playwright/test';
import { CartPage } from './cart.page';
import { CheckoutInformationPage } from './checkout-information.page';
import { LoginPage } from './login.page';
import { ProductPage } from './product.page';

export default class PagesManager {
    loginPage: LoginPage;
    productPage: ProductPage;
    cartPage: CartPage;
    checkoutInformationPage: CheckoutInformationPage;

    constructor(private page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.productPage = new ProductPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutInformationPage = new CheckoutInformationPage(page);
    }
}
