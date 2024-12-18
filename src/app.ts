import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginUsageReportingDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import cors from 'cors';
import express from 'express';
import robots from 'express-robots-txt';
import http from 'http';
import supertokens from 'supertokens-node';
import { errorHandler, middleware } from 'supertokens-node/framework/express';

import { context } from './auth';
import { AuthContext } from './common/types';
import { APP_PORT, DEPLOY_ENV } from './constants';
import { downloadExcel } from './controllers/receipt.controller';
import { connectToMongo } from './database';
import { gqlModules, scalars } from './graphql/all.types';
import { logger } from './logger';
import { errorLogPlugin } from './plugins/apolloErrorLogging';
import typeDefs from './schema.graphql';
import { ensureSuperTokensInit } from './utils/supertokens/init-supertokens';

const app = express();
const isProd = DEPLOY_ENV == 'prod';
const httpServer = http.createServer(app);

ensureSuperTokensInit();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(robots({ UserAgent: '*', Disallow: '/' }));
app.use(
  cors({
    origin: ['https://smart-data-entry-ui.vercel.app', 'http://localhost:3000'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  }),
);

app.use(middleware());

const playgroundPlugin = isProd
  ? ApolloServerPluginLandingPageProductionDefault()
  : ApolloServerPluginLandingPageLocalDefault({ footer: false });

const server = new ApolloServer<{ auth: AuthContext }>({
  introspection: true,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginUsageReportingDisabled(),
    errorLogPlugin,
    playgroundPlugin,
  ],
  formatError: (formattedError, error) => {
    if (formattedError?.extensions?.code) {
      const code = formattedError.extensions.code;
      switch (code) {
        case 'UNAUTHENTICATED':
          return {
            message: 'Expired or invalid Authorization',
            extensions: {
              ...(formattedError.extensions ?? {}),
              code: 'UNAUTHENTICATED',
            },
          };
        case 'INTROSPECTION_RESTRICTED':
          return formattedError;
        default:
          logger.error({ ...formattedError, stack: error?.['stack'] ?? null });
          return formattedError;
      }
    }

    const isSequelize = error?.['stack']?.indexOf(/query\.run/gi);
    if (isSequelize) {
      logger.error(formattedError, error);
      return {
        extensions: { code: 'DATA_STORE_ERROR' },
        message: 'Data store error',
      };
    }
    return formattedError;
  },
  typeDefs: typeDefs,
  resolvers: gqlModules.map((m) => m.resolvers).concat(scalars),
});

await server.start();

connectToMongo();

app.use(
  '/graphql',
  cors({
    origin: ['https://smart-data-entry-ui.vercel.app', 'http://localhost:3000'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, { context: context }),
);
// RESTful Routes
app.use('/api/v1/receipts/download-excel', downloadExcel);

app.use(errorHandler());

await new Promise<void>((resolve) => {
  const s = httpServer.listen({ port: APP_PORT }, resolve);
  s.keepAliveTimeout = 29000;
  s.headersTimeout = 30000;
});

logger.info(`🚀 Server ready at http://localhost:${APP_PORT}`);

app.get('/health-check', (req, res) => {
  res.status(200).send('OK');
});
