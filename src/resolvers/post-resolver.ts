import { Resolvers, Post, PaginationInfo } from '../__generated__/resolvers-types';

export const postResolver: Resolvers = {
	Query: {
		getPosts: async (_, { inputs }, { dataSources: { postApi, token } }): Promise<PaginationInfo> => {
			const { limit, cursor } = inputs || {};

			try {
				if (!cursor) {
					return await postApi.getAllPosts({ limit }, token);
				}
				return await postApi.getAllPosts({ limit, cursor }, token);
			} catch (err) {
				return err;
			}
		},

		getPost: async (_, { id }, { dataSources: { postApi, token } }): Promise<Post> => {
			try {
				return postApi.getPost(id, token);
			} catch (err) {
				return err;
			}
		},
	},

	Mutation: {
		// createPost: async (_, { inputs: { title, content, authorId } }, { dataSources: { postApi, token } }) => {
		// 	try {
		// 		return await postApi.createPost({ title, content, authorId }, token);
		// 	} catch (err) {
		// 		return err;
		// 	}
		// },

		// updatePost: async (_, { id, title, text, creatorId, points }, { dataSources: { postApi, token } }) => {
		// 	try {
		// 		if (!token) {
		// 			return new Error('Not authenticated, please login');
		// 		}
		// 		return await postApi.updatePost(parseInt(id), title, text, creatorId, points);
		// 	} catch (err) {
		// 		return err;
		// 	}
		// },
		deletePost: async (_, { id }, { dataSources: { postApi, token } }) => {
			try {
				return await postApi.deletePost(id, token);
			} catch (err) {
				return err;
			}
		},
	},
};
