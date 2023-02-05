import { RESTDataSource } from '@apollo/datasource-rest';
import { MikroORM } from '@mikro-orm/core';
import mikroConfig from '../mikro-orm.config';
import { Post } from '../entities/Post';

export class PostsAPI extends RESTDataSource {
	async getPosts(): Promise<any[]> {
		const orm = await MikroORM.init(mikroConfig);
		const em = orm.em.fork();
		return await em.find(Post, {});
	}
}
