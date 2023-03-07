import { Resolvers } from '../__generated__/resolvers-types';

export const userResolver: Resolvers = {
	Query: {
		getUsers: async (_, __, { dataSources: { userApi } }) => {
			try {
				return await userApi.getUsers();
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
		register: async (_, { inputs: { username, password } }, { dataSources: { userApi } }) => {
			try {
				return await userApi.register(username, password);
			} catch (err) {
				return err;
			}
		},

		login: async (_, { inputs: { username, password } }, { dataSources: { userApi } }) =>
			await userApi.login(username, password),
	},
};
