import { LoginResponseBody, RegisterResponseBody } from 'src/types';
import { AuthResponse, Resolvers } from '../__generated__/resolvers-types';

export const authResolver: Resolvers = {
	Query: {},
	Mutation: {
		register: async (
			_,
			{ inputs: { email, password, username } },
			{ dataSources: { authApi } },
		): Promise<AuthResponse> => {
			try {
				const response: RegisterResponseBody = await authApi.register({ email, password, username });

				return {
					user: response.record,
					accessToken: response.accessToken,
				};
			} catch (err) {
				return err;
			}
		},
		login: async (_, { inputs: { email, password } }, { dataSources: { authApi } }): Promise<AuthResponse> => {
			try {
				const response: LoginResponseBody = await authApi.login({ email, password });

				return {
					user: response.record,
					accessToken: response.accessToken,
				};
			} catch (err) {
				return err;
			}
		},
	},
};
