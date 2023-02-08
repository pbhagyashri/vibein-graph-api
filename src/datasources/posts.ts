import { RESTDataSource } from '@apollo/datasource-rest';
import { Connection, EntityManager, IDatabaseDriver, Loaded } from '@mikro-orm/core';
import { Post } from '../entities/Post';

export class PostsAPI extends RESTDataSource {
	em: EntityManager<IDatabaseDriver<Connection>>;
	constructor(em: EntityManager<IDatabaseDriver<Connection>>) {
		super();
		this.em = em;
	}

	async getPosts(): Promise<Loaded<Post, never>[]> {
		return await this.em.find(Post, {});
	}

	async getPost(id: number): Promise<Loaded<Post, never> | null> {
		return await this.em.findOne(Post, { id });
	}

	async addPost(title: string): Promise<Loaded<Post, never>> {
		const post = this.em.create(Post, { title });
		await this.em.persistAndFlush(post);
		return post;
	}

	async updatePost(id: number, title: string): Promise<Loaded<Post, never> | null> {
		const post = await this.em.findOne(Post, { id });
		if (!post) {
			return null;
		}
		post.title = title;
		await this.em.persistAndFlush(post);
		return post;
	}

	async deletePost(id: number): Promise<boolean> {
		try {
			await this.em.nativeDelete(Post, { id });
			return true;
		} catch (error) {
			return false;
		}
	}
}
