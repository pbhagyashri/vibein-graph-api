import { RESTDataSource } from '@apollo/datasource-rest';

import { GetPostResponseBody, GetPostsResponseBody, GetPostsRequestBody } from '../types';

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

	async getAllPosts({ limit, cursor }: GetPostsRequestBody, token?: string): Promise<GetPostsResponseBody['record']> {
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

				return responses?.record;
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
			return responses?.record;
		} catch (error) {
			return error;
		}
	}

	async getPost(id: string, token?: string): Promise<GetPostResponseBody['record']> {
		const headers = this.getHeaders(token || this.token);

		try {
			const response: GetPostResponseBody = await this.get(`posts/${id}`, { headers });
			return response?.record;
		} catch (error) {
			return error;
		}
	}

	async deletePost(id: string, token?: string): Promise<String> {
		try {
			await this.delete(`posts/${id}`, {
				headers: {
					authorization: token || this.token,
				},
			});
			return 'Post deleted successfully';
		} catch (error) {
			return error;
		}
	}
}
