import { paths } from 'src/generated/openapi';
import { UserAPI, PostsAPI, AuthAPI } from './datasources';

export interface MyContext {
	dataSources: {
		token?: string;
		postApi: PostsAPI;
		userApi: UserAPI;
		authApi: AuthAPI;
	};
}

// posts
export type Cursor = {
	id: string;
	createdAt: string;
};

export type GetPostsRequestBody =
	paths['/posts?cursor[id]={id}%[createdAt]={createdAt}&limit={limit}']['get']['parameters']['query'];
export type GetPostsResponseBody =
	paths['/posts?cursor[id]={id}%[createdAt]={createdAt}&limit={limit}']['get']['responses']['200']['content']['application/json'];
export type GetPostResponseBody = paths['/posts/{id}']['get']['responses']['200']['content']['application/json'];
export type CreatePostRequestBody =
	paths['/authors/{authorId}/posts']['post']['requestBody']['content']['application/json'];
export type CreatePostResponseBody =
	paths['/authors/{authorId}/posts']['post']['responses']['200']['content']['application/json'];
export type GetAuthorPostsPathParameter = paths['/authors/{authorId}/posts']['get']['parameters']['path'];
export type GetAuthorPostsResponseBody =
	paths['/authors/{authorId}/posts']['get']['responses']['200']['content']['application/json'];
export type GetAuthorPostByIdPathParameter = paths['/authors/{authorId}/posts/{postId}']['get']['parameters']['path'];
export type GetAuthorPostByIdResponseBody =
	paths['/authors/{authorId}/posts/{postId}']['get']['responses']['200']['content']['application/json'];

// upadate post
export type UpdatePostPathParameter = paths['/authors/{authorId}/posts/{postId}']['patch']['parameters']['path'];
export type UpdatePostRequestBody = NonNullable<
	paths['/authors/{authorId}/posts/{postId}']['patch']['requestBody']
>['content']['application/json'];
export type UpdatePostResponseBody =
	paths['/authors/{authorId}/posts/{postId}']['patch']['responses']['200']['content']['application/json'];

// login
export type LoginRequestBody = paths['/login']['post']['requestBody']['content']['application/json'];
export type LoginResponseBody = paths['/login']['post']['responses']['200']['content']['application/json'];

// register
export type RegisterRequestBody = paths['/register']['post']['requestBody']['content']['application/json'];
export type RegisterResponseBody = paths['/register']['post']['responses']['200']['content']['application/json'];
