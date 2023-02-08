import { Resolvers } from '../__generated__/resolvers-types';

export const userResolver: Resolvers = {
	Query: {
		getUsers: async (_, __, { dataSources: { userApi } }) => userApi.getUsers(),

		me: async (_, __, { dataSources: { userApi } }) => userApi.me(),
	},

	Mutation: {
		register: async (_, { inputs: { username, password } }, { dataSources: { userApi } }) =>
			userApi.register(username, password),

		login: async (_, { inputs: { username, password } }, { dataSources: { userApi } }) =>
			await userApi.login(username, password),
	},
};
