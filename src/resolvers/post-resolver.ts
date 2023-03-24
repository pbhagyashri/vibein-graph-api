import { Post, Resolvers } from '../__generated__/resolvers-types';

export const postResolver: Resolvers = {
	Query: {
		posts: async (_, __, { dataSources: { postApi } }): Promise<Post[] | never> => {
			try {
				return await postApi.getPosts();
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
				console.log('err', err);
				return err;
			}
		},

		updatePost: async (_, { id, title }, { dataSources: { postApi } }) => {
			try {
				return await postApi.updatePost(parseInt(id), title);
			} catch (err) {
				return err;
			}
		},

		deletePost: async (_, { id }, { dataSources: { postApi } }) => await postApi.deletePost(parseInt(id)),
	},
};
