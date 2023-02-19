import { Resolvers } from '../__generated__/resolvers-types';

export const userResolver: Resolvers = {
	Query: {
		getUsers: async (_, __, { dataSources: { userApi } }) => userApi.getUsers(),

		me: async (_, __, { dataSources: { userApi } }) => userApi.me(),
	},

	Mutation: {
		register: async (_, { inputs: { username, password } }, { dataSources: { userApi, req } }) => {
			const user = await userApi.register(username, password);

			req.session.userId = user.id;
			return user;
		},

		login: async (_, { inputs: { username, password } }, { dataSources: { userApi, req } }) => {
			const user = await userApi.login(username, password);

			req.session.userId = user.id;
			return user;
		},
	},
};
