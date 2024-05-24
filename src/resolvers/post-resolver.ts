import { Resolvers } from '../__generated__/resolvers-types';

export const postResolver: Resolvers = {
	Query: {
		getPosts: async (_, { inputs }, { dataSources: { postApi, token } }) => {
			const { limit, cursor } = inputs || {};
			console.log({ limit, postApi, token });

			try {
				if (!cursor) {
					return await postApi.getAllPosts({ limit }, token);
				}
				return await postApi.getAllPosts({ limit, cursor }, token);
			} catch (err) {
				return err;
			}
		},

		getPost: async (_, { id }, { dataSources: { postApi, token } }) => {
			try {
				return postApi.getPost(id, token);
			} catch (err) {
				return err;
			}
		},
	},
};
