import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from '../types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type CreatePostRequestBody = {
  authorId: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
};

export type CreatePostResponse = {
  __typename?: 'CreatePostResponse';
  authorId: Scalars['String'];
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['String'];
  likes: Scalars['Int'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Cursor = {
  createdAt: Scalars['Date'];
  id: Scalars['String'];
};

export type DeletePostRequestBody = {
  authorId: Scalars['String'];
  postId: Scalars['String'];
};

export type GetAuthorPostsByIdRequestBody = {
  authorId: Scalars['String'];
  postId: Scalars['String'];
};

export type GetAuthorPostsRequestBody = {
  authorId: Scalars['String'];
  cursor?: InputMaybe<Cursor>;
  limit: Scalars['Int'];
};

export type GetAuthorPostsResponse = {
  __typename?: 'GetAuthorPostsResponse';
  authorId: Scalars['String'];
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['String'];
  likes: Scalars['Int'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type GetPostsRequestBody = {
  cursor?: InputMaybe<Cursor>;
  limit: Scalars['Int'];
};

export type LoginRequestBody = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<CreatePostResponse>;
  deletePost?: Maybe<Scalars['String']>;
  login?: Maybe<AuthResponse>;
  register?: Maybe<AuthResponse>;
  updatePost?: Maybe<Post>;
};


export type MutationCreatePostArgs = {
  inputs: CreatePostRequestBody;
};


export type MutationDeletePostArgs = {
  inputs: DeletePostRequestBody;
};


export type MutationLoginArgs = {
  inputs: LoginRequestBody;
};


export type MutationRegisterArgs = {
  inputs: RegisterRequestBody;
};


export type MutationUpdatePostArgs = {
  inputs: UpdatePostRequestBody;
};

export type Post = {
  __typename?: 'Post';
  author: PostAuthor;
  authorId: Scalars['String'];
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['String'];
  likes: Scalars['Int'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type PostAuthor = {
  __typename?: 'PostAuthor';
  email: Scalars['String'];
  id: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAuthorPostById?: Maybe<GetAuthorPostsResponse>;
  getAuthorPosts?: Maybe<Array<GetAuthorPostsResponse>>;
  getPost?: Maybe<Post>;
  getPosts?: Maybe<PaginationInfo>;
  getUsers?: Maybe<Array<User>>;
  me?: Maybe<User>;
};


export type QueryGetAuthorPostByIdArgs = {
  inputs: GetAuthorPostsByIdRequestBody;
};


export type QueryGetAuthorPostsArgs = {
  inputs: GetAuthorPostsRequestBody;
};


export type QueryGetPostArgs = {
  id: Scalars['String'];
};


export type QueryGetPostsArgs = {
  inputs: GetPostsRequestBody;
};

export type RegisterRequestBody = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdatePostRequestBody = {
  authorId: Scalars['String'];
  content: Scalars['String'];
  postId: Scalars['String'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']>;
  email: Scalars['String'];
  id: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
  username: Scalars['String'];
};

export type PaginationInfo = {
  __typename?: 'paginationInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  posts: Array<Post>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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
export type ResolversTypes = ResolversObject<{
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreatePostRequestBody: CreatePostRequestBody;
  CreatePostResponse: ResolverTypeWrapper<CreatePostResponse>;
  Cursor: Cursor;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DeletePostRequestBody: DeletePostRequestBody;
  GetAuthorPostsByIdRequestBody: GetAuthorPostsByIdRequestBody;
  GetAuthorPostsRequestBody: GetAuthorPostsRequestBody;
  GetAuthorPostsResponse: ResolverTypeWrapper<GetAuthorPostsResponse>;
  GetPostsRequestBody: GetPostsRequestBody;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginRequestBody: LoginRequestBody;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostAuthor: ResolverTypeWrapper<PostAuthor>;
  Query: ResolverTypeWrapper<{}>;
  RegisterRequestBody: RegisterRequestBody;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdatePostRequestBody: UpdatePostRequestBody;
  User: ResolverTypeWrapper<User>;
  paginationInfo: ResolverTypeWrapper<PaginationInfo>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthResponse: AuthResponse;
  Boolean: Scalars['Boolean'];
  CreatePostRequestBody: CreatePostRequestBody;
  CreatePostResponse: CreatePostResponse;
  Cursor: Cursor;
  Date: Scalars['Date'];
  DeletePostRequestBody: DeletePostRequestBody;
  GetAuthorPostsByIdRequestBody: GetAuthorPostsByIdRequestBody;
  GetAuthorPostsRequestBody: GetAuthorPostsRequestBody;
  GetAuthorPostsResponse: GetAuthorPostsResponse;
  GetPostsRequestBody: GetPostsRequestBody;
  Int: Scalars['Int'];
  LoginRequestBody: LoginRequestBody;
  Mutation: {};
  Post: Post;
  PostAuthor: PostAuthor;
  Query: {};
  RegisterRequestBody: RegisterRequestBody;
  String: Scalars['String'];
  UpdatePostRequestBody: UpdatePostRequestBody;
  User: User;
  paginationInfo: PaginationInfo;
}>;

export type AuthResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreatePostResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CreatePostResponse'] = ResolversParentTypes['CreatePostResponse']> = ResolversObject<{
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GetAuthorPostsResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['GetAuthorPostsResponse'] = ResolversParentTypes['GetAuthorPostsResponse']> = ResolversObject<{
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createPost?: Resolver<Maybe<ResolversTypes['CreatePostResponse']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'inputs'>>;
  deletePost?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'inputs'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'inputs'>>;
  register?: Resolver<Maybe<ResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'inputs'>>;
  updatePost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'inputs'>>;
}>;

export type PostResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  author?: Resolver<ResolversTypes['PostAuthor'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostAuthorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PostAuthor'] = ResolversParentTypes['PostAuthor']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAuthorPostById?: Resolver<Maybe<ResolversTypes['GetAuthorPostsResponse']>, ParentType, ContextType, RequireFields<QueryGetAuthorPostByIdArgs, 'inputs'>>;
  getAuthorPosts?: Resolver<Maybe<Array<ResolversTypes['GetAuthorPostsResponse']>>, ParentType, ContextType, RequireFields<QueryGetAuthorPostsArgs, 'inputs'>>;
  getPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryGetPostArgs, 'id'>>;
  getPosts?: Resolver<Maybe<ResolversTypes['paginationInfo']>, ParentType, ContextType, RequireFields<QueryGetPostsArgs, 'inputs'>>;
  getUsers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginationInfoResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['paginationInfo'] = ResolversParentTypes['paginationInfo']> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  AuthResponse?: AuthResponseResolvers<ContextType>;
  CreatePostResponse?: CreatePostResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  GetAuthorPostsResponse?: GetAuthorPostsResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostAuthor?: PostAuthorResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  paginationInfo?: PaginationInfoResolvers<ContextType>;
}>;

