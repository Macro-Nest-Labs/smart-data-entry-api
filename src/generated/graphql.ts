import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AssignUserRole = {
  roleName: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type BooleanFilterConstraint = {
  is?: InputMaybe<Scalars['String']['input']>;
};

export type CreateReceipt = {
  aadharNumber?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  amount: Scalars['Int']['input'];
  cancelled?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  financialYear?: InputMaybe<Scalars['String']['input']>;
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
  modeOfPayment: ModeOfPayment;
  name: Scalars['String']['input'];
  panNumber?: InputMaybe<Scalars['String']['input']>;
  receiptBookId: Scalars['String']['input'];
  receiptNumber: Scalars['Int']['input'];
};

export type CreateReceiptBook = {
  financialYear?: InputMaybe<Scalars['String']['input']>;
  receiptBookNumber: Scalars['Int']['input'];
  receiptSeries: Scalars['Int']['input'];
  totalReceipts: Scalars['Int']['input'];
};

export type CreateUserRole = {
  name: Scalars['String']['input'];
  permissions: Array<Scalars['String']['input']>;
};

export type DateFilterConstraint = {
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
};

export type FloatFilterConstraint = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Others = 'OTHERS'
}

export type Id = {
  id?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export enum IdCode {
  Aadhar = 'Aadhar',
  Pan = 'PAN'
}

export type IdFilterConstraints = {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type IntFilterConstraint = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export enum ModeOfPayment {
  Cash = 'cash',
  Cheque = 'cheque',
  Online = 'online'
}

export type Mutation = {
  __typename?: 'Mutation';
  assignRoleToUser?: Maybe<Scalars['Boolean']['output']>;
  createReceipt?: Maybe<Receipt>;
  createReceiptBook?: Maybe<ReceiptBook>;
  createUserRole?: Maybe<Scalars['Boolean']['output']>;
  deleteReceipt?: Maybe<Receipt>;
  deleteReceiptBook?: Maybe<ReceiptBook>;
  deleteUserRole?: Maybe<Scalars['Boolean']['output']>;
  removeRoleFromUser?: Maybe<Scalars['Boolean']['output']>;
  updateReceipt?: Maybe<Receipt>;
  updateReceiptBook?: Maybe<ReceiptBook>;
};


export type MutationAssignRoleToUserArgs = {
  item?: InputMaybe<AssignUserRole>;
};


export type MutationCreateReceiptArgs = {
  item: CreateReceipt;
};


export type MutationCreateReceiptBookArgs = {
  item: CreateReceiptBook;
};


export type MutationCreateUserRoleArgs = {
  item: CreateUserRole;
};


export type MutationDeleteReceiptArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteReceiptBookArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserRoleArgs = {
  name: Scalars['String']['input'];
};


export type MutationRemoveRoleFromUserArgs = {
  item?: InputMaybe<RemoveUserRole>;
};


export type MutationUpdateReceiptArgs = {
  id: Scalars['String']['input'];
  item: UpdateReceipt;
};


export type MutationUpdateReceiptBookArgs = {
  id: Scalars['String']['input'];
  item: UpdateReceiptBook;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage?: Maybe<Scalars['Int']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  itemCount?: Maybe<Scalars['Int']['output']>;
  pageCount?: Maybe<Scalars['Int']['output']>;
  pageItemCount?: Maybe<Scalars['Int']['output']>;
  perPage?: Maybe<Scalars['Int']['output']>;
};

export type PaginationInput = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  Receipt?: Maybe<Receipt>;
  ReceiptBook?: Maybe<ReceiptBook>;
  ReceiptBooks?: Maybe<ReceiptBooks>;
  ReceiptBooksAll?: Maybe<Array<Maybe<ReceiptBook>>>;
  Receipts?: Maybe<Receipts>;
  ReceiptsAll?: Maybe<Array<Maybe<Receipt>>>;
  User?: Maybe<User>;
  UserRole?: Maybe<UserRole>;
  UserRolesAll?: Maybe<Array<Maybe<UserRole>>>;
};


export type QueryReceiptArgs = {
  where?: InputMaybe<WhereOptionsReceipt>;
};


export type QueryReceiptBookArgs = {
  where?: InputMaybe<WhereOptionsReceiptBook>;
};


export type QueryReceiptBooksArgs = {
  paginate?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
  where?: InputMaybe<WhereOptionsReceiptBook>;
};


export type QueryReceiptsArgs = {
  paginate?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
  where?: InputMaybe<WhereOptionsReceipt>;
};


export type QueryUserArgs = {
  where?: InputMaybe<WhereOptionsUser>;
};


export type QueryUserRoleArgs = {
  where?: InputMaybe<WhereOptionsUserRole>;
};

/** Receipt Schema */
export type Receipt = {
  __typename?: 'Receipt';
  aadharNumber?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  amount: Scalars['Int']['output'];
  cancelled?: Maybe<Scalars['Boolean']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  financialYear?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  idCode?: Maybe<IdCode>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  modeOfPayment: ModeOfPayment;
  name?: Maybe<Scalars['String']['output']>;
  panNumber?: Maybe<Scalars['String']['output']>;
  receiptBook: ReceiptBook;
  receiptNumber: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type ReceiptBook = {
  __typename?: 'ReceiptBook';
  financialYear?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  receiptBookNumber: Scalars['Int']['output'];
  receiptSeries: Scalars['Int']['output'];
  receipts?: Maybe<Array<Maybe<Receipt>>>;
  totalReceipts: Scalars['Int']['output'];
  usedReceipts: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type ReceiptBooks = {
  __typename?: 'ReceiptBooks';
  pageInfo?: Maybe<PageInfo>;
  results?: Maybe<Array<Maybe<ReceiptBook>>>;
};

export type Receipts = {
  __typename?: 'Receipts';
  pageInfo?: Maybe<PageInfo>;
  results?: Maybe<Array<Maybe<Receipt>>>;
};

export type RemoveUserRole = {
  roleName: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type SortColumn = {
  field?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<SortOrder>;
};

export type SortInput = {
  order?: InputMaybe<Array<InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>>>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringFilterConstraint = {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  is?: InputMaybe<Scalars['String']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  not?: InputMaybe<Scalars['String']['input']>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReceipt = {
  aadharNumber?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  cancelled?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  financialYear?: InputMaybe<Scalars['String']['input']>;
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
  modeOfPayment?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  panNumber?: InputMaybe<Scalars['String']['input']>;
  receiptBookId?: InputMaybe<Scalars['String']['input']>;
  receiptNumber?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateReceiptBook = {
  financialYear?: InputMaybe<Scalars['String']['input']>;
  receiptBookNumber?: InputMaybe<Scalars['Int']['input']>;
  receiptSeries?: InputMaybe<Scalars['Int']['input']>;
  totalReceipts?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserRole = {
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type User = {
  __typename?: 'User';
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
  userId: Scalars['String']['output'];
};

export type UserRole = {
  __typename?: 'UserRole';
  name: Scalars['String']['output'];
  permissions: Array<Scalars['String']['output']>;
};

export type UserRoles = {
  __typename?: 'UserRoles';
  pageInfo?: Maybe<PageInfo>;
  results?: Maybe<Array<Maybe<UserRole>>>;
};

export type WhereOptionsReceipt = {
  address?: InputMaybe<StringFilterConstraint>;
  amount?: InputMaybe<IntFilterConstraint>;
  and?: InputMaybe<Array<InputMaybe<WhereOptionsReceiptFields>>>;
  cancelled?: InputMaybe<BooleanFilterConstraint>;
  financialYear?: InputMaybe<StringFilterConstraint>;
  id?: InputMaybe<Scalars['String']['input']>;
  idCode?: InputMaybe<StringFilterConstraint>;
  modeOfPayment?: InputMaybe<StringFilterConstraint>;
  or?: InputMaybe<Array<InputMaybe<WhereOptionsReceiptFields>>>;
  receiptNumber?: InputMaybe<IntFilterConstraint>;
  uuid?: InputMaybe<IdFilterConstraints>;
};

export type WhereOptionsReceiptBook = {
  and?: InputMaybe<Array<InputMaybe<WhereOptionsReceiptBookFields>>>;
  financialYear?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<WhereOptionsReceiptBookFields>>>;
  receiptBookNumber?: InputMaybe<IntFilterConstraint>;
  receiptSeries?: InputMaybe<IntFilterConstraint>;
  totalReceipts?: InputMaybe<IntFilterConstraint>;
  uuid?: InputMaybe<IdFilterConstraints>;
};

export type WhereOptionsReceiptBookFields = {
  financialYear?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  receiptBookNumber?: InputMaybe<IntFilterConstraint>;
  receiptSeries?: InputMaybe<IntFilterConstraint>;
  totalReceipts?: InputMaybe<IntFilterConstraint>;
  uuid?: InputMaybe<IdFilterConstraints>;
};

export type WhereOptionsReceiptFields = {
  address?: InputMaybe<StringFilterConstraint>;
  amount?: InputMaybe<IntFilterConstraint>;
  cancelled?: InputMaybe<BooleanFilterConstraint>;
  financialYear?: InputMaybe<StringFilterConstraint>;
  id?: InputMaybe<Scalars['String']['input']>;
  modeOfPayment?: InputMaybe<StringFilterConstraint>;
  receiptNumber?: InputMaybe<IntFilterConstraint>;
  uuid?: InputMaybe<IdFilterConstraints>;
};

export type WhereOptionsUser = {
  userId: Scalars['String']['input'];
};

export type WhereOptionsUserRole = {
  name?: InputMaybe<StringFilterConstraint>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AssignUserRole: AssignUserRole;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BooleanFilterConstraint: BooleanFilterConstraint;
  CreateReceipt: CreateReceipt;
  CreateReceiptBook: CreateReceiptBook;
  CreateUserRole: CreateUserRole;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateFilterConstraint: DateFilterConstraint;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  FloatFilterConstraint: FloatFilterConstraint;
  Gender: Gender;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Id: Id;
  IdCode: IdCode;
  IdFilterConstraints: IdFilterConstraints;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  IntFilterConstraint: IntFilterConstraint;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  ModeOfPayment: ModeOfPayment;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PaginationInput: PaginationInput;
  Query: ResolverTypeWrapper<{}>;
  Receipt: ResolverTypeWrapper<Receipt>;
  ReceiptBook: ResolverTypeWrapper<ReceiptBook>;
  ReceiptBooks: ResolverTypeWrapper<ReceiptBooks>;
  Receipts: ResolverTypeWrapper<Receipts>;
  RemoveUserRole: RemoveUserRole;
  SortColumn: SortColumn;
  SortInput: SortInput;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringFilterConstraint: StringFilterConstraint;
  UpdateReceipt: UpdateReceipt;
  UpdateReceiptBook: UpdateReceiptBook;
  UpdateUserRole: UpdateUserRole;
  User: ResolverTypeWrapper<User>;
  UserRole: ResolverTypeWrapper<UserRole>;
  UserRoles: ResolverTypeWrapper<UserRoles>;
  WhereOptionsReceipt: WhereOptionsReceipt;
  WhereOptionsReceiptBook: WhereOptionsReceiptBook;
  WhereOptionsReceiptBookFields: WhereOptionsReceiptBookFields;
  WhereOptionsReceiptFields: WhereOptionsReceiptFields;
  WhereOptionsUser: WhereOptionsUser;
  WhereOptionsUserRole: WhereOptionsUserRole;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AssignUserRole: AssignUserRole;
  Boolean: Scalars['Boolean']['output'];
  BooleanFilterConstraint: BooleanFilterConstraint;
  CreateReceipt: CreateReceipt;
  CreateReceiptBook: CreateReceiptBook;
  CreateUserRole: CreateUserRole;
  Date: Scalars['Date']['output'];
  DateFilterConstraint: DateFilterConstraint;
  Float: Scalars['Float']['output'];
  FloatFilterConstraint: FloatFilterConstraint;
  ID: Scalars['ID']['output'];
  Id: Id;
  IdFilterConstraints: IdFilterConstraints;
  Int: Scalars['Int']['output'];
  IntFilterConstraint: IntFilterConstraint;
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  PageInfo: PageInfo;
  PaginationInput: PaginationInput;
  Query: {};
  Receipt: Receipt;
  ReceiptBook: ReceiptBook;
  ReceiptBooks: ReceiptBooks;
  Receipts: Receipts;
  RemoveUserRole: RemoveUserRole;
  SortColumn: SortColumn;
  SortInput: SortInput;
  String: Scalars['String']['output'];
  StringFilterConstraint: StringFilterConstraint;
  UpdateReceipt: UpdateReceipt;
  UpdateReceiptBook: UpdateReceiptBook;
  UpdateUserRole: UpdateUserRole;
  User: User;
  UserRole: UserRole;
  UserRoles: UserRoles;
  WhereOptionsReceipt: WhereOptionsReceipt;
  WhereOptionsReceiptBook: WhereOptionsReceiptBook;
  WhereOptionsReceiptBookFields: WhereOptionsReceiptBookFields;
  WhereOptionsReceiptFields: WhereOptionsReceiptFields;
  WhereOptionsUser: WhereOptionsUser;
  WhereOptionsUserRole: WhereOptionsUserRole;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  assignRoleToUser?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationAssignRoleToUserArgs>>;
  createReceipt?: Resolver<Maybe<ResolversTypes['Receipt']>, ParentType, ContextType, RequireFields<MutationCreateReceiptArgs, 'item'>>;
  createReceiptBook?: Resolver<Maybe<ResolversTypes['ReceiptBook']>, ParentType, ContextType, RequireFields<MutationCreateReceiptBookArgs, 'item'>>;
  createUserRole?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCreateUserRoleArgs, 'item'>>;
  deleteReceipt?: Resolver<Maybe<ResolversTypes['Receipt']>, ParentType, ContextType, RequireFields<MutationDeleteReceiptArgs, 'id'>>;
  deleteReceiptBook?: Resolver<Maybe<ResolversTypes['ReceiptBook']>, ParentType, ContextType, RequireFields<MutationDeleteReceiptBookArgs, 'id'>>;
  deleteUserRole?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteUserRoleArgs, 'name'>>;
  removeRoleFromUser?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationRemoveRoleFromUserArgs>>;
  updateReceipt?: Resolver<Maybe<ResolversTypes['Receipt']>, ParentType, ContextType, RequireFields<MutationUpdateReceiptArgs, 'id' | 'item'>>;
  updateReceiptBook?: Resolver<Maybe<ResolversTypes['ReceiptBook']>, ParentType, ContextType, RequireFields<MutationUpdateReceiptBookArgs, 'id' | 'item'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasPreviousPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  itemCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pageCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pageItemCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  perPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  Receipt?: Resolver<Maybe<ResolversTypes['Receipt']>, ParentType, ContextType, Partial<QueryReceiptArgs>>;
  ReceiptBook?: Resolver<Maybe<ResolversTypes['ReceiptBook']>, ParentType, ContextType, Partial<QueryReceiptBookArgs>>;
  ReceiptBooks?: Resolver<Maybe<ResolversTypes['ReceiptBooks']>, ParentType, ContextType, Partial<QueryReceiptBooksArgs>>;
  ReceiptBooksAll?: Resolver<Maybe<Array<Maybe<ResolversTypes['ReceiptBook']>>>, ParentType, ContextType>;
  Receipts?: Resolver<Maybe<ResolversTypes['Receipts']>, ParentType, ContextType, Partial<QueryReceiptsArgs>>;
  ReceiptsAll?: Resolver<Maybe<Array<Maybe<ResolversTypes['Receipt']>>>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserArgs>>;
  UserRole?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType, Partial<QueryUserRoleArgs>>;
  UserRolesAll?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserRole']>>>, ParentType, ContextType>;
};

export type ReceiptResolvers<ContextType = any, ParentType extends ResolversParentTypes['Receipt'] = ResolversParentTypes['Receipt']> = {
  aadharNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cancelled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  financialYear?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  idCode?: Resolver<Maybe<ResolversTypes['IdCode']>, ParentType, ContextType>;
  mobileNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modeOfPayment?: Resolver<ResolversTypes['ModeOfPayment'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  panNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  receiptBook?: Resolver<ResolversTypes['ReceiptBook'], ParentType, ContextType>;
  receiptNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReceiptBookResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReceiptBook'] = ResolversParentTypes['ReceiptBook']> = {
  financialYear?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  receiptBookNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  receiptSeries?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  receipts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Receipt']>>>, ParentType, ContextType>;
  totalReceipts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  usedReceipts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReceiptBooksResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReceiptBooks'] = ResolversParentTypes['ReceiptBooks']> = {
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['ReceiptBook']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReceiptsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Receipts'] = ResolversParentTypes['Receipts']> = {
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['Receipt']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserRole']>>>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRole'] = ResolversParentTypes['UserRole']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRolesResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRoles'] = ResolversParentTypes['UserRoles']> = {
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserRole']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Receipt?: ReceiptResolvers<ContextType>;
  ReceiptBook?: ReceiptBookResolvers<ContextType>;
  ReceiptBooks?: ReceiptBooksResolvers<ContextType>;
  Receipts?: ReceiptsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserRole?: UserRoleResolvers<ContextType>;
  UserRoles?: UserRolesResolvers<ContextType>;
};

