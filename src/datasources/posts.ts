import { RESTDataSource } from '@apollo/datasource-rest';

import { GetPostResponseBody, GetPostsResponseBody, GetPostsPathParameters } from '../types';

export class PostsAPI extends RESTDataSource {
	private token: string;

	constructor() {
		super();
		this.baseURL = 'http://localhost:4000/';
		this.token = this.token;
	}

	protected getHeaders(token: string) {
		return {
			authorization: token,
		};
	}

	async getAllPosts({ limit, cursor }: GetPostsPathParameters, token?: string): Promise<GetPostsResponseBody> {
		const headers = this.getHeaders(token || this.token);

		try {
			if (!cursor) {
				// const responses: GetPostsResponseBody = await this.get(`posts?limit=${limit}`, { headers });

				const responses: GetPostsResponseBody = await this.get('posts', {
					params: {
						limit: limit?.toString(), // all params entries should be strings,
					},
					headers,
				});

				return responses;
			}

			// const responses: GetPostsResponseBody = await this.get(`posts?cursor=${cursor}&limit=${limit}`, { headers });
			const cursorObj = JSON.stringify({
				id: cursor.id,
				createdAt: cursor.createdAt,
			});

			const responses: GetPostsResponseBody = await this.get('posts', {
				params: {
					limit: limit?.toString(), // all params entries should be strings,
					cursor: cursorObj,
				},
				headers,
			});

			return responses;
		} catch (error) {
			return error;
		}
	}

	async getPost(id: string, token?: string): Promise<GetPostResponseBody> {
		const headers = this.getHeaders(token || this.token);

		try {
			const response: GetPostResponseBody = await this.get(`posts/${id}`, { headers });
			const post = response;
			if (!post) {
				throw new Error('Post not found');
			}
			return post;
		} catch (error) {
			return error;
		}
	}
}
