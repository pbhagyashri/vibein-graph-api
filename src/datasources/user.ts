import { RESTDataSource } from '@apollo/datasource-rest';
import { User } from 'src/__generated__/resolvers-types';
import {
	CreatePostRequestBody,
	CreatePostPathParameter,
	CreatePostResponseBody,
	UpdatePostPathParameter,
	UpdatePostRequestBody,
	Cursor,
	GetAuthorPostsResponseBody,
} from '../types';

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

	async me(token: string): Promise<User> {
		const headers = this.getHeaders(token);
		try {
			const userRecord = await this.get('me', {
				headers,
			});

			return userRecord.record;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createPost(
		{ title, content, authorId }: CreatePostRequestBody & CreatePostPathParameter,
		token: string,
	): Promise<CreatePostResponseBody> {
		const headers = this.getHeaders(token);

		try {
			const response = await this.post(`authors/${authorId}/posts`, {
				headers: headers,
				body: { title, content },
			});
			return response.record;
		} catch (error) {
			return error;
		}
	}

	async updatePost(
		{ title, content, authorId, postId }: UpdatePostPathParameter & UpdatePostRequestBody,
		token: string,
	) {
		try {
			const updatedPost = await this.patch(`/authors/${authorId}/posts/${postId}`, {
				headers: this.getHeaders(token),
				body: {
					title,
					content,
				},
			});

			return updatedPost.record;
		} catch (error) {
			return error;
		}
	}

	async deletePost(postId: string, authorId: string, token: string) {
		try {
			await this.delete(`/authors/${authorId}/posts/${postId}`, {
				headers: this.getHeaders(token),
			});

			return 'Post deleted';
		} catch (error) {
			return error;
		}
	}

	async getAuthorPosts(
		authorId: string,
		limit: Number,
		token: string,
		cursor?: Cursor,
	): Promise<GetAuthorPostsResponseBody> {
		try {
			const posts = await this.get(`authors/${authorId}/posts`, {
				params: {
					cursor: JSON.stringify(cursor),
					limit: limit?.toString(),
				},
				headers: this.getHeaders(token),
			});
			return posts;
		} catch (error) {
			return error;
		}
	}

	// async getAuthorPostById({ authorId, postId }: GetAuthorPostByIdPathParameter, token: string) {
	// 	const post = await this.get(`authors/${authorId}/posts/${postId}`, {
	// 		headers: this.getHeaders(token),
	// 	});
	// 	return post;
	// }
}
