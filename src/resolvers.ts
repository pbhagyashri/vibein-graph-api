import { Post } from './entities/Post';
import { Resolvers } from './__generated__/resolvers-types';

export const resolvers: Resolvers = {
	Query: {
		posts: async (_, __, { dataSources }) => await dataSources.em.find(Post, {}),
		post: async (_, { id }, { dataSources }) => {
			return dataSources.em.findOne(Post, { id });
		},
	},

	Mutation: {
		addPost: async (_, { title }, { dataSources }) => {
			const post = dataSources.em.create(Post, { title });
			await dataSources.em.persistAndFlush(post);
			return post;
		},

		updatePost: async (_, { id, title }, { dataSources }) => {
			const post = await dataSources.em.findOne(Post, { id });
			if (!post) {
				return null;
			}
			post.title = title;
			await dataSources.em.persistAndFlush(post);
			return post;
		},

		deletePost: async (_, { id }, { dataSources }) => {
			try {
				await dataSources.em.nativeDelete(Post, { id });
				return true;
			} catch (error) {
				return false;
			}
		},
	},
};
