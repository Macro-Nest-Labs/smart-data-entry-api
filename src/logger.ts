/* eslint-disable @typescript-eslint/no-var-requires */
import { LOG_CONFIG } from './constants';
const pino = require('pino-http')(LOG_CONFIG);
export const logger = require('pino')(require('pino-pretty')(LOG_CONFIG));

export const queryLogger =
  (requestId: string = 'Unknown') =>
  (sql: string = '') =>
    logger.info({
      requestId: requestId,
      query: sql.replace('Executing (default): ', ''),
    });

export { pino };
