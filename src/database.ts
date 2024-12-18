import mongoose, { ConnectOptions } from 'mongoose';

import { MONGO_URI } from './constants';
import { logger } from './logger';

const options: ConnectOptions = {};

const handleError = (error: string) => {
  logger.error(`[+] Coudn't connect to MongoDB, ${error}`);
};

const logError = (err: string) => {
  logger.error(`[+] Error occurred: ${err}`);
};

export const connectToMongo = async () => {
  try {
    logger.info('[+] Attempting to connect to MongoDB Atlas');
    mongoose.connect(MONGO_URI, options);
  } catch (error) {
    handleError(error);
  }
};

mongoose.connection.on('open', () => {
  logger.info('[+] Connnection opened');
});

mongoose.connection.on('error', (err) => {
  logError(err);
});
