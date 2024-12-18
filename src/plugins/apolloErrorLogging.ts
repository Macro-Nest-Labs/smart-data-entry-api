import { ApolloServerPlugin } from '@apollo/server';
import { performance } from 'perf_hooks';

import { GraphQLRequestContextWithAuth } from '../common/types';
import { logger } from '../logger';

export const errorLogPlugin: ApolloServerPlugin = {
  async requestDidStart(context: GraphQLRequestContextWithAuth) {
    const start = performance.now();
    let operation: string | null,
      queryExcerpt: string | null,
      variables = {};
    return {
      async didResolveOperation(context) {
        const { request } = context;
        variables = request.variables;
        let queryExcerpt = '';
        if (!operation && request.query) {
          queryExcerpt = (request.query ?? '').substring(0, 150);
          queryExcerpt.replace(/\n+/gm, '').replace(/\s{2,}/gm, ' ');
        }
        operation = context.operationName ?? context.operation?.selectionSet?.selections?.[0]?.['name']?.value ?? 'Unnamed Operation';
      },
      async willSendResponse({ response, errors, contextValue }) {
        const elapsed = Math.round(performance.now() - start);
        if (!errors || errors.length === 0) {
          response.http.headers.set('Server-Timing', `total;dur=${elapsed}`);
          if (operation.match(/introspection/gi) == null) {
            const oplog = `Operation Metrics: ${operation ?? 'Unnamed Operation'} duration=${elapsed}ms`;
            logger.info({
              requestId: contextValue['requestId'],
              message: oplog,
            });
          }
        }
      },
      async didEncounterErrors({ errors }) {
        for (const error of errors) {
          error.extensions.requestId = context.contextValue.requestId;
          error.extensions.operationName = operation ?? queryExcerpt;
          error.extensions.variables = variables ?? {};
        }
      },
    };
  },
};
