import { GraphQLResolveInfo } from 'graphql';
import { fieldsList } from 'graphql-fields-list';
import union from 'lodash/union';

import { logger } from './../../logger';

export const pickAttributes = (resolvers, info: GraphQLResolveInfo, model: string, path: string, keys: string[] = []) => {
  const fields = path ? fieldsList(info, { path: path }) : fieldsList(info);
  logger.info('fields: ', fields);
  const columns = fields.filter((f) => (resolvers[model] ? !resolvers[model][f] && f !== '__typename' : true));
  return union(columns, keys).filter((f) => f !== '__typename');
};
