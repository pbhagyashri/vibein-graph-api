import { Post } from '../entities/Post';
import { Resolvers } from '../__generated__/resolvers-types';

export const postResolver: Resolvers = {
	Query: {
		posts: async (_, __, { dataSources: { em } }) => await em.find(Post, {}),
		post: async (_, { id }, { dataSources: { em } }) => {
			return em.findOne(Post, { id });
		},
	},

	Mutation: {
		addPost: async (_, { title }, { dataSources: em }) => {
			const post = em.create(Post, { title });
			await em.persistAndFlush(post);
			return post;
		},

		updatePost: async (_, { id, title }, { dataSources: { em } }) => {
			const post = await em.findOne(Post, { id });
			if (!post) {
				return null;
			}
			post.title = title;
			await em.persistAndFlush(post);
			return post;
		},

		deletePost: async (_, { id }, { dataSources: em }) => {
			try {
				await em.nativeDelete(Post, { id });
				return true;
			} catch (error) {
				return false;
			}
		},
	},
};
