import { RESTDataSource } from '@apollo/datasource-rest';
import { Post } from '../entities/Post';
import { myDataSource } from '../index';
import { GraphQLError } from 'graphql';
import { parse } from 'path/win32';

export class PostsAPI extends RESTDataSource {
	postRepository = myDataSource.manager.getRepository(Post);

	token?: string;
	req: Request | any;

	constructor(req: Request | any, token?: string) {
		super();
		this.token = token;
		this.req = req;
	}

	// TODO: implement dataloader
	// TODO: implement try catch blocks
	async getAllPosts(limit: number, cursor?: string | null): Promise<Post[]> {
		const realLimit = Math.min(50, limit);

		if (cursor) {
			const posts = await this.postRepository
				.createQueryBuilder('post')
				.leftJoinAndSelect('post.creator', 'user')
				.where('post.createdAt < :cursor', { cursor })
				.orderBy('post.createdAt', 'DESC')
				.take(realLimit)
				.getMany();

			return posts;
		}

		const posts = await this.postRepository
			.createQueryBuilder('post')
			.leftJoinAndSelect('post.creator', 'user')
			.orderBy('post.createdAt', 'DESC')
			.take(limit)
			.getMany();

		return posts;
	}

	async getPost(id: number): Promise<Post | null> {
		return await Post.findOne({
			where: {
				id,
			},
			relations: {
				creator: true,
			},
		});
	}

	async createPost(title: string, text: string): Promise<Post> {
		if (!this.token) {
			throw new Error('Not Authenticated');
		}

		const post = await Post.create({
			title,
			text,
			creatorId: this.req.auth.sub,
		}).save();

		return post;
	}

	async updatePost(id: number, title: string, text: string, creatorId: number, points: number): Promise<Post | null> {
		const post = await Post.findOne({
			where: {
				id,
			},
		});

		if (!post) {
			return null;
		}

		// only the author of the post can update it
		if (post.creatorId !== creatorId) {
			throw new GraphQLError('you can only edit your own posts', {
				extensions: {
					code: 'VALIDATION_ERROR',
				},
			});
		}

		post.points += points;
		post.title = title;
		post.text = text;
		await post.save();
		return post;
	}

	async deletePost(id: number): Promise<number | Boolean> {
		const post = await Post.findOne({
			where: {
				id,
			},
		});

		// only the author of the post can delete it
		if (post?.creatorId !== parseInt(this.req.auth.sub)) {
			throw new Error('you can only delete your own posts');
		}

		try {
			await Post.delete({
				id,
			});

			return id;
		} catch (error) {
			throw new GraphQLError(error.message, {
				extensions: {
					code: 'INTERNAL_SERVER_ERROR',
				},
			});
		}
	}
}
