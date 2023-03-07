import { RESTDataSource } from '@apollo/datasource-rest';
import { Loaded } from '@mikro-orm/core';
import { Post } from '../entities/Post';

export class PostsAPI extends RESTDataSource {
	token?: string;
	req: Request | any;

	constructor(req: Request | any, token?: string) {
		super();
		this.token = token;
		this.req = req;
	}

	async getPosts(): Promise<Loaded<Post, never>[]> {
		return await Post.find();
	}

	async getPost(id: number): Promise<Loaded<Post, never> | null> {
		return await Post.findOne({
			where: {
				id,
			},
		});
	}

	async createPost(title: string, text: string): Promise<Loaded<Post, never>> {
		return Post.create({ title, text, creatorId: this.req.auth.sub }).save();
	}

	async updatePost(id: number, title: string): Promise<Loaded<Post, never> | null> {
		const post = await Post.findOne({
			where: {
				id,
			},
		});
		if (!post) {
			return null;
		}

		await Post.update({ id }, { title });
		return post;
	}

	async deletePost(id: number): Promise<boolean> {
		try {
			await Post.delete({
				id,
			});
			return true;
		} catch (error) {
			return false;
		}
	}
}
