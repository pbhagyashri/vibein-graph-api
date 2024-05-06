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
};
