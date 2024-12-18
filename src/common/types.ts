/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLRequestContext } from '@apollo/server';
import { GraphQLError } from 'graphql';

export interface MinMax {
  min: number;
  max: number;
}

export type WhereOwnKeys<K> = Partial<Omit<K, 'and' | 'or'>>;

export type WhereClause<K> = {
  [Property in 'and' | 'or' | keyof K]?: any;
};
export type SortArgs<K> = { order: [Extract<keyof K, string>, string][] };

export type QueryInclude = {
  include?: [QueryInclude];
  as?: string;
  model: any;
  where?: any;
  required?: boolean;
  attributes?: string[];
};

export type Resolvers = {
  Query: any;
  [k: string]: () => any;
};

export type QueryArgs<T, W> = {
  paginate?: Partial<PageOffsetLimit>;
  subQuery?: boolean;
  sort?: SortArgs<T>;
  include?: QueryInclude[];
  group?: string;
  distinct?: boolean;
  attributes?: string[];
  where?: WhereClause<W>;
};

export type PaginatedResponse<K> = {
  results: K[];
  pageInfo: PageInfo;
};

export type PageInfo = {
  currentPage: number;
  perPage: number;
  itemCount: number;
  pageItemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type ObjectCountResponse = {
  [key: string]: number;
};

export type CountResponse = ObjectCountResponse | number;

export type PageOffsetLimit = {
  page: number;
  pageSize: number;
  offset: number;
  limit: number;
};

export interface AuthContext {
  isAnonymous: boolean;
  canQuery: boolean;
  canIntrospect: boolean;
  canMutate: boolean;
  authData?: {
    userId?: string;
    userRoles?: string[];
    userDataInAccessToken?: any;
  };
  permissions?: {
    read_all: boolean;
    delete_all: boolean;
    delete_self: boolean;
    edit_all: boolean;
    edit_self: boolean;
  };
}

export interface OAuthClientCredentials {
  sub: string;
  token_use: string;
  scope: string;
  auth_time: number;
  iss: string;
  exp: number;
  iat: number;
  version: number;
  jti: string;
  client_id: string;
}

export type CreateArgs<K> = {
  item: K;
};

export type UpdateArgs<K> = {
  id: number;
  item: K;
};

export type DeleteArgs<K> = {
  id: K;
};

export interface StringFilterConstraint {
  ne?: string;
  eq?: string;
  like?: string;
  notLike?: string;
  is?: string;
  not?: string;
  in?: [string];
  notIn?: [string];
}

export interface IntFilterConstraint {
  in?: number[];
  notIn?: number[];
  ne?: number;
  eq?: number;
  lte?: number;
  lt?: number;
  gte?: number;
  gt?: number;
  between?: number[];
  notBetween?: number[];
  is?: number;
}

export interface FloatFilterConstraint {
  in?: number[];
  notIn?: number[];
  ne?: number;
  eq?: number;
  lte?: number;
  lt?: number;
  gte?: number;
  gt?: number;
  between?: number[];
  notBetween?: number[];
  is?: number;
}

export interface DateFilterConstraint {
  lte?: string;
  lt?: string;
  gte?: string;
  gt?: string;
  between?: string[];
  notBetween?: string[];
  isNull?: string;
  isNotNull?: string;
}

export interface Id {
  id?: number;
  slug?: string;
  uuid?: string;
}

export const DataStoreError = (message: string) => new GraphQLError(message, { extensions: { code: 'DATASTORE_ERROR' } });

export const DataIntegrityError = (message: string) =>
  new GraphQLError(message, {
    extensions: { code: 'DATA_INTEGRITY_ERROR' },
  });

export const ForbiddenError = (message: string) => new GraphQLError(message, { extensions: { code: 'UNAUTHENTICATED' } });

export const UserInputError = (message: string) => new GraphQLError(message, { extensions: { code: 'BAD_USER_INPUT' } });

export interface BaseRequestContext {
  cache: any;
  requestId: string;
}

export interface GraphQLRequestContextWithAuth extends GraphQLRequestContext<AuthContext & BaseRequestContext> {
  auth: AuthContext;
}
