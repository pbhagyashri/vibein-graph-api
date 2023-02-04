// import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
// import { Post } from './entities/Post';
// import mikroConfig from './mikro-orm.config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { resolvers } from './resolvers';
import { BooksAPI } from './datasources/books';

const main = async () => {
	// const orm = await MikroORM.init(mikroConfig);
	// const em = orm.em.fork();
	// await orm.getMigrator().up();
	// const post = em.create(Post, {
	// 	title: 'first post',
	// });
	// await em.persistAndFlush(post);

	// const post = await em.find(Post, {});
	// console.log({ post });

	const { resolve, dirname, join } = path;
	const typeDefs = loadFilesSync(join(resolve(dirname('')), './schema.graphql'));

	interface MyContext {
		dataSources: {
			BooksAPI: BooksAPI;
		};
	}

	const server = new ApolloServer<MyContext>({
		introspection: true,
		typeDefs,
		resolvers,
	});

	const { url } = await startStandaloneServer(server, {
		context: async () => ({
			dataSources: {
				BooksAPI: new BooksAPI(),
			},
		}),
	});

	console.log(`🚀  Server ready at: ${url}`);
};

main();
