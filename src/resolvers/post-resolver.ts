import { Post, Resolvers } from '../__generated__/resolvers-types';

export const postResolver: Resolvers = {
	Query: {
		posts: async (_, { limit, cursor }, { dataSources: { postApi } }): Promise<Post[] | never> => {
			try {
				return await postApi.getAllPosts(limit, cursor);
			} catch (err) {
				return err;
			}
		},

		post: async (_, { id }, { dataSources: { postApi } }) => {
			try {
				return postApi.getPost(parseInt(id));
			} catch (err) {
				return err;
			}
		},
	},

	Mutation: {
		createPost: async (_, { title, text }, { dataSources: { postApi } }) => {
			try {
				return await postApi.createPost(title, text);
			} catch (err) {
				return err;
			}
		},

		updatePost: async (_, { id, title, text, creatorId, points }, { dataSources: { postApi, token } }) => {
			try {
				if (!token) {
					return new Error('Not authenticated, please login');
				}
				return await postApi.updatePost(parseInt(id), title, text, creatorId, points);
			} catch (err) {
				return err;
			}
		},

		deletePost: async (_, { id }, { dataSources: { postApi, token } }) => {
			try {
				if (!token) {
					return new Error('Not authenticated, please login');
				}
				return await postApi.deletePost(parseInt(id));
			} catch (err) {
				return err;
			}
		},
	},
};
