import { Resolvers } from '../__generated__/resolvers-types';

export const userResolver: Resolvers = {
	Query: {
		getUsers: async (_, __, { dataSources: { userApi } }) => {
			try {
				const users = await userApi.getUsers();
				return users;
			} catch (err) {
				return err;
			}
		},

		me: async (_, __, { dataSources: { userApi } }) => {
			try {
				const me = await userApi.me();
				return me;
			} catch (err) {
				return err;
			}
		},
	},

	Mutation: {
		register: async (_, { inputs: { username, password } }, { dataSources: { userApi } }) =>
			await userApi.register(username, password),

		login: async (_, { inputs: { username, password } }, { dataSources: { userApi } }) =>
			await userApi.login(username, password),
	},
};
