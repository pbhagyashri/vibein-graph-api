import { PostsAPI } from './datasources/posts';

export interface MyContext {
	dataSources: {
		postApi: PostsAPI;
	};
}

export type Post = {
	id: number;
	title: string;
	createdAt: string;
	updatedAt: string;
};
