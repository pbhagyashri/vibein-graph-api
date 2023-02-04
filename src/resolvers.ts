import { Resolvers } from './__generated__/resolvers-types';

export const resolvers: Resolvers = {
	Query: {
		books: async (_, __, { dataSources }) => await dataSources.BooksAPI.getBooks(),
		book: async (_, { id }, { dataSources }) => {
			const books = await dataSources.BooksAPI.getBooks();
			return books.find((book) => book.id === id);
		},
	},
};
