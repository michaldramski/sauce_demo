import dotenv from 'dotenv';

async function globalSetup(): Promise<void> {
    dotenv.config({ override: true, path: './env-variables/.env' });
}

export default globalSetup;
