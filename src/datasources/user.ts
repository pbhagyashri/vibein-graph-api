import { RESTDataSource } from '@apollo/datasource-rest';
import { User } from 'src/__generated__/resolvers-types';
import {
	CreatePostRequestBody,
	CreatePostResponseBody,
	UpdatePostPathParameter,
	UpdatePostRequestBody,
} from 'src/types';

export class UserAPI extends RESTDataSource {
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

	async getUsers() {
		const users = await this.get('users');
		return users;
	}

	async me(token: string | undefined): Promise<User> {
		// const headers = this.getHeaders(token);

		try {
			const userRecord = await this.get('me', {
				// headers,
			});

			return userRecord.record;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createPost(
		{ id, title, content, authorId }: CreatePostRequestBody,
		token?: string,
	): Promise<CreatePostResponseBody> {
		const headers = this.getHeaders(token || this.token);

		try {
			const response = await this.post(`users/${authorId}/posts`, { headers, body: { title, content, authorId } });
			return response.record;
		} catch (error) {
			return error;
		}
	}

	async updatePost({ id, postId, title, content }: UpdatePostPathParameter & UpdatePostRequestBody, token?: string) {
		// const headers = this.getHeaders(token);

		const updatedPost = await this.patch(`/users/${id}/posts/${postId}`, {
			// headers,
			body: {
				title,
				content,
			},
		});

		return updatedPost.record;
	}
}
