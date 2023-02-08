import { Post } from '../entities/Post';
import { Resolvers } from '../__generated__/resolvers-types';

export const postResolver: Resolvers = {
	Query: {
		posts: async (_, __, { dataSources: { postApi } }) => await postApi.getPosts(),

		post: async (_, { id }, { dataSources: { em } }) => {
			return em.findOne(Post, { id });
		},
	},

	Mutation: {
		addPost: async (_, { title }, { dataSources: { postApi } }) => await postApi.addPost(title),

		updatePost: async (_, { id, title }, { dataSources: { postApi } }) => await postApi.updatePost(id, title),

		deletePost: async (_, { id }, { dataSources: { postApi } }) => await postApi.deletePost(id),
	},
};
