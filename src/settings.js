import dotenv from 'dotenv';

dotenv.config();
var env = process.env.NODE_ENV;

// convert to uppercase
var envString = env.toUpperCase();

export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
export const connectionString = process.env['DATABASE_URL_' + envString];
export const googleClientId = process.env.GOOGLE_CLIENT_ID;
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const decimalPlaces = 2;
