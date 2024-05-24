import { GetAuthorPostsResponse, Resolvers, User } from '../__generated__/resolvers-types';

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
		getAuthorPosts: async (
			_,
			{ inputs: { authorId, cursor, limit } },
			{ dataSources: { userApi, token } },
		): Promise<GetAuthorPostsResponse> => {
			console.log({ authorId, cursor, limit });
			try {
				if (!cursor) {
					const response = await userApi.getAuthorPosts(authorId, limit, token);
					return {
						posts: response.record.record || [],
						hasNextPage: response.record.hasNextPage,
						hasPreviousPage: response.record.hasPreviousPage,
					};
				}

				const response = await userApi.getAuthorPosts(authorId, limit, token, cursor);
				return {
					posts: response.record.record || [],
					hasNextPage: response.record.hasNextPage,
					hasPreviousPage: response.record.hasPreviousPage,
				};
			} catch (err) {
				return err;
			}
		},

		// getAuthorPostById: async (_, { inputs: { authorId, postId } }, { dataSources: { userApi, token } }) => {
		// 	try {
		// 		return userApi.getAuthorPostById({ authorId, postId }, token);
		// 	} catch (error) {
		// 		return error;
		// 	}
		// },
	},

	Mutation: {
		createPost: async (_, { inputs: { title, content, authorId } }, { dataSources: { userApi, token } }) => {
			try {
				return await userApi.createPost({ title, content, authorId }, token);
			} catch (err) {
				return err;
			}
		},
		updatePost: async (_, { inputs: { title, content, authorId, postId } }, { dataSources: { userApi, token } }) => {
			try {
				const updated = await userApi.updatePost({ title, content, authorId, postId }, token);

				return updated;
			} catch (error) {
				return error;
			}
		},
		deletePost: async (_, { inputs: { postId, authorId } }, { dataSources: { userApi, token } }) => {
			try {
				return await userApi.deletePost(postId, authorId, token);
			} catch (err) {
				return err;
			}
		},
	},
};
