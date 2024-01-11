import { RESTDataSource } from '@apollo/datasource-rest';
import {
	CreatePostRequestBody,
	CreatePostResponseBody,
	GetPostResponseBody,
	GetPostsResponseBody,
	GetPostsRequestBody,
} from '../types';

export class PostsAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = 'http://localhost:4000/';
	}

	async getAllPosts({ limit, cursor }: GetPostsRequestBody): Promise<GetPostsResponseBody['record']> {
		try {
			if (!cursor) {
				const responses: GetPostsResponseBody = await this.get(`posts?limit=${limit}`);
				return responses.record;
			}
			const responses: GetPostsResponseBody = await this.get(`posts?cursor=${cursor}&limit=${limit}`);

			return responses.record;
		} catch (error) {
			return error;
		}
	}

	async getPost(id: string): Promise<GetPostResponseBody['record']> {
		try {
			const response: GetPostResponseBody = await this.get(`posts/${id}`);
			return response.record;
		} catch (error) {
			return error;
		}
	}

	async createPost({ title, content, authorId }: CreatePostRequestBody): Promise<CreatePostResponseBody> {
		try {
			const response = await this.post('posts', { body: { title, content, authorId } });
			return response.record;
		} catch (error) {
			return error;
		}
	}

	// TODO: implement dataloader
	// TODO: implement try catch blocks
	// async getAllPosts(limit: number, cursor?: string | null) {
	// 	const realLimit = Math.min(50, limit);

	// 	// if (cursor) {
	// 	// 	const posts = await this.postRepository
	// 	// 		.createQueryBuilder('post')
	// 	// 		.leftJoinAndSelect('post.creator', 'user')
	// 	// 		.where('post.createdAt < :cursor', { cursor })
	// 	// 		.orderBy('post.createdAt', 'DESC')
	// 	// 		.take(realLimit)
	// 	// 		.getMany();

	// 	// 	return posts;
	// 	// }

	// 	// const posts = await this.postRepository
	// 	// 	.createQueryBuilder('post')
	// 	// 	.leftJoinAndSelect('post.creator', 'user')
	// 	// 	.orderBy('post.createdAt', 'DESC')
	// 	// 	.take(limit)
	// 	// 	.getMany();

	// 	// return posts;
	// }

	// async updatePost(id: number, title: string, text: string, creatorId: number, points: number): Promise<Post | null> {
	// 	const post = await Post.findOne({
	// 		where: {
	// 			id,
	// 		},
	// 	});

	// 	if (!post) {
	// 		return null;
	// 	}

	// 	// only the author of the post can update it
	// 	if (post.creatorId !== creatorId) {
	// 		throw new GraphQLError('you can only edit your own posts', {
	// 			extensions: {
	// 				code: 'VALIDATION_ERROR',
	// 			},
	// 		});
	// 	}

	// 	post.points += points;
	// 	post.title = title;
	// 	post.text = text;
	// 	await post.save();
	// 	return post;
	// }

	// async deletePost(id: number): Promise<number | Boolean> {
	// 	const post = await Post.findOne({
	// 		where: {
	// 			id,
	// 		},
	// 	});

	// 	// only the author of the post can delete it
	// 	if (post?.creatorId !== parseInt(this.req.auth.sub)) {
	// 		throw new Error('you can only delete your own posts');
	// 	}

	// 	try {
	// 		await Post.delete({
	// 			id,
	// 		});

	// 		return id;
	// 	} catch (error) {
	// 		throw new GraphQLError(error.message, {
	// 			extensions: {
	// 				code: 'INTERNAL_SERVER_ERROR',
	// 			},
	// 		});
	// 	}
	// }
}
