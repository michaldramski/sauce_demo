import { UserModel } from '../models/user.model';

export const DefaultUser: UserModel = {
    username: process.env.DEFAULT_USER_NAME || 'not found',
    password: process.env.DEFAULT_USER_PASSWORD || 'not found',
};

export const LockedOutUser: UserModel = {
    username: 'locked_out_user',
    password: 'secret_sauce',
};
