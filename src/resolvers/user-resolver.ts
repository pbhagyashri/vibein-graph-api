import { Resolvers, User } from '../__generated__/resolvers-types';

export const userResolver: Resolvers = {
	Query: {
		getUsers: (_, __, { dataSources: { userApi } }): Promise<User[]> => {
			try {
				return userApi.getUsers();
			} catch (err) {
				return err;
			}
		},

		me: async (_, __, { dataSources: { userApi } }) => {
			try {
				return userApi.me();
			} catch (err) {
				return err;
			}
		},
	},

	Mutation: {
		register: async (
			_,
			{ inputs: { username, password } },
			{ dataSources: { userApi } }
		) => {
			try {
				return userApi.register(username, password);
			} catch (err) {
				return err;
			}
		},

		login: async (
			_,
			{ inputs: { username, password } },
			{ dataSources: { userApi } }
		) => await userApi.login(username, password),
	},
};
