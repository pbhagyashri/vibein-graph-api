import { RESTDataSource } from '@apollo/datasource-rest';
import { Post } from '../entities/Post';
import { myDataSource } from '../index';

export class PostsAPI extends RESTDataSource {
	postRepository = myDataSource.manager.getRepository(Post);

	token?: string;
	req: Request | any;

	constructor(req: Request | any, token?: string) {
		super();
		this.token = token;
		this.req = req;
	}

	// private postLoader = new DataLoader<number, Post>(async (keys) => {
	// 	try {
	// 		return Post.findBy({ id: In(keys) });
	// 	} catch (error) {
	// 		return error;
	// 	}
	// });

	async getAllPosts(limit: number, cursor?: string | null): Promise<Post[]> {
		const realLimit = Math.min(50, limit);

		// we used query builder here so that we can conditionally add a where clause if a cursor is provided
		// find most recent posts
		const qb = this.postRepository.createQueryBuilder('post').orderBy('"createdAt"', 'DESC').take(realLimit);

		// if cursor is provided, find posts older than cursor
		if (cursor) {
			qb.where('"createdAt" < :cursor', { cursor: cursor });
		}

		// execute query and return posts
		return await qb.getMany();
	}

	async getPost(id: number): Promise<Post | null> {
		return await Post.findOne({
			where: {
				id,
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
			throw new Error("You don't have permission to update this post");
		}

		post.points += points;
		post.title = title;
		post.text = text;
		await post.save();
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
