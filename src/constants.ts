import dotenv from 'dotenv';

dotenv.config();

export const LOG_LEVEL = parseInt(process.env.APP_LOG_LEVEL || '40');
export const LOG_CONFIG = {
  level: LOG_LEVEL,
  formatters: {
    level: (label) => ({ level: label }),
  },
};

export const APP_PORT = parseInt(process.env.PORT ?? '8000');
export const MONGO_URI = process.env.MONGO_URI;

export const DEPLOY_ENV = process.env.DEPLOY_ENV || 'prod';
export const IS_LOCAL = DEPLOY_ENV === 'local';

export const MAX_HTTP_BACKLOG = process.env.MAX_HTTP_BACKLOG ? parseInt(process.env.MAX_HTTP_BACKLOG) : 1023;
export const APP_KEEPALIVE_TIMEOUT = process.env.APP_KEEPALIVE_TIMEOUT ? parseInt(process.env.APP_KEEPALIVE_TIMEOUT) : 90000;
export const APP_HEADERS_TIMEOUT = process.env.APP_HEADERS_TIMEOUT ? parseInt(process.env.APP_HEADERS_TIMEOUT) : 95000;

// Supertokens
export const SUPERTOKENS_CONNECTION_URI = process.env.SUPERTOKENS_CONNECTION_URI;
export const SUPERTOKENS_API_KEY = process.env.SUPERTOKENS_API_KEY;
export const SUPERTOKENS_APP_DOMAIN = process.env.SUPERTOKENS_APP_DOMAIN;
export const SUPERTOKENS_API_DOMAIN = process.env.SUPERTOKENS_API_DOMAIN;
