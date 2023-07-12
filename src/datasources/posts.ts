import { RESTDataSource } from '@apollo/datasource-rest';
import DataLoader from 'dataloader';
import { Post } from '../entities/Post';
import { In } from 'typeorm';

export class PostsAPI extends RESTDataSource {
	token?: string;
	req: Request | any;

	constructor(req: Request | any, token?: string) {
		super();
		this.token = token;
		this.req = req;
	}

	private postLoader = new DataLoader<number, Post>((keys) => {
		try {
			return Post.findBy({ id: In(keys) });
		} catch (error) {
			return error;
		}
	});

	async getAllPosts(): Promise<Post[]> {
		const posts = await Post.find();
		posts.forEach((post) => {
			this.postLoader.prime(post.id, post);
		});
		return posts;
	}

	async getPost(id: number): Promise<Post | null> {
		return await this.postLoader.load(id);
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

		this.postLoader.prime(post.id, post);
		return post;
	}

	async updatePost(id: number, title: string): Promise<Post | null> {
		const post = await this.postLoader.load(id);
		if (!post) {
			return null;
		}

		await Post.update({ id }, { title });
		this.postLoader.prime(post.id, post);
		return post;
	}

	async deletePost(id: number): Promise<number | Boolean> {
		try {
			await Post.delete({
				id,
			});
			return id;
		} catch (error) {
			return false;
		}
	}
}
