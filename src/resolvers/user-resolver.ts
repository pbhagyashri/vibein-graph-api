import { Resolvers, User } from '../__generated__/resolvers-types';

export const userResolver: Resolvers = {
	Query: {
		getUsers: async (_, __, { dataSources: { userApi } }): Promise<User[]> => {
			try {
				const user = await userApi.getUsers();
				return user.record;
			} catch (err) {
				return err;
			}
		},

		me: async (_, __, { dataSources: { userApi, token } }): Promise<User> => {
			try {
				return userApi.me(token);
			} catch (err) {
				return err;
			}
		},
	},

	Mutation: {
		createPost: async (_, { inputs: { title, content, authorId } }, { dataSources: { userApi, token } }) => {
			try {
				return await userApi.createPost({ title, content, authorId }, token);
			} catch (err) {
				return err;
			}
		},
		updatePost: async (_, { inputs: { id, postId, title, content } }, { dataSources: { userApi, token } }) => {
			try {
				const updated = await userApi.updatePost({ id, postId, title, content }, token);

				return updated;
			} catch (error) {
				return error;
			}
		},
	},
};
