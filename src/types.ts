import { paths } from 'src/generated/openapi';
import { UserAPI, PostsAPI, AuthAPI } from './datasources';

export interface MyContext {
	dataSources: {
		postApi: PostsAPI;
		userApi: UserAPI;
		authApi: AuthAPI;
		token: string | undefined;
	};
}

// posts
export type GetPostsRequestBody = paths['/posts?cursor={cursor}&limit={limit}']['get']['parameters']['query'];
export type GetPostsResponseBody =
	paths['/posts?cursor={cursor}&limit={limit}']['get']['responses']['200']['content']['application/json'];
export type GetPostResponseBody = paths['/posts/{id}']['get']['responses']['200']['content']['application/json'];
export type CreatePostRequestBody = paths['/posts']['post']['requestBody']['content']['application/json'];
export type CreatePostResponseBody = paths['/posts']['post']['responses']['200']['content']['application/json'];

// login
export type LoginRequestBody = paths['/login']['post']['requestBody']['content']['application/json'];
export type LoginResponseBody = paths['/login']['post']['responses']['200']['content']['application/json'];

// register
export type RegisterRequestBody = paths['/register']['post']['requestBody']['content']['application/json'];
export type RegisterResponseBody = paths['/register']['post']['responses']['200']['content']['application/json'];
