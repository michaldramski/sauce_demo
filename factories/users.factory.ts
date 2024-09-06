import { faker } from '@faker-js/faker';
import { UserModel } from '../models/user.model';

export function prepareRandomUser(): UserModel {
    const user: UserModel = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
    };

    return user;
}
