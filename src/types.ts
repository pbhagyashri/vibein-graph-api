import { PostsAPI } from './datasources/posts';
import { UserAPI } from './datasources/user';

export interface MyContext {
	dataSources: {
		postApi: PostsAPI;
		userApi: UserAPI;
		token: string | undefined;
	};
}
