import { SqlEntityManager, AbstractSqlDriver, AbstractSqlConnection, AbstractSqlPlatform } from '@mikro-orm/mysql';
import { PostsAPI } from './datasources/posts';
import { UserAPI } from './datasources/user';

export interface MyContext {
	dataSources: {
		postApi: PostsAPI;
		userApi: UserAPI;
	};
}
