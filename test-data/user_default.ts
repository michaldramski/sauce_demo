import 'dotenv/config';

export const DefaultUser = {   
    "username": process.env.DEFAULT_USER_NAME || 'not found',
    "password": process.env.DEFAULT_USER_PASSWORD || 'not found'
}