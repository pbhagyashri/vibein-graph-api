import { Resolvers, Post } from '../__generated__/resolvers-types';

export const postResolver: Resolvers = {
	Query: {
		getPosts: async (_, { inputs: { limit, cursor } }, { dataSources: { postApi } }): Promise<Post[]> => {
			try {
				if (!cursor) {
					return await postApi.getAllPosts({ limit });
				}
				return await postApi.getAllPosts({ limit, cursor });
			} catch (err) {
				return err;
			}
		},

		getPost: async (_, { id }, { dataSources: { postApi } }): Promise<Post> => {
			try {
				return postApi.getPost(id);
			} catch (err) {
				return err;
			}
		},
	},

	Mutation: {
		createPost: async (_, { inputs: { title, content, authorId } }, { dataSources: { postApi } }) => {
			try {
				return await postApi.createPost({ title, content, authorId });
			} catch (err) {
				return err;
			}
		},
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
		// deletePost: async (_, { id }, { dataSources: { postApi, token } }) => {
		// 	try {
		// 		if (!token) {
		// 			return new Error('Not authenticated, please login');
		// 		}
		// 		return await postApi.deletePost(parseInt(id));
		// 	} catch (err) {
		// 		return err;
		// 	}
		// },
	},
};
