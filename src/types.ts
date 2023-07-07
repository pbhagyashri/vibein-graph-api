import { PostsAPI } from './datasources/posts';
import { UserAPI } from './datasources/user';
import { User, Post } from './entities';

export interface MyContext {
	dataSources: {
		postApi: PostsAPI;
		userApi: UserAPI;
		token: string | undefined;
	};
}
